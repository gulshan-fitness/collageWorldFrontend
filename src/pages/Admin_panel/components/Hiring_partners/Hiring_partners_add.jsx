import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';

export default function Hiring_partners_add() {
    const { college_fetch, colleges, selected_college, setselected_college, token, notify, admin } = useContext(Context);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
        if (!admin) return;
        
        if (admin?.role === "subadmin" && admin?.collage_id) {      
            college_fetch(admin?.collage_id);
        } else if (admin?.role === "superadmin") {
            college_fetch();
        }
        setselected_college(null);
    }, [admin]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit_handler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const logo = e.target.logo.files[0];
        const college_id = selected_college?.value;
        const company_name = e.target.company_name.value;
        const website = e.target.website.value;
        
        // Validation
        if (!college_id || !company_name || !website || !logo) {
            notify('Please fill all required fields', 0);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('college_id', college_id);
        formData.append('company_name', company_name);
        formData.append('website', website);

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_HIRING_PARTNERS_URL + "add",
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
                setselected_college(null);
                setLogoPreview(null);
            }
        } catch (error) {
            console.error('Error:', error);
            notify('An error occurred while submitting the form', 0);
        } finally {
            setIsSubmitting(false);
        }
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            border: state.isFocused ? '2px solid #3b82f6' : '1px solid #d1d5db',
            borderRadius: '8px',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
                borderColor: state.isFocused ? '#3b82f6' : '#9ca3af'
            },
            backgroundColor: '#f9fafb'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            padding: '12px 16px',
            fontSize: '14px'
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        Add Hiring Partner
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Register new hiring partners for colleges
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                        <h2 className="text-xl font-semibold text-white">
                            Partner Information
                        </h2>
                    </div>
                    
                    <form onSubmit={submit_handler} encType="multipart/form-data" className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* College Selection */}
                            <div className="lg:col-span-2">
                                <label htmlFor="college_id" className="block text-sm font-semibold text-gray-700 mb-2">
                                    College <span className="text-red-500">*</span>
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

                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="company_name">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="company_name"
                                    name="company_name"
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter company name"
                                    required
                                />
                            </div>

                            {/* Website */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="website">
                                    Website <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="website"
                                    name="website"
                                    type="url"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="https://example.com"
                                    required
                                />
                            </div>

                            {/* Logo Upload */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="logo">
                                    Company Logo <span className="text-red-500">*</span>
                                </label>
                                
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* File Input */}
                                    <div className="flex-1">
                                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 group">
                                            <input
                                                type="file"
                                                id="logo"
                                                name="logo"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                required
                                            />
                                            <div className="text-center">
                                                <div className="mx-auto w-12 h-12 mb-3 text-gray-400 group-hover:text-blue-500 transition-colors">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logo Preview */}
                                    {logoPreview && (
                                        <div className="flex flex-col items-center">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Preview</p>
                                            <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                                                <img 
                                                    src={logoPreview} 
                                                    alt="Logo preview" 
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Adding Partner...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Hiring Partner
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-blue-600 mt-0.5">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-800 text-sm">Information</h3>
                            <p className="text-blue-700 text-sm mt-1">
                                This form allows you to add new hiring partners that will be associated with the selected college. 
                                All fields are required to ensure proper registration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}