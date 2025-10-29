import React, { useContext, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";
import { Context } from "../../../../../Context_holder";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PlacementBarChart = ({ id }) => {
  const { placement_score_fetch, placementscore } = useContext(Context);

  useEffect(() => {
    if (!id) return;
    placement_score_fetch(null, id);
  }, [id]);

  // Memoized chart data and options for better performance
  const chartData = useMemo(() => ({
    labels: placementscore?.map(data => data.year) || [],
    datasets: [
      {
        label: "Placement Score",
        data: placementscore?.map(data => data.placementScore) || [],
        backgroundColor: [
          "#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#607D8B"
        ],
        borderColor: "#1F2937",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "#388E3C",
      },
    ],
  }), [placementscore]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false, // Important for mobile responsiveness
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Year-wise Placement Statistics",
        color: "#1F2937",
        font: {
          size: window.innerWidth < 768 ? 16 : 20,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 11,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#374151",
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        title: {
          display: true,
          text: "Placement Score (%)",
          color: "#374151",
          font: {
            size: window.innerWidth < 768 ? 11 : 13,
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          color: "#374151",
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          maxRotation: window.innerWidth < 768 ? 45 : 0,
        },
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        title: {
          display: true,
          text: "Academic Year",
          color: "#374151",
          font: {
            size: window.innerWidth < 768 ? 11 : 13,
            weight: "bold",
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  }), []);

  // Loading state
  if (!placementscore || placementscore.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-64 bg-gray-100 rounded"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading placement data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 md:py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chart Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 md:p-6 lg:p-8">
          
          {/* Chart Title for Mobile */}
          <div className="md:hidden mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-800">
              Placement Statistics
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Year-wise placement scores
            </p>
          </div>

          {/* Chart Wrapper with Responsive Height */}
          <div className="relative" style={{ height: window.innerWidth < 768 ? '300px' : '400px' }}>
            <Bar 
              data={chartData} 
              options={chartOptions} 
              redraw={true}
            />
          </div>

          {/* Additional Information */}
          <div className="mt-4 md:mt-6 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span>Placement Score (%)</span>
              </div>
              <div className="text-gray-400">•</div>
              <span>Data based on academic years</span>
            </div>
          </div>

          {/* Stats Summary for Mobile */}
          {window.innerWidth < 768 && placementscore.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <p className="text-gray-600">Current Year</p>
                  <p className="font-bold text-green-600">
                    {placementscore[placementscore.length - 1]?.placementScore}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Average</p>
                  <p className="font-bold text-blue-600">
                    {Math.round(
                      placementscore.reduce((sum, item) => sum + item.placementScore, 0) / 
                      placementscore.length
                    )}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend for Mobile */}
        <div className="mt-4 text-center md:hidden">
          <p className="text-xs text-gray-500">
            Tap on bars for detailed information
          </p>
        </div>

      </div>
    </div>
  );
};

export default PlacementBarChart;