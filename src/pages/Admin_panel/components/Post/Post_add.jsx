import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

export default function Post_add() {
    const { college_fetch, colleges, selected_college, setselected_college, quill_value, setquill_value, token, notify, admin } = useContext(Context);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    useEffect(() => {
        if (!admin) return;

        if (admin?.role === "subadmin" && admin?.collage_id) {
            college_fetch(admin?.collage_id);
        } else if (admin?.role === "superadmin") {
            college_fetch();
        }
        setselected_college(null);
    }, [admin]);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '48px',
            border: state.isFocused ? '2px solid #8b5cf6' : '1px solid #d1d5db',
            borderRadius: '12px',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(139, 92, 246, 0.1)' : 'none',
            backgroundColor: '#f9fafb',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                borderColor: state.isFocused ? '#8b5cf6' : '#9ca3af'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#8b5cf6' : state.isFocused ? '#f3f4f6' : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            padding: '12px 16px',
            fontSize: '14px'
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
        })
    };

    const quillModules = {
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

    const quillFormats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'list', 'bullet', 'indent',
        'align',
        'blockquote', 'code-block',
        'link', 'image', 'video'
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null);
        }
    };

    const submit_handler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const logo = e.target.logo.files[0];
        const college_id = selected_college?.value;
        const post = quill_value;
        const author = e.target.author.value;
        const heading = e.target.heading.value;

        if (!logo) {
            notify('Please select an image for the post', 0);
            setIsSubmitting(false);
            return;
        }

        if (!college_id) {
            notify('Please select a college', 0);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('college_id', college_id);
        formData.append('post', post);
        formData.append('author', author);
        formData.append('heading', heading);

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_POST_URL + "add",
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            notify(response.data.msg, response.data.status);

            if (response.data.status === 1) {
                e.target.reset();
                setselected_college(null);
                setquill_value('');
                setSelectedFile(null);
                setFilePreview(null);
                
                // Navigate to posts list after success
                setTimeout(() => {
                    navigate('/admin/posts');
                }, 1500);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Failed to create post. Please try again.', 0);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Create New Post
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Share news, updates, and important information with students and staff
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Post Information</h2>
                                <p className="text-purple-100 text-sm">Fill in the details to create an engaging post</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={submit_handler} encType="multipart/form-data" className="p-6 md:p-8">
                        <div className="space-y-6">
                            {/* College Selection & Author */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        College
                                    </label>
                                    <Select
                                        value={selected_college}
                                        styles={customStyles}
                                        onChange={(e) => setselected_college(e)}
                                        name="college_id"
                                        options={colleges?.map(data => ({
                                            value: data._id,
                                            label: data.college_name
                                        }))}
                                        placeholder="Select a college..."
                                        isSearchable
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Author Name
                                    </label>
                                    <input
                                        id="author"
                                        name="author"
                                        type="text"
                                        required
                                        placeholder="Enter author's name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Featured Image
                                </label>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="flex-1">
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors duration-200 bg-gray-50">
                                            <input
                                                type="file"
                                                id="logo"
                                                name="logo"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                required
                                            />
                                            <label htmlFor="logo" className="cursor-pointer block">
                                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-gray-600 font-medium">Click to upload image</p>
                                                <p className="text-gray-400 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
                                            </label>
                                        </div>
                                    </div>
                                    {filePreview && (
                                        <div className="md:w-48">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                                <img
                                                    src={filePreview}
                                                    alt="Preview"
                                                    className="w-full h-32 object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Heading */}
                            <div>
                                <label htmlFor="heading" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Post Heading
                                </label>
                                <textarea
                                    id="heading"
                                    name="heading"
                                    required
                                    rows="2"
                                    placeholder="Enter an engaging heading for your post..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 transition-all duration-200 placeholder-gray-400 resize-none"
                                />
                            </div>

                            {/* Rich Text Editor */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Post Content
                                </label>
                                <div className="border border-gray-300 rounded-xl overflow-hidden">
                                    <ReactQuill
                                        value={quill_value}
                                        onChange={setquill_value}
                                        modules={quillModules}
                                        formats={quillFormats}
                                        theme="snow"
                                        style={{ minHeight: '300px', border: 'none' }}
                                    />
                                </div>
                                {quill_value && (
                                    <div className="mt-2 text-sm text-gray-500">
                                        Content length: {quill_value.replace(/<[^>]*>/g, '').length} characters
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Post...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Create Post
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tips Card */}
                <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-purple-800 mb-2">Tips for Great Posts</h4>
                            <ul className="text-sm text-purple-700 space-y-1">
                                <li>• Use high-quality, relevant images that capture attention</li>
                                <li>• Write clear and engaging headings</li>
                                <li>• Structure your content with proper formatting</li>
                                <li>• Keep paragraphs short and easy to read</li>
                                <li>• Proofread before publishing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}