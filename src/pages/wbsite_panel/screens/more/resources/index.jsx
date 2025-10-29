import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  DocumentTextIcon, 
  VideoCameraIcon,
  AcademicCapIcon,
  CalculatorIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  PlayIcon,
  EyeIcon,
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import ExamList from '../../../components/Exam/ExamList';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 45 },
    { id: 'study-guides', name: 'Study Guides', count: 15 },
    { id: 'practice-tests', name: 'Practice Tests', count: 12 },
    { id: 'video-lectures', name: 'Video Lectures', count: 10 },
    { id: 'tools', name: 'Study Tools', count: 8 }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'pdf', name: 'PDF Documents' },
    { id: 'video', name: 'Videos' },
    { id: 'interactive', name: 'Interactive Tools' },
    { id: 'quiz', name: 'Quizzes & Tests' }
  ];

  const featuredResources = [
    {
      id: 1,
      title: "Complete JEE Main Study Guide 2024",
      description: "Comprehensive study material covering all subjects with solved examples, practice questions, and exam strategies.",
      type: "Study Guide",
      format: "PDF",
      size: "25.4 MB",
      downloads: 15420,
      rating: 4.8,
      featured: true,
      free: true,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      level: "Advanced",
      duration: "Self-paced"
    },
    {
      id: 2,
      title: "NEET Biology Video Lecture Series",
      description: "Expert faculty lectures covering complete NEET Biology syllabus with animations and real-life examples.",
      type: "Video Course",
      format: "Video",
      size: "2.1 GB",
      downloads: 8930,
      rating: 4.9,
      featured: true,
      free: false,
      price: "₹999",
      subjects: ["Biology"],
      level: "Intermediate",
      duration: "45 hours"
    }
  ];



  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'study guide':
      case 'study material':
      case 'reference':
        return <BookOpenIcon className="h-5 w-5" />;
      case 'video course':
      case 'video lecture':
        return <VideoCameraIcon className="h-5 w-5" />;
      case 'practice test':
      case 'mock test':
        return <DocumentTextIcon className="h-5 w-5" />;
      case 'study tool':
        return <CalculatorIcon className="h-5 w-5" />;
      default:
        return <AcademicCapIcon className="h-5 w-5" />;
    }
  };

  const getFormatColor = (format) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'interactive':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <BookOpenIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Study Resources
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Access comprehensive study materials, practice tests, video lectures, and interactive tools to excel in your exams.
            </p>
          </div>
        </div>
      </div>
<ExamList/>
     
    </div>
  );
};

export default Resources;