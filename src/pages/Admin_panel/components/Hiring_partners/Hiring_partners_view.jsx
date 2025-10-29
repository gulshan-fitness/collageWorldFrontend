import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';

export default function Hiring_partners_view() {
    const { hiring_partners_fetch, hiring_partners, token, notify, admin } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [partnerToDelete, setPartnerToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (admin?.role === "subadmin") {
                await hiring_partners_fetch(null, admin?.collage_id);
            } else {
                await hiring_partners_fetch(null, null);
            }
            setIsLoading(false);
        };
        
        fetchData();
    }, [admin]);

    const openDeleteModal = (id, logo, companyName) => {
        setPartnerToDelete({ id, logo, companyName });
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setPartnerToDelete(null);
    };

    const delete_handler = async () => {
        if (!partnerToDelete) return;

        const { id, logo } = partnerToDelete;
        setDeletingId(id);
        
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_HIRING_PARTNERS_URL}delete/${id}/${logo}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            notify(response.data.msg, response.data.status);

            if (response.data.status === 1) {
                if (admin?.role === "subadmin") {
                    await hiring_partners_fetch(null, admin?.collage_id);
                } else {
                    await hiring_partners_fetch(null, null);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            notify('Failed to delete hiring partner', 0);
        } finally {
            setDeletingId(null);
            closeDeleteModal();
        }
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading hiring partners...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Empty State
    if (!hiring_partners?.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">No Hiring Partners Found</h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Get started by adding your first hiring partner to build relationships with companies.
                        </p>
                        <Link
                            to="/admin/hiring_partners/add"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add First Partner
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Hiring Partners
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Manage your college's industry partnerships and collaborations
                                </p>
                            </div>
                            <Link
                                to="/admin/hiring_partners/add"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Partner
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Partners</p>
                                    <p className="text-2xl font-bold text-gray-900">{hiring_partners.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">College</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Website</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {hiring_partners?.map((data, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img 
                                                        src={process.env.REACT_APP_API_IMAGE_URL + "hiring_partners_logo/" + data.logo} 
                                                        alt={data.companyName}
                                                        className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-sm"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{data.companyName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-700 font-medium">{data.college_id?.college_name}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link 
                                                    to={data.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Visit Website
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link 
                                                        to={`/admin/hiring_partners/edit/${data._id}`}
                                                        className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => openDeleteModal(data._id, data.logo, data.companyName)}
                                                        disabled={deletingId === data._id}
                                                        className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {deletingId === data._id ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                                                                Deleting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Delete
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden">
                            <div className="p-4 space-y-4">
                                {hiring_partners?.map((data, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
                                        <div className="flex items-start gap-4 mb-4">
                                            <img 
                                                src={process.env.REACT_APP_API_IMAGE_URL + "hiring_partners_logo/" + data.logo} 
                                                alt={data.companyName}
                                                className="w-16 h-16 rounded-xl object-cover border border-gray-200 shadow-sm"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 text-lg">{data.companyName}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{data.college_id?.college_name}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">Website:</span>
                                                <Link 
                                                    to={data.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                >
                                                    Visit
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </Link>
                                            </div>
                                            
                                            <div className="flex gap-2 pt-2">
                                                <Link 
                                                    to={`/admin/hiring_partners/edit/${data._id}`}
                                                    className="flex-1 inline-flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 border border-blue-200 text-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(data._id, data.logo, data.companyName)}
                                                    disabled={deletingId === data._id}
                                                    className="flex-1 inline-flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 border border-red-200 text-sm disabled:opacity-50"
                                                >
                                                    {deletingId === data._id ? (
                                                        <>
                                                            <div className="w-3 h-3 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                                                            Deleting
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && partnerToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Delete Hiring Partner</h3>
                            </div>
                            
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete <span className="font-semibold text-gray-900">"{partnerToDelete.companyName}"</span>? This action cannot be undone and will permanently remove this hiring partner from the system.
                            </p>

                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={closeDeleteModal}
                                    disabled={deletingId === partnerToDelete.id}
                                    className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={delete_handler}
                                    disabled={deletingId === partnerToDelete.id}
                                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {deletingId === partnerToDelete.id ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete Partner'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}