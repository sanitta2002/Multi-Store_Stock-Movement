import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearAuthUser } from "../store/slices/authSlice";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthUser());
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full border border-black p-8 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white transition-all duration-300">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight uppercase border-b-4 border-black pb-4 text-center">
          Dashboard
        </h1>
        <p className="text-xl mb-8 font-medium text-center">
          Welcome back, {user?.name || "User"}!
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-black text-white py-3 px-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-black border-2 border-black transition-all duration-300 ease-in-out hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
