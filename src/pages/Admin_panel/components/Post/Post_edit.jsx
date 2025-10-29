import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiEdit, 
  FiSave, 
  FiImage, 
  FiUser, 
  FiType, 
  FiBook,
  FiUpload,
  FiArrowLeft,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';

export default function Post_edit() {
    const { college_fetch, colleges, selected_college, setselected_college, posts_fetch, current_post, quill_value, setquill_value, token, notify, admin } = useContext(Context);
    const [current_data, setcurrent_data] = useState(null);
    const [logo_value, setlogo_value] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filePreview, setFilePreview] = useState(null);
    const logo_ref = useRef();
    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await posts_fetch(id, null);

            if (!admin) return;

            if (admin?.role === "subadmin" && admin?.collage_id) {
                await college_fetch(admin?.collage_id);
            } else if (admin?.role === "superadmin") {
                await college_fetch();
            }
            setIsLoading(false);
        };

        fetchData();
    }, [id, admin]);

    useEffect(() => {
        if (current_post) {
            setcurrent_data(current_post);
            setselected_college({
                label: current_post?.college_id?.college_name,
                value: current_post?.college_id?._id
            });
            setquill_value(current_post?.post);
            setFilePreview(process.env.REACT_APP_API_IMAGE_URL + "Post_image/" + current_post?.logo);
        }
    }, [current_post]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setlogo_value(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit_handler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const college_id = selected_college?.value;
        const post = quill_value;
        const author = e.target.author.value;
        const heading = e.target.heading.value;

        const data = {
            college_id: college_id,
            post: post,
            author: author,
            heading: heading
        };

        try {
            const response = await axios.put(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_POST_URL + "edit/" + id,
                data,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            notify(response.data.msg, response.data.status);
            if (response.data.status === 1) {
                await posts_fetch(id, null);
                setTimeout(() => {
                    navigate('/admin/posts');
                }, 1500);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Failed to update post', 0);
        } finally {
            setIsSubmitting(false);
        }
    };

    const logo_handler = async () => {
        if (!logo_value) return;

        setIsUploading(true);
        const logo = logo_value;
        const old_logo = current_data?.logo;
        const id = current_data?._id;

        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("old_logo", old_logo);

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_POST_URL}logo_edit/${id}`,
                formData,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            notify(response.data.msg, response.data.status);
            if (response.data.status === 1) {
                await posts_fetch(id, null);
                setlogo_value(null);
                logo_ref.current.value = "";
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Failed to update image', 0);
        } finally {
            setIsUploading(false);
        }
    };


    console.log(colleges,"colleges");
    

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 text-lg">Loading post details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100 mb-4">
                        <div className="p-2 bg-purple-100 rounded-full">
                            <FiEdit className="w-5 h-5 text-purple-600" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Edit Post
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Update your post information and content
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Form Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                        <FiBook className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Post Content</h2>
                                        <p className="text-purple-100 text-sm">Update the main content and details</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            <form onSubmit={submit_handler} className="p-6 md:p-8">
                                <div className="space-y-6">
                                    
                                    {/* College Selection & Author */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                <FiBook className="w-4 h-4 text-purple-600" />
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
                                            <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <FiUser className="w-4 h-4 text-purple-600" />
                                                Author Name
                                            </label>
                                            <input
                                                defaultValue={current_data?.author}
                                                id="author"
                                                name="author"
                                                type="text"
                                                required
                                                placeholder="Enter author's name"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Heading */}
                                    <div>
                                        <label htmlFor="heading" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <FiType className="w-4 h-4 text-purple-600" />
                                            Post Heading
                                        </label>
                                        <textarea
                                            defaultValue={current_data?.heading}
                                            id="heading"
                                            name="heading"
                                            required
                                            rows="3"
                                            placeholder="Enter an engaging heading for your post..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 transition-all duration-200 placeholder-gray-400 resize-none"
                                        />
                                    </div>

                                    {/* Rich Text Editor */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <FiEdit className="w-4 h-4 text-purple-600" />
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

                                {/* Action Buttons */}
                                <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                                 
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FiSave className="w-5 h-5" />
                                                Update Post
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar - Image Upload & Info */}
                    <div className="space-y-6">
                        
                        {/* Image Upload Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                        <FiImage className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Featured Image</h2>
                                        <p className="text-blue-100 text-sm">Update the post image</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Current Image Preview */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Current Image</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                                        <img
                                            src={filePreview}
                                            alt="Current post"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors duration-200 bg-gray-50">
                                        <input
                                            ref={logo_ref}
                                            type="file"
                                            id="logo"
                                            name="logo"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label htmlFor="logo" className="cursor-pointer block">
                                            <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 font-medium">Click to upload new image</p>
                                            <p className="text-gray-400 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
                                        </label>
                                    </div>

                                    {logo_value && (
                                        <button
                                            onClick={logo_handler}
                                            disabled={isUploading}
                                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isUploading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <FiCheck className="w-5 h-5" />
                                                    Update Image
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <FiAlertCircle className="w-5 h-5 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Editing Tips</h3>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Use clear and engaging headings</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Add relevant images to make posts visually appealing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Use proper formatting for better readability</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Proofread content before saving</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}