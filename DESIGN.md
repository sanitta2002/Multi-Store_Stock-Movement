# System Design

## Data Model

The application uses MongoDB as its data layer, structured around the following core models:

1. **User (`users` collection)**
   - `name` (String)
   - `email` (String, unique index)
   - `password` (String, bcrypt hashed)
   - `role` (Enum: `admin`, `shopper`)

2. **Product (`products` collection)**
   - `name` (String)
   - `sku` (String, unique index enforced at data layer)
   - `description` (String)

3. **Store (`stores` collection)**
   - `name` (String)
   - `location` (String)

4. **Stock (`stocks` collection)**
   - `product` (ObjectId, ref: Product)
   - `store` (ObjectId, ref: Store)
   - `quantity` (Number, `min: 0`)
   - **Index**: A compound unique index on `{ product: 1, store: 1 }` ensures each product has exactly one stock record per store.

## Preventing Negative Stock (Concurrency Control)

To guarantee that stock never goes below zero, even under concurrent requests (e.g., two admins adjusting the last few items simultaneously), the system must rely on atomic data-layer constraints.

### 1. Schema Validation
The `quantity` field in the `Stock` Mongoose schema has a `min: [0, 'Quantity cannot be negative']` constraint.

### 2. Atomic `$inc` with Query Constraints
Instead of performing a "read-then-write" operation in the application layer (which is vulnerable to race conditions), updates are executed using MongoDB's `$inc` operator paired with a `$gte` query constraint. 
For example, to subtract 5 units:
```javascript
Stock.updateOne(
  { _id: stockId, quantity: { $gte: 5 } },
  { $inc: { quantity: -5 } }
);
```
If the current quantity is 4, this query will match 0 documents, and the application will throw a "Insufficient stock" error. This guarantees stock is never driven negative, even if multiple requests fire simultaneously.

## Atomic Transfers

A transfer involves moving stock from a source store to a destination store. This operation must fully succeed or fully fail. If the server crashes after decrementing the source but before incrementing the destination, the stock must not be lost.

### MongoDB Transactions
To ensure atomicity, stock transfers use **MongoDB Transactions** (Sessions).
1. A database session is started: `const session = await mongoose.startSession(); session.startTransaction();`
2. The source stock is decremented within the session (using the `$gte` constraint mentioned above to prevent negative stock).
3. The destination stock is incremented (or created if it doesn't exist) within the same session.
4. If both operations succeed, the transaction is committed: `await session.commitTransaction();`
5. If any validation fails (e.g. source store doesn't have enough stock) or an error occurs, the transaction is aborted: `await session.abortTransaction();`, rolling back any partial changes securely.
