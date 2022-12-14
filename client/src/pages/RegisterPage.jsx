import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { registerUser, checkIsAuth } from "../redux/features/auth/authSlice"

export const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { status } = useSelector((state) => state.auth)
    console.log(status)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password }))
            setUsername("")
            setPassword("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="w-1/4 h-60 mx-auto mt-40" onSubmit={e => e.preventDefault()}>
            <h1 className="text-lg text-white text-center">Registration</h1>
            <label className="text-xs text-gray-400">
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-400"
                    placeholder="Username"
                />
            </label>
            <label className="text-xs text-gray-400">
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-400"
                    placeholder="Password"
                />
            </label>
            <div className="flex gap-8 justify-center mt-4">
                <button type="submit" onClick={handleSubmit} className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4">
                    Send
                </button>
                <Link to="/login" className="flex justify-center items-center text-xs text-white">Have account?</Link>
            </div>
        </form>
    )
}
