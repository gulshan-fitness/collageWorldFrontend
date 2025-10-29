import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Website_news_add() {
    const { quill_value, setquill_value, token, notify } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [mediaLogoPreview, setMediaLogoPreview] = useState(null);
    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        setquill_value(null);
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    // Handle image previews
    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'main') {
                    setImagePreview(reader.result);
                } else {
                    setMediaLogoPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            if (type === 'main') {
                setImagePreview(null);
            } else {
                setMediaLogoPreview(null);
            }
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
        const news_media_logo = e.target.news_media_logo.files[0];
        const url = e.target.url.value;
        const heading = e.target.heading.value;

        if (!logo || !news_media_logo || !url || !heading) {
            notify('Please fill all required fields', 0);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('url', url);
        formData.append('news_media_logo', news_media_logo);
        formData.append('heading', heading);

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_WEBSITE_NEWS_URL + "add",
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
                setImagePreview(null);
                setMediaLogoPreview(null);
                setCharacterCount(0);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Error adding news. Please try again.', 0);
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Main Card */}
                <div className={`relative bg-white rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10 relative">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
                            Add News Article
                        </h1>
                        <p className="text-blue-100 text-center text-lg max-w-2xl mx-auto">
                            Share the latest news and updates with engaging visuals
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-6 py-8 sm:px-8 sm:py-10 relative">
                        <form onSubmit={submit_handler} className="space-y-8">
                            
                            {/* Image Uploads Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Main Image Upload */}
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</div>
                                        News Image
                                        <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <div className="space-y-4">
                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <div className="flex justify-center">
                                                <div className="relative w-full max-w-xs">
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="News preview" 
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
                                                onChange={(e) => handleImageChange(e, 'main')}
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
                                                        <span className="text-blue-600 font-semibold text-lg">Upload News Image</span>
                                                        <p className="text-sm text-gray-500 mt-1">Main article image</p>
                                                        <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG up to 5MB</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Media Logo Upload */}
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</div>
                                        Media Logo
                                        <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <div className="space-y-4">
                                        {/* Logo Preview */}
                                        {mediaLogoPreview && (
                                            <div className="flex justify-center">
                                                <div className="relative">
                                                    <div className="w-32 h-32 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center p-4">
                                                        <img 
                                                            src={mediaLogoPreview} 
                                                            alt="Media logo preview" 
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setMediaLogoPreview(null);
                                                            document.getElementById('news_media_logo').value = '';
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
                                                id="news_media_logo"
                                                name="news_media_logo"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 'logo')}
                                                required
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="news_media_logo"
                                                className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 cursor-pointer text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    <div className="text-center">
                                                        <span className="text-indigo-600 font-semibold text-lg">Upload Media Logo</span>
                                                        <p className="text-sm text-gray-500 mt-1">News source logo/brand</p>
                                                        <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG up to 2MB</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* URL and Heading Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* URL Field */}
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">3</div>
                                        Article URL
                                        <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="url"
                                            name="url"
                                            type="url"
                                            required
                                            placeholder="https://example.com/news-article"
                                            className={inputClassName}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 ml-1">
                                        Full URL to the original news article
                                    </p>
                                </div>

                                {/* Heading Field */}
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-3">4</div>
                                        News Heading
                                        <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="heading"
                                            name="heading"
                                            required
                                            rows="3"
                                            maxLength="150"
                                            onChange={handleHeadingChange}
                                            placeholder="Write an engaging headline for the news..."
                                            className={`${inputClassName} resize-none`}
                                        />
                                        <div className="absolute bottom-3 right-3">
                                            <span className={`text-xs font-medium ${characterCount > 120 ? 'text-red-500' : 'text-gray-400'}`}>
                                                {characterCount}/150
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 ml-1">
                                        Keep it concise and attention-grabbing
                                    </p>
                                </div>
                            </div>

                            {/* Preview Section */}
                            {(imagePreview || mediaLogoPreview) && (
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-3">5</div>
                                        News Preview
                                    </label>
                                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200">
                                        <div className="flex flex-col sm:flex-row items-center gap-6">
                                            {imagePreview && (
                                                <div className="flex-shrink-0">
                                                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                                                        <img 
                                                            src={imagePreview} 
                                                            alt="News thumbnail" 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {mediaLogoPreview && (
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
                                                        <img 
                                                            src={mediaLogoPreview} 
                                                            alt="Media logo" 
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex-1 text-center sm:text-left">
                                                <h4 className="font-semibold text-gray-800 mb-2">News Article Preview</h4>
                                                <p className="text-sm text-gray-600">
                                                    This is how your news article will appear with the uploaded images.
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
                                            <span className="text-lg">Publishing News...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-lg">Publish News Article</span>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">News Ready</h3>
                        <p className="text-xs text-gray-600">Professional format</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">Visual</h3>
                        <p className="text-xs text-gray-600">Image support</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">External Links</h3>
                        <p className="text-xs text-gray-600">URL integration</p>
                    </div>
                </div>
            </div>
        </div>
    );
}