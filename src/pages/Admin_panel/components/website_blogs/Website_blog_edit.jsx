import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

export default function Website_blog_edit() {
    const { website_blog_fetch, currentwebsite_blog, quill_value, setquill_value, token, notify } = useContext(Context);
    const [current_data, setcurrent_data] = useState(null);
    const [logo_value, setlogo_value] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLogoSubmitting, setIsLogoSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const [imagePreview, setImagePreview] = useState(null);

    const logo_ref = useRef();
    const { id } = useParams();

    useEffect(() => {
        website_blog_fetch(id);
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    useEffect(() => {
        setcurrent_data(currentwebsite_blog);
        setquill_value(currentwebsite_blog?.post);
        setCharacterCount(currentwebsite_blog?.heading?.length || 0);
        setImagePreview(currentwebsite_blog?.logo ? 
            `${process.env.REACT_APP_API_IMAGE_URL}website_blog_image/${currentwebsite_blog?.logo}`  : null);
    }, [currentwebsite_blog]);

    // Handle heading character count
    const handleHeadingChange = (e) => {
        setCharacterCount(e.target.value.length);
    };

    // Handle image preview for new upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setlogo_value(file);
        }
    };

    const submit_handler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const post = quill_value;
        const author = e.target.author.value;
        const heading = e.target.heading.value;

        if (!post || !author || !heading) {
            notify('Please fill all required fields', 0);
            setIsSubmitting(false);
            return;
        }

        const data = {
            post: post,
            author: author,
            heading: heading
        };

        try {
            const response = await axios.put(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_WEBSITE_BLOG_URL + "edit/" + id,
                data,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            notify(response.data.msg, response.data.status);
            if (response.data.status === 1) {
                website_blog_fetch(id);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Error updating blog post. Please try again.', 0);
        } finally {
            setIsSubmitting(false);
        }
    };

    const logo_handler = async () => {
        if (!logo_value) {
            notify('Please select an image first', 0);
            return;
        }

        setIsLogoSubmitting(true);
        const logo = logo_value;
        const old_logo = current_data?.logo;
        const id = current_data?._id;

        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("old_logo", old_logo);

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_WEBSITE_BLOG_URL}logo_edit/${id}`,
                formData,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            notify(response.data.msg, response.data.status);
            if (response.data.status === 1) {
                website_blog_fetch(id);
                setlogo_value(null);
                logo_ref.current.value = "";
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Error updating image. Please try again.', 0);
        } finally {
            setIsLogoSubmitting(false);
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
                            Edit Blog Post
                        </h1>
                        <p className="text-blue-100 text-center text-lg max-w-2xl mx-auto">
                            Update and refine your blog content with real-time preview
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-6 py-8 sm:px-8 sm:py-10 relative">
                        <form onSubmit={submit_handler} className="space-y-8">
                            
                            {/* Author Field */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</div>
                                    Author Name
                                    <span className="text-red-400 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        defaultValue={current_data?.author}
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
                            </div>

                            {/* Heading Field */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</div>
                                    Blog Heading
                                    <span className="text-red-400 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        defaultValue={current_data?.heading}
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
                            </div>

                            {/* Rich Text Editor */}
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">3</div>
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
                            </div>

                            {/* Content Preview */}
                            {quill_value && (
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-3">4</div>
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
                                            <span className="text-lg">Updating Blog...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-lg">Update Blog Post</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Image Update Section */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-3">5</div>
                                    Update Featured Image
                                </label>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                    {/* Current Image Preview */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-700">Current Image</h4>
                                        <div className="bg-gray-50 rounded-2xl p-4 border-2 border-dashed border-gray-200">
                                            {imagePreview && current_data?.logo ? (
                                                <div className="text-center">
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="Current featured" 
                                                        className="w-full h-48 object-cover rounded-xl mx-auto shadow-lg"
                                                    />
                                                    <p className="text-sm text-gray-500 mt-2">Current featured image</p>
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">

                                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>

                                                    <p className="text-gray-500">No current image</p>

                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* New Image Upload */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-700">New Image</h4>
                                        <div className="space-y-4">
                                            <input

                                                ref={logo_ref}
                                                type='file'
                                                id="logo"
                                                name="logo"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"

                                            />
                                            <label
                                                htmlFor="logo"
                                                className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <div className="text-center">
                                                        <span className="text-blue-600 font-semibold text-lg">Click to upload</span>
                                                        <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                                                        <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG up to 5MB</p>
                                                    </div>
                                                </div>
                                            </label>

                                            {/* Update Image Button */}
                                            <button
                                                type="button"
                                                onClick={logo_handler}
                                                disabled={!logo_value || isLogoSubmitting}
                                                className={`
                                                    w-full
                                                    bg-gradient-to-r from-orange-500 to-amber-600
                                                    hover:from-orange-600 hover:to-amber-700
                                                    disabled:from-gray-400 disabled:to-gray-500
                                                    text-white font-bold py-3 px-6 
                                                    rounded-xl shadow-lg
                                                    transform transition-all duration-300
                                                    hover:shadow-xl
                                                    focus:outline-none focus:ring-4 focus:ring-orange-200
                                                    disabled:cursor-not-allowed
                                                    disabled:transform-none
                                                    ${logo_value ? 'opacity-100' : 'opacity-50'}
                                                `}
                                            >
                                                {isLogoSubmitting ? (
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Updating Image...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>Update Featured Image</span>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <h3 className="font-semibold text-gray-800 text-sm">Live Editing</h3>
                        <p className="text-xs text-gray-600">Real-time updates</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Safe</h3>
                        <p className="text-xs text-gray-600">Auto-save ready</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Preview</h3>
                        <p className="text-xs text-gray-600">Live preview</p>
                    </div>
                </div>
            </div>
        </div>
    );
}