"use client";

import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

const RegisterPage = () => {

 
    const { data: session, status } = useSession();
    const router = useRouter();
   

    const ref = useRef();


    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p className="text-center text-gray-700">Checking authentication...</p>;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInfo.username || !userInfo.email || !userInfo.password) {
            setError("Must provide all the Credentials!");
        }

        try {

            setPending(true);

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            });

            if (res.ok) {
                setPending(false);
                ref?.current?.reset();
                router.push('/auth/login')
            } else {
                const errorData = await res.json();
                setError(errorData.message);
                console.log('Something went wrong in else block');
                setPending(false);
            }

        } catch (error) {
            setPending(false);
            setError('Something went wrong');
        }

    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
           <div className="p-8 w-full max-w-md">
            <h2 className="mx-o auto py-5 my-5 text-center font-semibold dark:text-white text-2xl lg:text-4xl md:text-3xl">Register To Our Platform!</h2>
           <form ref={ref} className="bg-white dark:bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white  leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={userInfo.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 dark:text-white font-medium mb-1" htmlFor="email">Email</label>
                    <input
                        className="w-full px-4 py-2 border text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 dark:text-white font-medium mb-1" htmlFor="password">Password</label>
                    <input
                        className="w-full px-4 py-2 border text-slate-900 dark:text-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="password"
                        type="password"
                        placeholder="********"
                        name="password"
                        value={userInfo.password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    {error && <span className="text-red-600 mx-2 px-2">{error}</span>}
                    <button
                        disabled={pending === true}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {pending ? 'Registering' : 'Sign Up'}
                    </button>
                </div>
            </form>
           </div>
           
          
        </div>
    )
}

export default RegisterPage