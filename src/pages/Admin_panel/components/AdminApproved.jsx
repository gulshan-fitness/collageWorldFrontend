import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Context } from '../../../Context_holder'
import { 
  FaCheck, 
  FaTimes, 
  FaUserShield, 
  FaCrown, 
  FaEnvelope, 
  FaPhone, 
  FaUserTag,
  FaRocket,
  FaShieldAlt,
  FaSync,
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
  FaChartLine,FaClock
} from 'react-icons/fa';
import { FiUserCheck, FiUserX } from 'react-icons/fi';

export default function AdminApproved() {
    const { notify, token } = useContext(Context)
    const [Approveladmins, setApproveladmins] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [showDetailsModal, setShowDetailsModal] = useState(false)

    const AdminsFetch = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ADMIN_URL}read`)
            .then((response) => {
                if (response.data.status === 1) {
                    setApproveladmins(response.data.admins)
                }
            })
            .catch((error) => {
                notify(error.message, 0)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        AdminsFetch()
    }, [])

    const approveAdmin = (id) => {
        if (!token || !id) return

        axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ADMIN_URL}approve/${id}`,
            {},
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then((response) => {
                notify(response.data.msg, response.data.status)
                if (response.data.status === 1) {
                    AdminsFetch()
                }
            })
            .catch((error) => {
                notify(error.message, 0)
            })
    }

    const viewAdminDetails = (admin) => {
        setSelectedAdmin(admin)
        setShowDetailsModal(true)
    }

    // Calculate stats
    const stats = {
        total: Approveladmins.length,
        approved: Approveladmins.filter(admin => admin.approved).length,
        pending: Approveladmins.filter(admin => !admin.approved).length,
        superAdmins: Approveladmins.filter(admin => admin.role === 'super_admin').length
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading Admin Dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Premium Header */}
                <div className="mb-8">
                    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl mb-8 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                        
                        <div className="relative ">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                            <FaUserShield className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl lg:text-4xl font-bold">Admin Management</h1>
                                            <p className="text-indigo-100 text-lg opacity-90 mt-2">
                                                Manage administrator accounts and permissions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={AdminsFetch}
                                    className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
                                >
                                    <FaSync className="w-4 h-4" />
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Total Admins</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <FaUserShield className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center text-sm text-blue-600">
                                <FaChartLine className="w-4 h-4 mr-1" />
                                <span>All administrators</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <FiUserCheck className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center text-sm text-green-600">
                                <FaCheck className="w-4 h-4 mr-1" />
                                <span>Active administrators</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                                    <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <FiUserX className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center text-sm text-orange-600">
                                <FaClock className="w-4 h-4 mr-1" />
                                <span>Awaiting approval</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Super Admins</p>
                                    <p className="text-3xl font-bold text-purple-600">{stats.superAdmins}</p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <FaCrown className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center text-sm text-purple-600">
                                <FaStar className="w-4 h-4 mr-1" />
                                <span>Elevated privileges</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admins Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Admin Profile</th>
                                    <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Contact Information</th>
                                    <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Role & Status</th>
                                    <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {Approveladmins?.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <FaUserShield className="text-5xl mb-4 text-gray-300" />
                                                <p className="text-xl font-semibold text-gray-500 mb-2">No Administrators Found</p>
                                                <p className="text-sm">There are no admin accounts to display</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    Approveladmins?.map((admin, index) => (
                                        <tr key={admin?._id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group">
                                            {/* Admin Profile */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-start space-x-4">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                            {admin?.name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        {admin?.approved && (
                                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                                <FaCheck className="w-2 h-2 text-white" />
                                                            </div>
                                                        )}
                                                        {admin?.role === 'super_admin' && (
                                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                                                                <FaCrown className="w-2 h-2 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors duration-200 truncate">
                                                                {admin?.name}
                                                            </h3>
                                                            {admin?.role === 'super_admin' && (
                                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                                    <FaCrown className="w-3 h-3" />
                                                                    Super Admin
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 truncate">{admin?.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact Information */}
                                            <td className="px-6 py-5">
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <FaEnvelope className="w-3 h-3 mr-2 text-gray-400" />
                                                        <span className="truncate">{admin?.email}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <FaPhone className="w-3 h-3 mr-2 text-gray-400" />
                                                        {admin?.contact || 'Not provided'}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role & Status */}
                                            <td className="px-6 py-5">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <FaUserTag className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Role</p>
                                                            <p className="font-semibold text-gray-900 capitalize">{admin?.role?.replace('_', ' ')}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${
                                                        admin?.approved 
                                                            ? 'bg-green-100 text-green-800 border border-green-200' 
                                                            : 'bg-orange-100 text-orange-800 border border-orange-200'
                                                    }`}>
                                                        {admin?.approved ? (
                                                            <>
                                                                <FaCheck className="w-4 h-4" />
                                                                Approved
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaTimes className="w-4 h-4" />
                                                                Pending Approval
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => viewAdminDetails(admin)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                                                    >
                                                        <FaEye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                                                        View Details
                                                    </button>
                                                    {!admin?.approved && (
                                                        <button
                                                            onClick={() => approveAdmin(admin?._id)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                                                        >
                                                            <FaCheck className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                                                            Approve Admin
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Admin Details Modal */}
                {showDetailsModal && selectedAdmin && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto border border-gray-200">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                        <FaUserShield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Admin Details</h2>
                                        <p className="text-sm text-gray-600">Complete administrator information</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Profile Header */}
                                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {selectedAdmin?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedAdmin?.name}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                selectedAdmin?.approved 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-orange-100 text-orange-800'
                                            }`}>
                                                {selectedAdmin?.approved ? 'Approved' : 'Pending Approval'}
                                            </span>
                                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold capitalize">
                                                {selectedAdmin?.role?.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <FaEnvelope className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Email Address</p>
                                                <p className="font-semibold text-gray-900">{selectedAdmin?.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                                <FaPhone className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Contact Number</p>
                                                <p className="font-semibold text-gray-900">{selectedAdmin?.contact || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                                <FaUserTag className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Administrator Role</p>
                                                <p className="font-semibold text-gray-900 capitalize">{selectedAdmin?.role?.replace('_', ' ')}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                                <FaShieldAlt className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Account Status</p>
                                                <p className={`font-semibold ${
                                                    selectedAdmin?.approved ? 'text-green-600' : 'text-orange-600'
                                                }`}>
                                                    {selectedAdmin?.approved ? 'Active & Approved' : 'Pending Approval'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {!selectedAdmin?.approved && (
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => {
                                                approveAdmin(selectedAdmin?._id)
                                                setShowDetailsModal(false)
                                            }}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2"
                                        >
                                            <FaCheck className="w-5 h-5" />
                                            Approve Administrator
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}