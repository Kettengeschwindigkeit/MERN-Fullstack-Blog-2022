import React from "react"
import { Link } from "react-router-dom"

export const RegisterPage = () => {
    return (
        <form className="w-1/4 h-60 mx-auto mt-40" onSubmit={e => e.preventDefault()}>
            <h1 className="text-lg text-white text-center">Registration</h1>
            <label className="text-xs text-gray-400">
                Username:
                <input
                    type="text"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-400"
                    placeholder="Username"
                />
            </label>
            <label className="text-xs text-gray-400">
                Password:
                <input
                    type="password"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-400"
                    placeholder="Password"
                />
            </label>
            <div className="flex gap-8 justify-center mt-4">
                <button type="submit" className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4">
                    Send
                </button>
                <Link to="/login" className="flex justify-center items-center text-xs text-white">Have account?</Link>
            </div>
        </form>
    )
}
