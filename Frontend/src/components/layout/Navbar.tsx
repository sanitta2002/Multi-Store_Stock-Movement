import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-3">

          <UserCircle size={35} />

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}