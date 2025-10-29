import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Context_holder';
import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiX,
  FiAlertTriangle,
  FiDownload,
  FiImage,
  FiBook,
  FiChevronDown,
  FiStar,
  FiCalendar
} from 'react-icons/fi';

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, ad }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-lg animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl max-w-md w-[95%] sm:w-[85%] border border-amber-500/30 shadow-2xl shadow-amber-500/20">
        {/* Header */}
        <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 border-b border-amber-500/20 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <FiAlertTriangle className="text-slate-900 text-lg sm:text-xl font-bold" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Delete Advertisement
            </h3>
            <p className="text-amber-200 text-sm mt-1">This action cannot be undone</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-amber-500/30"
          >
            <FiX className="text-amber-200 text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          {ad && (
            <div className="bg-slate-700/50 rounded-xl p-4 border border-amber-500/20">
              <div className="flex items-center space-x-3">
                {ad.banner && (
                  <img
                    src={`${process.env.REACT_APP_API_IMAGE_URL}PremiumAds/${ad?.banner}`}
                    alt="Ad"
                    className="w-14 h-10 sm:w-16 sm:h-12 rounded-lg object-cover border border-amber-500/30 shadow-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm sm:text-base truncate">
                    {ad?.college_id?.college_name || 'College Advertisement'}
                  </p>
                  <p className="text-amber-200 text-xs sm:text-sm flex items-center space-x-1 mt-1">
                    <FiCalendar className="text-amber-400" />
                    <span>Created: {new Date(ad.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-amber-500/20">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-slate-600 hover:border-amber-500/30 hover:shadow-lg hover:scale-105 min-h-[48px]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 min-h-[48px]"
          >
            <FiTrash2 className="text-lg" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function PremiumADView() {
  const { token, notify, PremiumAdd, PremiumAdfetch } = useContext(Context);
  const [filteredAds, setFilteredAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, ad: null });

  useEffect(() => {
    loadPremiumAds();
  }, []);

  useEffect(() => {
    filterAndSortAds();
  }, [PremiumAdd, searchTerm, selectedCollege, sortBy]);

  const loadPremiumAds = async () => {
    setIsLoading(true);
    await PremiumAdfetch(null, null);
    setIsLoading(false);
  };

  const filterAndSortAds = () => {
    let filtered = PremiumAdd?.filter((ad) => {
      const matchesSearch =
        ad.college_id?.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.banner?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCollege = selectedCollege === 'all' || ad.college_id?._id === selectedCollege;
      return matchesSearch && matchesCollege;
    });

    filtered = filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return (a.college_id?.college_name || '').localeCompare(b.college_id?.college_name || '');
        default:
          return 0;
      }
    });

    setFilteredAds(filtered || []);
  };

  const openDeleteModal = (ad) => setDeleteModal({ isOpen: true, ad });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, ad: null });

  const deleteAd = async () => {
    const { ad } = deleteModal;
    if (!ad) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PREMIUMAD_URL}delete/${ad?._id}/${ad?.banner}`,
        {
          method: 'DELETE',
          headers: { Authorization: token },
        }
      );
      const data = await response.json();
      notify(data.msg, data.status);
      if (data.status === 1) {
        await PremiumAdfetch(null, null);
        closeDeleteModal();
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
      notify('Failed to delete ad', 0);
      closeDeleteModal();
    }
  };

  const downloadImage = (banner) => {
    const imageUrl = `${process.env.REACT_APP_API_IMAGE_URL}PremiumAds/${banner}`;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `premium-ad-${banner}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueColleges = [
    ...new Map(
      PremiumAdd?.map((ad) => [ad.college_id?._id, ad.college_id])
    ).values(),
  ].filter((college) => college);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[95%] sm:w-[90%] lg:w-[85%] max-w-7xl mx-auto py-6 relative ">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl shadow-2xl shadow-amber-500/25 mb-4">
            <FiStar className="text-2xl sm:text-3xl text-slate-900" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent mb-3">
            Premium Advertisements
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Manage and showcase premium college advertisements with elegant design
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="text-2xl font-bold text-amber-400">{filteredAds.length}</div>
            <div className="text-slate-400 text-sm">Showing</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="text-2xl font-bold text-amber-400">{PremiumAdd?.length || 0}</div>
            <div className="text-slate-400 text-sm">Total Ads</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="text-2xl font-bold text-amber-400">{uniqueColleges.length}</div>
            <div className="text-slate-400 text-sm">Colleges</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="text-2xl font-bold text-amber-400">
              {new Date().getFullYear()}
            </div>
            <div className="text-slate-400 text-sm">Active</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-lg mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-lg" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ads or colleges..."
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white placeholder-slate-400 transition-all duration-300"
              />
            </div>

            {/* College Filter */}
            <div className="relative">
              <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-lg" />
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white appearance-none transition-all duration-300"
              >
                <option value="all">All Colleges</option>
                {uniqueColleges.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.college_name}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-lg" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white appearance-none transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By College Name</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCollege('all');
                setSortBy('newest');
              }}
              className="bg-slate-700 hover:bg-slate-600 text-amber-400 py-3 rounded-xl font-semibold transition-all duration-300 border border-slate-600 hover:border-amber-500/50 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <FiX className="text-lg" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>

        {/* Ads Grid */}
        {filteredAds?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <div
                key={ad._id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 overflow-hidden border border-slate-700 hover:border-amber-500/30 hover:scale-105"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_API_IMAGE_URL}PremiumAds/${ad?.banner}`}
                    alt={ad.college_id?.college_name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      PREMIUM
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg text-white mb-2 truncate">
                    {ad.college_id?.college_name || 'Unknown College'}
                  </h3>
                  <div className="flex items-center space-x-2 text-slate-400 text-sm mb-4">
                    <FiCalendar className="text-amber-400" />
                    <span>Created: {new Date(ad.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => downloadImage(ad.banner)}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <FiDownload className="text-lg" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => openDeleteModal(ad)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-rose-400 py-3 rounded-xl font-semibold transition-all duration-300 border border-slate-600 hover:border-rose-500/50 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <FiTrash2 className="text-lg" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 sm:py-24">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-slate-700 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
                <FiImage className="text-amber-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No Advertisements Found</h3>
              <p className="text-slate-400 mb-6">
                {PremiumAdd?.length === 0 
                  ? "Get started by creating your first premium advertisement"
                  : "Try adjusting your search terms or filters"
                }
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCollege('all');
                  setSortBy('newest');
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {PremiumAdd?.length === 0 ? 'Create First Ad' : 'Clear Filters'}
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={deleteAd}
          ad={deleteModal.ad}
        />
      </div>
    </div>
  );
}