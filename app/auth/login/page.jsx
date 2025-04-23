"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const LoginPage = () => {

    const ref = useRef();

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userInfo)
        if (!userInfo.email || !userInfo.password) {
            setError("Must provide all the Credentials!");
        }
        try {
            setPending(true);


            const res = await signIn('credentials', {
                email: userInfo.email,
                password: userInfo.password,
                redirect: false,
                callbackUrl: process.env.NEXTAUTH_URL
            });

            if (!res.ok) {
                setError("Problem signing in!");
            }

            if (res.error) {
                setError('Invalid credentials')
                setPending(false);
                return
            }

            setPending(false);

            router.push('/')


        } catch (error) {
            setPending(false);
            setError('Something went wrong');
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">

            <div className="p-8 w-full max-w-md">
            <form ref={ref} className="bg-white dark:bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 dark:text-white font-medium mb-1" htmlFor="email">Email</label>
                    <input
                        className="w-full px-4 py-2 border text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        disabled={pending}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                        type="submit"
                    >
                        {pending ? "Logging in..." : "Log In"}
                    </button>

                    
                        <Link href="/auth/register">
                            <span className="text-blue-600 hover:underline cursor-pointer mx-5 px-2">Register</span>
                        </Link>
                    
                </div>
            </form>
            </div>    
            
        </div>
    )
}

export default LoginPage