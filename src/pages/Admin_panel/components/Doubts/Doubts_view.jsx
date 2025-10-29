import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import axios from 'axios';

export default function Doubts_view() {
  const { doubts_fetch, doubts, token, notify, admin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const openDeleteModal = (faq) => {
    setFaqToDelete(faq);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setFaqToDelete(null);
  };

  const toggleExpand = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const delete_handler = async () => {
    if (!faqToDelete) return;

    setDeletingId(faqToDelete._id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_DOUBTS_URL}delete/${faqToDelete._id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        if (!admin) return;

        if (admin?.role === "subadmin" && admin?.collage_id) {
          await doubts_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await doubts_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      notify('Failed to delete FAQ', 0);
    } finally {
      setDeletingId(null);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      if (admin?.role === "subadmin" && admin?.collage_id) {
        await doubts_fetch(null, admin?.collage_id);
      } else if (admin?.role === "superadmin") {
        await doubts_fetch(null, null);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [admin]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading FAQs...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!doubts?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 text-emerald-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No FAQs Found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start creating helpful FAQs to answer common questions from students and parents.
            </p>
            <Link
              to="/admin/doubts/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add First FAQ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage and organize common questions and answers for students
                </p>
              </div>
              <Link
                to="/admin/doubts/add"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New FAQ
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total FAQs</p>
                  <p className="text-2xl font-bold text-gray-900">{doubts.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Colleges</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(doubts.map(faq => faq.college_id?._id)).size}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{doubts.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">College</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Question</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Answer Preview</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {doubts?.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{data.college_id?.college_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 font-medium max-w-xs">{data.doubt}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {data.answer}
                          </p>
                          {data.answer.length > 100 && (
                            <button
                              onClick={() => toggleExpand(data._id)}
                              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-1"
                            >
                              {expandedFaq === data._id ? 'Show less' : 'Read more'}
                            </button>
                          )}
                          {expandedFaq === data._id && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700 text-sm">{data.answer}</p>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/admin/doubts/edit/${data._id}`}
                            className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() => openDeleteModal(data)}
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
                {doubts?.map((data, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{data.college_id?.college_name}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700 block mb-1">Question:</span>
                        <p className="text-gray-900 font-medium text-sm">{data.doubt}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 block mb-1">Answer:</span>
                        <p className="text-gray-600 text-sm">
                          {expandedFaq === data._id ? data.answer : `${data.answer.substring(0, 100)}${data.answer.length > 100 ? '...' : ''}`}
                        </p>
                        {data.answer.length > 100 && (
                          <button
                            onClick={() => toggleExpand(data._id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-1"
                          >
                            {expandedFaq === data._id ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <Link 
                        to={`/admin/doubts/edit/${data._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 border border-blue-200 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(data)}
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && faqToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete FAQ</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this FAQ for <span className="font-semibold text-gray-900">"{faqToDelete.college_id?.college_name}"</span>? This action cannot be undone.
              </p>

              <div className="space-y-3 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700">Question:</p>
                <p className="text-gray-600 text-sm">{faqToDelete.doubt}</p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeDeleteModal}
                  disabled={deletingId === faqToDelete._id}
                  className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={delete_handler}
                  disabled={deletingId === faqToDelete._id}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {deletingId === faqToDelete._id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete FAQ'
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