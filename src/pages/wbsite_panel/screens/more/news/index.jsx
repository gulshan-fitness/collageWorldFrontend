import React, { useState } from 'react';
import { 
  NewspaperIcon, 
  CalendarIcon, 
  UserIcon,
  TagIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import Website_news_Slider from '../../home/Website_news_Slider';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All News', count: 24 },
    { id: 'admissions', name: 'Admissions', count: 8 },
    { id: 'exams', name: 'Exams', count: 6 },
    { id: 'scholarships', name: 'Scholarships', count: 5 },
    { id: 'education-policy', name: 'Education Policy', count: 3 },
    { id: 'technology', name: 'EdTech', count: 2 }
  ];

  const featuredNews = {
    title: "New Education Policy 2024: Major Changes in Higher Education Admission Process",
    excerpt: "The Ministry of Education announces significant reforms in the college admission process, introducing AI-based counseling and streamlined application procedures.",
    image: "/api/placeholder/800/400",
    category: "Education Policy",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    readTime: "5 min read"
  };

  const newsArticles = [
    {
      id: 1,
      title: "IIT JEE 2024: Registration Opens with New Exam Pattern",
      excerpt: "Indian Institutes of Technology announce changes in JEE Main and Advanced examination structure for 2024.",
      image: "/api/placeholder/400/250",
      category: "Exams",
      author: "Rajesh Kumar",
      date: "2024-01-14",
      readTime: "3 min read",
      trending: true
    },
    {
      id: 2,
      title: "₹50 Crore Scholarship Program Launched for Underprivileged Students",
      excerpt: "Government announces massive scholarship initiative to support students from economically weaker sections.",
      image: "/api/placeholder/400/250",
      category: "Scholarships",
      author: "Anita Singh",
      date: "2024-01-13",
      readTime: "4 min read",
      trending: false
    },
    {
      id: 3,
      title: "Top Universities Introduce AI-Powered Career Counseling",
      excerpt: "Leading educational institutions adopt artificial intelligence to provide personalized career guidance to students.",
      image: "/api/placeholder/400/250",
      category: "Technology",
      author: "Tech Desk",
      date: "2024-01-12",
      readTime: "6 min read",
      trending: true
    },
    {
      id: 4,
      title: "NEET 2024: Important Dates and Eligibility Criteria Released",
      excerpt: "National Testing Agency publishes official notification for medical entrance examination.",
      image: "/api/placeholder/400/250",
      category: "Exams",
      author: "Medical Team",
      date: "2024-01-11",
      readTime: "4 min read",
      trending: false
    },
    {
      id: 5,
      title: "Engineering Colleges Report 95% Placement Rate for 2023 Batch",
      excerpt: "Latest placement statistics show significant improvement in job opportunities for engineering graduates.",
      image: "/api/placeholder/400/250",
      category: "Admissions",
      author: "Career Desk",
      date: "2024-01-10",
      readTime: "5 min read",
      trending: false
    },
    {
      id: 6,
      title: "New Online Learning Platform Launched for Rural Students",
      excerpt: "Initiative aims to bridge the digital divide and provide quality education access to remote areas.",
      image: "/api/placeholder/400/250",
      category: "Technology",
      author: "Education Reporter",
      date: "2024-01-09",
      readTime: "3 min read",
      trending: false
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <NewspaperIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Education News
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Stay updated with the latest developments in education, admissions, exams, and career opportunities.
            </p>
          </div>
        </div>
      </div>

     <Website_news_Slider/>
    </div>
  );
};

export default News;
