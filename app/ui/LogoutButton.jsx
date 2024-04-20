"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const LogoutButton = ({ label, color }) => {

    const handleLogout = async () => {
        await signOut();
        return redirect('/auth/login')
    }
    return (
        <button
            style={{ color: color }}
            onClick={handleLogout}
            className={`bg-${color}-200 text-gray-400 mx-2 border-2 py-2 px-4 rounded-md hover:bg-${color}-600 focus:outline-none focus:ring focus:border-${color}-300`}
        >
            {label}
        </button>
    )
}

export default LogoutButton
