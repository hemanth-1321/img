"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Appbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-900">MyApp</div>

      {session ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            Signed in as{" "}
            <span className="font-semibold">{session.user?.email}</span>
          </span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow-md transition duration-200"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-md transition duration-200"
        >
          Sign In
        </button>
      )}
    </nav>
  );
}
