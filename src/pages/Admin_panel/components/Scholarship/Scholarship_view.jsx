import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import axios from 'axios';

export default function Scholarship_view() {
  const { scholarship_fetch, scholarship, token, notify, admin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [scholarshipToDelete, setScholarshipToDelete] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const openDeleteModal = (scholarship) => {
    setScholarshipToDelete(scholarship);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setScholarshipToDelete(null);
  };

  const delete_handler = async () => {
    if (!scholarshipToDelete) return;

    setDeletingId(scholarshipToDelete._id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SCHOLARSHIP_URL}delete/${scholarshipToDelete._id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        if (admin?.role === "subadmin") {
          await scholarship_fetch(null, admin?.collage_id);
        } else {
          await scholarship_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      notify('Failed to delete scholarship', 0);
    } finally {
      setDeletingId(null);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      if (admin?.role === "subadmin") {
        await scholarship_fetch(null, admin?.collage_id);
      } else {
        await scholarship_fetch(null, null);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [admin]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading scholarships...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!scholarship?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 text-purple-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5m-9 5v9" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Scholarships Found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start creating scholarship opportunities to help students achieve their academic dreams.
            </p>
            <Link
              to="/admin/scholarship/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add First Scholarship
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Scholarship Programs
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage and track all scholarship opportunities for students
                </p>
              </div>
              <Link
                to="/admin/scholarship/add"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Scholarship
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Scholarships</p>
                  <p className="text-2xl font-bold text-gray-900">{scholarship.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {scholarship.filter(s => new Date(s.application_deadline) > new Date()).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">International</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {scholarship.filter(s => s.international_students).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Expired</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {scholarship.filter(s => new Date(s.application_deadline) <= new Date()).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">College</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seats</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">International</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Link</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {scholarship?.map((data, index) => {
                    const isExpired = new Date(data.application_deadline) <= new Date();
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{data.college_id?.college_name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {data.scholarship_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-700 font-medium">{data.organisation}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex flex-col ${isExpired ? 'text-red-600' : 'text-gray-700'}`}>
                            <span className="font-medium">{monthNames[new Date(data.application_deadline).getMonth()]}</span>
                            <span className="text-sm">{new Date(data.application_deadline).getDate()}</span>
                            {isExpired && (
                              <span className="text-xs text-red-500 font-medium">Expired</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {data.no_of_scholarships}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            ₹{data.amount?.toLocaleString() || '0'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            data.international_students 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {data.international_students ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link 
                            to={data.scholarship_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Visit
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link 
                              to={`/admin/scholarship/edit/${data._id}`}
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
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              <div className="p-4 space-y-4">
                {scholarship?.map((data, index) => {
                  const isExpired = new Date(data.application_deadline) <= new Date();
                  return (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{data.college_id?.college_name}</h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              {data.scholarship_type}
                            </span>
                          </div>
                        </div>
                        {isExpired && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Expired
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-600">Organization:</span>
                          <p className="font-medium text-gray-900">{data.organisation}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Deadline:</span>
                          <p className="font-medium text-gray-900">
                            {monthNames[new Date(data.application_deadline).getMonth()]} {new Date(data.application_deadline).getDate()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Seats:</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            {data.no_of_scholarships}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Amount:</span>
                          <p className="font-medium text-gray-900">₹{data.amount?.toLocaleString() || '0'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">International:</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            data.international_students 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {data.international_students ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Link:</span>
                          <Link 
                            to={data.scholarship_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                          >
                            Visit ↗
                          </Link>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <Link 
                          to={`/admin/scholarship/edit/${data._id}`}
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && scholarshipToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete Scholarship</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the scholarship for <span className="font-semibold text-gray-900">"{scholarshipToDelete.college_id?.college_name}"</span>? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeDeleteModal}
                  disabled={deletingId === scholarshipToDelete._id}
                  className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={delete_handler}
                  disabled={deletingId === scholarshipToDelete._id}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {deletingId === scholarshipToDelete._id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Scholarship'
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