import React, { useState, useEffect, useCallback } from "react"
import { Link, useParams } from "react-router-dom"
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import axios from "../utils/axios"

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const params = useParams()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    if (!post) {
        return (
            <div className="py-10 text-xl text-center text-white">
                No posts
            </div>
        )
    }

    return (
        <div>
            <button className="flex justify-center items-center px-4 py-2 bg-gray-600 text-xs text-white rounded-sm">
                <Link to={'/'} className="flex">Back</Link>
            </button>
            <div className="flex gap-10 py-8">
                <div className="w-2/3">
                    <div className="flex flex-col basis-1/4 flex-grow">
                        <div
                            className={
                                post?.imgUrl ? "flex h-80 rounded-sm" : "flex rounded-sm"
                            }
                        >
                            {post?.imgUrl && (
                                <img src={`http://localhost:3002/${post.imgUrl}`} alt="img" className="object-cover w-full" />
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-xs text-white opacity-50'>{post.username}</div>
                        <div className='text-xs text-white opacity-50'>
                            <Moment date={post.createdAt} format='D MMM YYYY' />
                        </div>
                    </div>
                    <div className='text-xl text-white'>{post.title}</div>
                    <p className='pt-4 text-xs text-white opacity-60'>{post.text}</p>
                    <div className='flex items-center gap-3 mt-2'>
                        <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                            <AiFillEye /> <span>{post.views}</span>
                        </button>
                        <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                            <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                        </button>
                    </div>
                </div>
                <div className="w-1/3">
                    COMMENTS
                </div>
            </div>
        </div>
    )
}
