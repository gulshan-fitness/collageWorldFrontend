import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cities = require("../../../../Json_files/Cities.json");
const states = require("../../../../Json_files/States.json");

export default function College_add() {
  const {
    selected_state,
    setselected_state,
    selected_city,
    setselected_city,
    statemenuIsOpen,
    setstateMenuIsOpen,
    citymenuIsOpen,
    setcityMenuIsOpen,
    search_cities,
    setsearch_cities,
    handlestateInputChange,
    handlecityInputChange, quill_value, setquill_value, fact_value, setfact_value,
    professor, setprofessor, token, notify, admin, verifyAdmin,
  } = useContext(Context);
  
  const navigator = useNavigate();

  useEffect(() => {
    const search_city = cities?.filter(data => data.state === selected_state?.value);
    setsearch_cities(search_city);
  }, 
  [selected_state]);

  useEffect(() => {
    if (!admin) return;
    if (!admin?.approved) navigator("/pendingSubadmin");
    else if (admin?.collage_id) navigator("/admin/college/view");
  }, [admin]);

  const adminCollage_id_change = (collage_id, token) => {
    if (!admin?._id || !collage_id || !token) return;

    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ADMIN_URL}collage_id_Change/${admin?._id}/${collage_id}`, {}, {
      headers: { Authorization: token }
    })
    .then((success) => {
      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        verifyAdmin(admin?._id, token);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const submit_handler = (e) => {
    e.preventDefault();
    
    if (admin?.collage_id) {
      notify("you have already Registered College", 0);
      navigator("admin/college/view");
      return;
    }

    // Form data collection logic remains the same
    const college_name = e.target.college_name.value;
    const estdYear = e.target.estdYear.value;
    const affiliatedTo = e.target.affiliatedTo.value.split("$").filter(a => a !== "");
    const type = e.target.type.value;
    const programmesOffered = e.target.programmesOffered.value.split("$").filter(a => a !== "");
    const director = e.target.director.value;
    const contactNumber = e.target.contactNumber.value;
    const officialWebsite = e.target.officialWebsite.value;
    const address = e.target.address.value;
    const about = quill_value;
    const facts = e.target.facts.value.split("$").filter(a => a !== "");
    const about_professor = professor;
    const logo = e.target.logo.files;
    const state = selected_state?.value;
    const city = e.target.city.value;
    const campus = e.target.campus.files;
    const pdf = e.target.pdf.files[0];
    const education_loan = e.target.education_loan.value;
    const loan_contact = e.target.loan_contact.value;
    const registered_instructors = e.target.registered_instructors.value;
    const office_photo = e.target.office_photo.files[0];

    const formData = new FormData();
    formData.append('college_name', college_name);
    formData.append('estdYear', estdYear);
    formData.append('affiliatedTo', JSON.stringify(affiliatedTo));
    formData.append('type', type);
    formData.append('programmesOffered', JSON.stringify(programmesOffered));
    formData.append('director', director);
    formData.append('contactNumber', contactNumber);
    formData.append('address', address);
    formData.append('about', about);
    formData.append("facts", JSON.stringify(facts));
    formData.append('officialWebsite', officialWebsite);
    formData.append('city', city);
    formData.append('state', state);
    formData.append("pdf", pdf);
    formData.append("education_loan", education_loan);
    formData.append("loan_contact", loan_contact);
    formData.append("registered_instructors", registered_instructors);
    formData.append("professor", about_professor);
    formData.append("office_photo", office_photo);

    for (let data of campus) {
      formData.append('campus', data);
    }

    for (let data of logo) {
      formData.append('logo', data);
    }

    axios.post(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}submission`, formData, {
      headers: { Authorization: token }
    })
    .then((success) => {
      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        if (admin?.role == "subadmin") {
          adminCollage_id_change(success?.data?.college?._id, token);
        }
        e.target.reset();
        setselected_city(null);
        setselected_state(null);
        setquill_value(null);
        setfact_value(null);
        setprofessor(null);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    setselected_city(null);
    setselected_state(null);
   
    setfact_value(null);
    setquill_value(null);
    setprofessor(null);
  }, []);

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      borderWidth: '2px',
      borderRadius: '12px',
      padding: '8px 12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      fontSize: '14px'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">College Registration</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Register your institution with comprehensive details to showcase on our platform
          </p>
        </div>

        {/* Premium Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Institution Details</h2>
                <p className="text-blue-100 mt-2">Fill in all required information about your college</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                <span className="text-white font-semibold text-sm">STEP 1/2</span>
              </div>
            </div>
          </div>

          <form onSubmit={submit_handler} encType="multipart/form-data" className="p-6 sm:p-8">
            {/* Basic Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-3"></div>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="college_name">
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="college_name"
                    name="college_name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter college name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="estdYear">
                    Established Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="estdYear"
                    name="estdYear"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="e.g., 1995"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="director">
                    Director Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="director"
                    name="director"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Director's full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="address">
                    Complete Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Full college address"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="education_loan">
                    Education Loan Information
                  </label>
                  <textarea
                    id="education_loan"
                    name="education_loan"
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Details about education loan facilities"
                  />
                </div>
              </div>
            </div>

            {/* Rich Text Editors Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                Detailed Information
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    About Professors & Faculty
                  </label>
                  <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                    <ReactQuill 
                      value={professor}  
                      onChange={(e) => setprofessor(e)}
                      theme="snow"
                      className="h-48"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    About College <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                    <ReactQuill 
                      value={quill_value}  
                      onChange={(e) => setquill_value(e)}
                      theme="snow"
                      className="h-48"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Key Facts & Achievements
                    <span className="text-red-500 text-xs ml-2">($ separated)</span>
                  </label>
                  <textarea
                    id="facts"
                    name="facts"
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Fact 1$Fact 2$Fact 3"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-purple-600 rounded-full mr-3"></div>
                Academic Information
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="type">
                    Institution Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="" disabled selected>Select type</option>
                    <option value="private">Private</option>
                    <option value="government">Government</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="programmesOffered">
                    Programmes Offered
                    <span className="text-red-500 text-xs ml-2">($ separated)</span>
                  </label>
                  <input
                    id="programmesOffered"
                    name="programmesOffered"
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Programme 1$Programme 2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="affiliatedTo">
                    Approvals & Affiliations
                    <span className="text-red-500 text-xs ml-2">($ separated)</span>
                  </label>
                  <input
                    id="affiliatedTo"
                    name="affiliatedTo"
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Affiliation 1$Affiliation 2"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-orange-600 rounded-full mr-3"></div>
                Contact Information
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="contactNumber">
                    College Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                    maxLength="10"
                    minLength="10"
                    autoComplete="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="loan_contact">
                    Loan Contact Number
                  </label>
                  <input
                    id="loan_contact"
                    name="loan_contact"
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    minLength="10"
                    autoComplete="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="officialWebsite">
                    Official Website
                  </label>
                  <input
                    id="officialWebsite"
                    name="officialWebsite"
                    type="url"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="registered_instructors">
                    Registered Instructors
                  </label>
                  <input
                    id="registered_instructors"
                    name="registered_instructors"
                    type="number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Number of instructors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="state">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={selected_state}
                    styles={customStyles}
                    onChange={(e) => { setselected_state(e) }}
                    onInputChange={handlestateInputChange}
                    menuIsOpen={statemenuIsOpen}
                    name="states"
                    options={states.map(data => ({ value: data.name, label: data.name }))}
                    placeholder="Select state"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter city name"
                  />
                </div>
              </div>
            </div>

            {/* File Uploads Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-teal-600 rounded-full mr-3"></div>
                Media & Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="logo">
                    Main Logo/Image <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      multiple={true}
                      type="file"
                      id="logo"
                      name="logo"
                      required
                      className="hidden"
                    />
                    <label htmlFor="logo" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">Upload Logo</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="campus">
                    Campus Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      type="file"
                      id="campus"
                      name="campus"
                      multiple={true}
                      className="hidden"
                    />
                    <label htmlFor="campus" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">Campus Photos</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="pdf">
                    College Brochure
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      type="file"
                      id="pdf"
                      name="pdf"
                      className="hidden"
                    />
                    <label htmlFor="pdf" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">Upload PDF</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="office_photo">
                    Office Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      type="file"
                      id="office_photo"
                      name="office_photo"
                      className="hidden"
                    />
                    <label htmlFor="office_photo" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-sm text-gray-600">Office Photo</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Submit College Registration</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}