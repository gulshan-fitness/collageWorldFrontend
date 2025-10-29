import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Story_add() {
    const { college_fetch, colleges, selected_college, setselected_college, token, notify, admin } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!admin) return;

        if (admin?.role === "subadmin" && admin?.collage_id) {
            college_fetch(admin?.collage_id);
        } else if (admin?.role === "superadmin") {
            college_fetch();
        }

        setselected_college(null);
    }, [admin]);

    const submit_handler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const college_id = selected_college?.value;
        const title = e.target.title.value;
        const video_url = e.target.url.value;

        const data = {
            college_id: college_id,
            title: title,
            video_url: video_url
        };

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_STORY_URL + "add",
                data,
                {
                    headers: { Authorization: token }
                }
            );

            notify(response.data.msg, response.data.status);

            if (response.data.status === 1) {
                e.target.reset();
                setselected_college(null);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Failed to add student story', 0);
        } finally {
            setIsLoading(false);
        }
    };

    // Custom styles for react-select
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '52px',
            border: state.isFocused ? '2px solid #3b82f6' : '2px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: '#fafafa',
            '&:hover': {
                borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            padding: '12px 16px',
            fontSize: '14px',
            borderRadius: '6px',
            margin: '2px 8px',
            width: 'calc(100% - 16px)',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9ca3af',
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Add Student Story
                    </h1>
                    <p className="text-gray-600 text-lg">Share inspiring student success stories and experiences</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Student Story Details</h2>
                                <p className="text-purple-100 text-sm">Add a new inspiring student story</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={submit_handler} className="p-8">
                        <div className="space-y-8">
                            {/* College Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                                    <label htmlFor="college_id" className="block text-lg font-semibold text-gray-800">
                                        Select College
                                    </label>
                                </div>
                                <Select
                                    value={selected_college}
                                    styles={customSelectStyles}
                                    onChange={(e) => setselected_college(e)}
                                    name="college_id"
                                    options={colleges?.map(data => ({
                                        value: data._id,
                                        label: data.college_name
                                    }))}
                                    placeholder="Search and select college..."
                                    isSearchable
                                    noOptionsMessage={() => "No colleges found"}
                                    required
                                />
                                <p className="text-sm text-gray-500">
                                    Choose the college associated with this student story
                                </p>
                            </div>

                            {/* URL Input */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                                    <label className="block text-lg font-semibold text-gray-800" htmlFor="url">
                                        YouTube URL
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        id="url"
                                        name="url"
                                        type="url"
                                        required
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Enter the complete YouTube video URL
                                </p>
                            </div>

                            {/* Title Input */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                                    <label className="block text-lg font-semibold text-gray-800" htmlFor="title">
                                        Story Title
                                    </label>
                                </div>
                                <textarea
                                    id="title"
                                    name="title"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800 resize-none"
                                    placeholder="Enter an engaging title for the student story..."
                                />
                                <p className="text-sm text-gray-500">
                                    Write a compelling title that summarizes the student's journey
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-10 pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-blue-700'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding Story...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Student Story
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tips for Great Student Stories</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    Choose authentic and inspiring student experiences
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    Ensure YouTube videos are publicly accessible
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    Write engaging titles that capture the essence of the story
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    Verify the college selection matches the student's institution
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}