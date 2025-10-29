import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function WebsiteStory_add() {
    const { token, notify } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    // Handle thumbnail preview
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnailPreview(null);
        }
    };

    const submit_handler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const views = e.target.views.value;
        const video_url = e.target.url.value;
        const thumbnail = e.target.thumbnail.files[0];

        if (!video_url || !thumbnail || !views) {
            notify('Please fill all required fields', 0);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("views", views);
        formData.append("video_url", video_url);
        formData.append("thumbnail", thumbnail);

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_WEBSITE_STORIES_URL + "add",
                formData,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            notify(response.data.msg, response.data.status);

            if (response.data.status === 1) {
                e.target.reset();
                setThumbnailPreview(null);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('An error occurred while adding the story', 0);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClassName = "w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white font-medium text-gray-700 placeholder-gray-400";

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Main Card */}
                <div className={`relative bg-white rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10 relative">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
                            Add Website Story
                        </h1>
                        <p className="text-blue-100 text-center text-lg max-w-2xl mx-auto">
                            Create engaging video stories to showcase on your website
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-6 py-8 sm:px-8 sm:py-10 relative">
                        <form onSubmit={submit_handler} className="space-y-8">
                            
                            {/* YouTube URL Field */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</div>
                                    YouTube URL
                                    <span className="text-red-400 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="url"
                                        name="url"
                                        type="url"
                                        required
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className={inputClassName}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail Upload */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</div>
                                    Story Thumbnail
                                    <span className="text-red-400 ml-1">*</span>
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    {/* Thumbnail Preview */}
                                    <div className="flex-shrink-0">
                                        <div className="w-32 h-20 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                                            {thumbnailPreview ? (
                                                <img 
                                                    src={thumbnailPreview} 
                                                    alt="Thumbnail preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-xs text-gray-500">No image</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* File Input */}
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="thumbnail"
                                            name="thumbnail"
                                            accept="image/*"
                                            onChange={handleThumbnailChange}
                                            required
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="thumbnail"
                                            className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <div>
                                                    <span className="text-blue-600 font-semibold">Click to upload</span>
                                                    <span className="text-gray-500 ml-1">or drag and drop</span>
                                                </div>
                                                <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Views Field */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">3</div>
                                    Views Count
                                    <span className="text-red-400 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="views"
                                        name="views"
                                        type="number"
                                        min="0"
                                        required
                                        placeholder="Enter view count"
                                        className={inputClassName}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Video Preview Section */}
                            {thumbnailPreview && (
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-3">4</div>
                                        Story Preview
                                    </label>
                                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200">
                                        <div className="flex flex-col sm:flex-row items-center gap-6">
                                            <div className="flex-shrink-0">
                                                <div className="w-32 h-20 rounded-xl overflow-hidden shadow-lg">
                                                    <img 
                                                        src={thumbnailPreview} 
                                                        alt="Story thumbnail" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h4 className="font-semibold text-gray-800 mb-2">Story Preview</h4>
                                                <p className="text-sm text-gray-600">
                                                    This is how your story will appear on the website with the uploaded thumbnail.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-6 transform transition-all duration-300 hover:scale-[1.01]">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`
                                        relative overflow-hidden
                                        w-full
                                        bg-gradient-to-r from-blue-500 to-indigo-600
                                        hover:from-blue-600 hover:to-indigo-700
                                        disabled:from-gray-400 disabled:to-gray-500
                                        text-white font-bold py-4 px-8 
                                        rounded-xl shadow-lg
                                        transform transition-all duration-300
                                        hover:shadow-xl
                                        focus:outline-none focus:ring-4 focus:ring-blue-200
                                        disabled:cursor-not-allowed
                                        group
                                    `}
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Adding Story...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="text-lg">Add Story</span>
                                        </div>
                                    )}
                                </button>
                            </div>

                            {/* Help Text */}
                            <div className="text-center pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center text-gray-500 text-sm">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    All fields marked with * are required
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">YouTube</h3>
                        <p className="text-xs text-gray-600">Video integration</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Engaging</h3>
                        <p className="text-xs text-gray-600">Video stories</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Fast</h3>
                        <p className="text-xs text-gray-600">Quick upload</p>
                    </div>
                </div>
            </div>
        </div>
    );
}