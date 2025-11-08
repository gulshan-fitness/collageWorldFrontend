import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cities = require("../../../../Json_files/Cities.json");
const states = require("../../../../Json_files/States.json");

export default function College_edit() {
  const {
    selected_state, setselected_state, selected_city, setselected_city,
    statemenuIsOpen, citymenuIsOpen, search_cities, setsearch_cities,
    handlestateInputChange, handlecityInputChange, college_fetch,
    quill_value, setquill_value, fact_value, setfact_value,
    professor, setprofessor, token, notify,colleges
  } = useContext(Context);

  const [logo_value, setlogo_value] = useState(null);
  const [campus_images_value, setcampus_images_value] = useState(null);
  const [pdf_value, setpdf_value] = useState(null);
  const [office_photo_value, setoffice_photo_value] = useState(null);

  const { id } = useParams();
  const pdf_ref = useRef();
  const logo_ref = useRef();
  const campus_ref = useRef();
  const office_photo_ref = useRef();

  useEffect(() => {
    if (!id) return;
    college_fetch(id);
  }, [id]);

  useEffect(() => {
    setselected_city({ label:colleges?.[0]?.city, value:colleges?.[0]?.city });
    setselected_state({ label:colleges?.[0]?.state, value:colleges?.[0]?.state });
    setquill_value(colleges?.[0]?.about);
    setfact_value(colleges?.[0]?.facts?.join('$').replace(/,/g, '$') || '');
    setprofessor(colleges?.[0]?.professor || '');
  }, [colleges]);

  useEffect(() => {
    const search_city = cities.filter(data => data.state === selected_state?.value);
    setsearch_cities(search_city);
  }, [selected_state]);

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

  const edit_handler = (e) => {
    e.preventDefault();

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
    const state = selected_state?.value;
    const city = e.target.city.value;
    const education_loan = e.target.education_loan.value;
    const loan_contact = e.target.loan_contact.value;
    const about_professor = professor;
    const registered_instructors = e.target.registered_instructors.value;

    const data = {
      college_name: college_name,
      estdYear: estdYear,
      affiliatedTo: affiliatedTo,
      type: type,
      facts: facts,
      programmesOffered: programmesOffered,
      director: director,
      contactNumber: contactNumber,
      officialWebsite: officialWebsite,
      address: address,
      about: about,
      professor: about_professor,
      state: state,
      city: city,
      education_loan: education_loan,
      loan_contact: loan_contact,
      registered_instructors: registered_instructors,
    };

    axios.put(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}edit/${id}`, data, {
      headers: { Authorization: token }
    })
      .then((success) => {
        notify(success.data.msg, success.data.status);

        if (success.data.status === 1) {
          e.target.reset();
          college_fetch(id);
          setselected_city(null);
          setselected_state(null);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const logo_handler = () => {
    const logo = logo_value;
    const old_logo =colleges?.[0]?.university_banner;
    const id =colleges?.[0]?._id;

    const formData = new FormData();
    formData.append("old_logo", JSON.stringify(old_logo));

    for (let data of logo) {
      formData.append("logo", data);
    }

    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}logo_edit/${id}`, formData, {
      headers: { Authorization: token }
    })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          college_fetch(id);
          setlogo_value(null);
          logo_ref.current.value = "";
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const pdf_handler = () => {
    const pdf = pdf_value;
    const old_pdf =colleges?.[0]?.pdf;
    const id =colleges?.[0]?._id;

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("old_pdf", old_pdf);

    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}pdf_edit/${id}`, formData, {
      headers: { Authorization: token }
    })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          college_fetch(id);
          setpdf_value(null);
          pdf_ref.current.value = "";
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const campus_images_handler = () => {
    const campus_images = campus_images_value;
    const old_campus_images =colleges?.[0]?.campus_images;
    const id =colleges?.[0]?._id;

    const formData = new FormData();
    for (let data of campus_images) {
      formData.append("campus_images", data);
    }
    formData.append("old_campus_images", JSON.stringify(old_campus_images));

    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}campus_images_edit/${id}`, formData, {
      headers: { Authorization: token }
    })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          college_fetch(id);
          setcampus_images_value(null);
          campus_ref.current.value = "";
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const office_photo_handler = () => {
    const office_photo = office_photo_value;
    const old_office_photo =colleges?.[0]?.office_photo;
    const id =colleges?.[0]?._id;

    const formData = new FormData();
    formData.append("office_photo", office_photo);
    formData.append("old_office_photo", old_office_photo);

    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}office_photo_edit/${id}`, formData, {
      headers: { Authorization: token }
    })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          college_fetch(id);
          setoffice_photo_value(null);
          office_photo_ref.current.value = "";
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Edit College Information</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Update your institution details to keep information current and accurate
          </p>
        </div>

        {/* Premium Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Institution Details</h2>
                <p className="text-blue-100 mt-2">Update all required information about your college</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                <span className="text-white font-semibold text-sm">EDIT MODE</span>
              </div>
            </div>
          </div>

          <form onSubmit={edit_handler} encType="multipart/form-data" className="px-6 sm:px-8 py-5">

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
                    defaultValue={colleges?.[0]?.college_name}
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
                    defaultValue={colleges?.[0]?.estdYear}
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
                    defaultValue={colleges?.[0]?.director}
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
                    defaultValue={colleges?.[0]?.address}
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
                    defaultValue={colleges?.[0]?.education_loan}
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
                    defaultValue={colleges?.[0]?.facts?.join('$').replace(/,/g, '$') || ''}
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
                    defaultValue={colleges?.[0]?.type}
                    id="type"
                    name="type"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="" disabled>Select type</option>
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
                    defaultValue={colleges?.[0]?.programmesOffered?.join('$').replace(/,/g, '$') || ''}
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
                    defaultValue={colleges?.[0]?.affiliatedTo?.join('$').replace(/,/g, '$') || ''}
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
                    defaultValue={colleges?.[0]?.contactNumber}
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
                    defaultValue={colleges?.[0]?.loan_contact}
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
                    defaultValue={colleges?.[0]?.officialWebsite}
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
                    defaultValue={colleges?.[0]?.registered_instructors}
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
                    defaultValue={colleges?.[0]?.city}
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

                 {/* Submit Button */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Save Changes</span>
              </button>
            </div>

         

       
          </form>
             {/* Media Update Section */}
            <div className="px-4 py-8 ">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-teal-600 rounded-full mr-3"></div>
                Update Media & Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="logo">
                    Main Logo/Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      ref={logo_ref}
                      multiple={true}
                      type="file"
                      id="logo"
                      name="logo"
                      className="hidden"
                      onChange={(e) => setlogo_value(e.target.files)}
                    />
                    <label htmlFor="logo" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">Update Logo</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 mt-2 ${logo_value ? "block" : "hidden"}`}
                    onClick={logo_handler}
                  >
                    Update Main Images
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="campus">
                    Campus Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      ref={campus_ref}
                      type="file"
                      id="campus"
                      name="campus"
                      multiple={true}
                      className="hidden"
                      onChange={(e) => setcampus_images_value(e.target.files)}
                    />
                    <label htmlFor="campus" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">Update Campus Photos</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 mt-2 ${campus_images_value ? "block" : "hidden"}`}
                    onClick={campus_images_handler}
                  >
                    Update Campus Images
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="pdf">
                    College Brochure
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      ref={pdf_ref}
                      type="file"
                      id="pdf"
                      name="pdf"
                      className="hidden"
                      onChange={(e) => setpdf_value(e.target.files[0])}
                    />
                    <label htmlFor="pdf" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">Update PDF</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 mt-2 ${pdf_value ? "block" : "hidden"}`}
                    onClick={pdf_handler}
                  >
                    Update PDF
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="office_photo">
                    Office Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors duration-200 bg-white/50">
                    <input
                      ref={office_photo_ref}
                      type="file"
                      id="office_photo"
                      name="office_photo"
                      className="hidden"
                      onChange={(e) => setoffice_photo_value(e.target.files[0])}
                    />
                    <label htmlFor="office_photo" className="cursor-pointer block">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-sm text-gray-600">Update Office Photo</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 mt-2 ${office_photo_value ? "block" : "hidden"}`}
                    onClick={office_photo_handler}
                  >
                    Update Office Photo
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}