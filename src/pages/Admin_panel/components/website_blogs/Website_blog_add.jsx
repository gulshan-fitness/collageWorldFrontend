import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

export default function Website_blog_add() {
    const { quill_value, setquill_value, token, notify } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        setquill_value(null);
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    // Handle heading character count
    const handleHeadingChange = (e) => {
        setCharacterCount(e.target.value.length);
    };

    const submit_handler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const logo = e.target.logo.files[0];
        const post = quill_value;
        const author = e.target.author.value;
        const heading = e.target.heading.value;

        if (!logo || !post || !author || !heading) {
            notify('Please fill all required fields', 0);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('post', post);
        formData.append('author', author);
        formData.append('heading', heading);

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_WEBSITE_BLOG_URL + "add",
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
                setquill_value(null);
                setImagePreview(null);
                setCharacterCount(0);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Error adding blog post. Please try again.', 0);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Custom Quill toolbar options
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'list', 'bullet', 'indent',
        'align',
        'blockquote', 'code-block',
        'link', 'image', 'video'
    ];

    const inputClassName = "w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white font-medium text-gray-700 placeholder-gray-400";

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Main Card */}
                <div className={`relative bg-white rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10 relative">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
                            Create Blog Post
                        </h1>
                        <p className="text-blue-100 text-center text-lg max-w-2xl mx-auto">
                            Craft engaging content for your website blog with rich text editing
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-6 py-8 sm:px-8 sm:py-10 relative">
                        <form onSubmit={submit_handler} className="space-y-8">
                            
                            {/* Image Upload and Author - Side by side on desktop */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Image Upload */}
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</div>
                                        Featured Image
                                        <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <div className="space-y-4">
                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <div className="flex justify-center">
                                                <div className="relative w-full max-w-xs">
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="Featured preview" 
                                                        className="w-full h-48 object-cover rounded-2xl shadow-lg border border-gray-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview(null);
                                                            document.getElementById('logo').value = '';
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200 shadow-lg"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* File Input */}
                                        <div>
                                            <input
                                                type="file"
                                                id="logo"
                                                name="logo"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                required
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="logo"
                                                className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <div className="text-center">
                                                        <span className="text-blue-600 font-semibold text-lg">Click to upload</span>
                                                        <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                                                        <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG up to 5MB</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Author Name */}
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</div>
                                        Author Name
                                        <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="author"
                                            name="author"
                                            type="text"
                                            required
                                            placeholder="Enter author's full name"
                                            className={inputClassName}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 ml-1">
                                        The name that will be displayed as the author of this post
                                    </p>
                                </div>
                            </div>

                            {/* Heading Field */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">3</div>
                                    Blog Heading
                                    <span className="text-red-400 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="heading"
                                        name="heading"
                                        required
                                        rows="3"
                                        maxLength="200"
                                        onChange={handleHeadingChange}
                                        placeholder="Write an engaging headline for your blog post..."
                                        className={`${inputClassName} resize-none`}
                                    />
                                    <div className="absolute bottom-3 right-3">
                                        <span className={`text-xs font-medium ${characterCount > 180 ? 'text-red-500' : 'text-gray-400'}`}>
                                            {characterCount}/200
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    Keep your heading concise and engaging (max 200 characters)
                                </p>
                            </div>

                            {/* Rich Text Editor */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-3">4</div>
                                    Blog Content
                                    <span className="text-red-400 ml-1">*</span>
                                </label>
                                <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-200 transition-all duration-300">
                                    <ReactQuill 
                                        value={quill_value}  
                                        onChange={setquill_value}
                                        modules={modules}
                                        formats={formats}
                                        theme="snow"
                                        style={{ 
                                            border: 'none',
                                            borderRadius: '0.75rem'
                                        }}
                                        className="rounded-xl"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    Write your blog content using the rich text editor above
                                </p>
                            </div>

                            {/* Content Preview (Optional) */}
                            {quill_value && (
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-3">5</div>
                                        Content Preview
                                    </label>
                                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 max-h-64 overflow-y-auto">
                                        <div className="prose prose-lg max-w-none">
                                            {parse(quill_value)}
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
                                            <span className="text-lg">Publishing Blog...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="text-lg">Publish Blog Post</span>
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
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Rich Editor</h3>
                        <p className="text-xs text-gray-600">Full formatting</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Image Support</h3>
                        <p className="text-xs text-gray-600">Visual content</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Live Preview</h3>
                        <p className="text-xs text-gray-600">Real-time editing</p>
                    </div>
                </div>
            </div>
        </div>
    );
}




