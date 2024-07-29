import React, { useEffect, useState } from "react";
import * as postAPI from '../../utilities/posts-api';
import { Textarea } from "@material-tailwind/react";
import { io } from "socket.io-client";

const ENDPOINT = "https://sampler.herokuapp.com";
let socket;


export default function NewPostForm({ setUpdate, user, setIsModalOpen }) {

    const initialState = {
        subject: '',
        body: '',
        username: user.name
    };

    const [postData, setPostData] = useState(initialState);
    const [error, setError] = useState('');

    useEffect(() => {
        socket = io(ENDPOINT);
    }, [])

    function handleChange(evt) {
        const inputData = { ...postData, [evt.target.name]: evt.target.value };
        setPostData(inputData);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const postCreated = await postAPI.createPost(postData, user);
            socket.emit('postCreated', postCreated); 
            setUpdate(true);
            setIsModalOpen(false);
        } catch (error) {
            console.log('Error');
        }
    }

    return (
        <div>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white p-6">
                                <h4 className="text-2xl font-bold mb-4 text-gray-800">New Post</h4>
                                <form className="new-post-form space-y-6" onSubmit={handleSubmit}>
                                    <div className="subject">
                                        <label className="block mb-2 text-sm font-medium text-gray-700"></label>
                                        <input 
                                            className="subject-input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type='text'
                                            placeholder="Subject"
                                            name='subject'
                                            onChange={handleChange}
                                            value={postData.subject}
                                        />
                                    </div>
                                    <div className="body">
                                        <Textarea
                                            label="body"
                                            type='text'
                                            name='body'
                                            onChange={handleChange}
                                            value={postData.body}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            className="cancel-button py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="post-button py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="submit"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                                <p className="error-message text-red-500 mt-4">&nbsp;{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}