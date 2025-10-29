import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  QuestionMarkCircleIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "How does our platform benefit higher education institutions?",
      answer: "Our platform simplifies the assessment and accreditation process by providing a centralized system for institutions to submit data, track progress, and receive feedback. This helps institutions improve their quality standards and maintain accreditation status more efficiently."
    },
    {
      question: "Is our platform available for both undergraduate (UG) and postgraduate (PG) institutions?",
      answer: "Yes, our platform caters to both undergraduate and postgraduate institutions, providing tailored assessment and accreditation frameworks for each level of education with specialized tools and resources."
    },
    {
      question: "How can institutions access our platform?",
      answer: "Institutions can access our platform through a secure web portal provided by the relevant accrediting agency or regulatory body in their region. We offer comprehensive onboarding and training support."
    },
    {
      question: "How does our platform contribute to the overall quality of higher education?",
      answer: "Our platform promotes continuous improvement in higher education institutions by encouraging self-assessment, benchmarking against quality standards, and fostering a culture of accountability and transparency in the education sector."
    },
    {
      question: "Can our platform help institutions identify areas for improvement?",
      answer: "Yes, our platform provides comprehensive analytics and reporting mechanisms for institutions to analyze their performance, identify strengths and weaknesses, and implement targeted improvement strategies based on assessment data and expert feedback."
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <QuestionMarkCircleIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto md:text-lg text-sm">
            Find answers to common questions about our education platform and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Question Header */}
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="md:text-lg text-sm font-semibold text-black leading-relaxed pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {activeIndex === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Answer Content */}
              {activeIndex === index && (
                <div className="border-t border-gray-100">
                  <div className="p-6 pt-4 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
                    <div className="ml-12">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="md:text-2xl text-xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-sm md:text-lg">
              Can't find the answer you're looking for? Our support team is here to help you with any questions.
            </p>
            <Link 
              to="/contact"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg inline-block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
