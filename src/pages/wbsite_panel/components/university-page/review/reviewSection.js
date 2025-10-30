import React, { useState, useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ReactStarsRating from "react-awesome-stars-rating";
import { Context } from "../../../../../Context_holder";
import axios from "axios";
import StarRatings from "react-star-ratings";
import UserLoginPopup from "../../../screens/login/UserLoginPopup";
import UserSignUp_Popup from "../../../screens/signup/UserSignUp_Popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReviewSection = ({ id, avgrating }) => {
  console.log(id, avgrating);

  const {
    review_fetch,
    perticulerCollegereviews,
    perticularCollegerating,
    rating_fetch,
    user,
    rounded_rating,
    notify,
    setuserLogin_popup,
  } = useContext(Context);

  const [rating_value, setrating_value] = useState(null);
  const [comment_popup, setcomment_popup] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [inputFillMessage, setinputFillMessage] = useState("");
  const [commnetBox_index, setcommnetBox_index] = useState(null);
  const [visibleComments, setVisibleComments] = useState(3);

  useEffect(() => {
    review_fetch(id);
    rating_fetch(id);
  }, [id]);

  const handleCommentSubmit = (reviewId) => {
    const review_id = reviewId;
    const comment = commentValue;

    const data = {
      review_id: review_id,
      user: user?._id,
      comment: comment,
    };

    axios
      .post(
        process.env.REACT_APP_API_BASE_URL +
          process.env.REACT_APP_COMMENT_URL +
          "add",
        data
      )
      .then((success) => {
        if (success.data.status === 1) {
          setCommentValue("");
          review_fetch(id);
          setcommnetBox_index(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const starCount = {
    "1 Star": 0,
    "2 Stars": 0,
    "3 Stars": 0,
    "4 Stars": 0,
    "5 Stars": 0,
  };

  perticularCollegerating.forEach((item) => {
    if (item.rating >= 4.5) {
      starCount["5 Stars"]++;
    } else if (item.rating >= 3.5) {
      starCount["4 Stars"]++;
    } else if (item.rating >= 2.5) {
      starCount["3 Stars"]++;
    } else if (item.rating >= 1.5) {
      starCount["2 Stars"]++;
    } else {
      starCount["1 Star"]++;
    }
  });

  // Premium color palette
  const premiumColors = {
    primary: {
      dark: "#1a1f36",     // Deep navy
      medium: "#2d3748",   // Charcoal
      light: "#4a5568",    // Slate gray
    },
    accent: {
      gold: "#d4af37",     // Premium gold
      roseGold: "#b76e79", // Rose gold
      bronze: "#cd7f32",   // Bronze
    },
    chart: {
      oneStar: "#ef4444",    // Premium red
      twoStars: "#f97316",   // Premium orange
      threeStars: "#eab308", // Premium yellow
      fourStars: "#22c55e",  // Premium green
      fiveStars: "#3b82f6",  // Premium blue
    },
    background: {
      light: "#f8fafc",     // Light slate
      dark: "#1e293b",      // Dark slate
    },
    text: {
      primary: "#f1f5f9",   // Light text
      secondary: "#cbd5e1", // Muted text
    }
  };

  const chartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Rating Distribution",
        data: Object.values(starCount),
        backgroundColor: [
          premiumColors.chart.oneStar,
          premiumColors.chart.twoStars,
          premiumColors.chart.threeStars,
          premiumColors.chart.fourStars,
          premiumColors.chart.fiveStars,
        ],
        borderColor: [
          premiumColors.accent.gold,
          premiumColors.accent.gold,
          premiumColors.accent.gold,
          premiumColors.accent.gold,
          premiumColors.accent.gold,
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: premiumColors.text.primary,
          font: {
            size: 14,
            weight: '600'
          }
        }
      },
      tooltip: {
        backgroundColor: premiumColors.primary.dark,
        titleColor: premiumColors.text.primary,
        bodyColor: premiumColors.text.secondary,
        borderColor: premiumColors.accent.gold,
        borderWidth: 1,
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: premiumColors.text.primary,
          font: {
            size: 12,
            weight: '500'
          }
        },
        grid: {
          color: premiumColors.primary.light,
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: premiumColors.text.primary,
          font: {
            size: 12,
            weight: '500'
          }
        },
        grid: {
          color: premiumColors.primary.light,
        }
      },
    },
  };

  const onChange = (value) => {
    setrating_value(value);
  };

  const Submit_handler = () => {
    if (reviewText === "" && rating_value === null) {
      setinputFillMessage("Please give the rating or review");
    } else {
      if (user) {
        const college_id = id;
        const rating = rating_value;
        const review = reviewText;

        const rating_data = {
          college_id: college_id,
          user: user?._id,
          rating: rating,
        };

        const review_data = {
          college_id: college_id,
          user: user?._id,
          review: review,
        };

        if (rating_value !== null) {
          axios
            .post(
              process.env.REACT_APP_API_BASE_URL +
                process.env.REACT_APP_RATING_URL +
                "add",
              rating_data
            )
            .then((success) => {
              notify(success.data.msg, success.data.status);
              if (success.data.status === 1) {
                setrating_value(null);
                rating_fetch(id);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }

        if (reviewText !== "") {
          axios
            .post(
              process.env.REACT_APP_API_BASE_URL +
                process.env.REACT_APP_REVIEW_URL +
                "add",
              review_data
            )
            .then((success) => {
              notify(success.data.msg, success.data.status);
              if (success.data.status === 1) {
                setReviewText("");
                review_fetch(id);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } else {
        setuserLogin_popup(true);
      }
    }
  };

  const handleLoadMore = () => {
    setVisibleComments((prev) => prev + 5);
  };

  return (
    <div className="w-full flex justify-center py-[5em]" style={{ backgroundColor: premiumColors.background.dark }}>
      <div className="w-[90%] rounded-lg shadow-2xl p-6" style={{ backgroundColor: premiumColors.primary.medium }}>
        <div className="flex flex-col md:flex-row justify-between w-full">
          {/* Review Submission Section */}
          <div className="md:w-[30%] w-full mb-10 px-3">
            <h2 className="md:text-2xl text-xl font-bold mb-5" style={{ color: premiumColors.accent.gold }}>
              Leave a Review
            </h2>
            <div className="mb-4">
              <ReactStarsRating
                onChange={onChange}
                value={rating_value}
                className="flex"
                starColor={premiumColors.accent.gold}
              />
            </div>
            <textarea
              className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-400 text-white"
              style={{ backgroundColor: premiumColors.primary.dark }}
              rows="4"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {inputFillMessage && (
              <div className="text-red-400 text-lg font-bold mt-2">
                {inputFillMessage}
              </div>
            )}
            <button
              className="mt-4 w-full md:w-auto text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 focus:outline-none transition-all duration-300"
              style={{ backgroundColor: premiumColors.accent.gold }}
              onClick={Submit_handler}
            >
              Submit Review
            </button>
          </div>

          {/* Review Distribution Section */}
          <div className="flex flex-col md:w-[50%] w-full">
            <div className="flex justify-between items-center">
              <h3 className="md:text-xl text-md font-semibold" style={{ color: premiumColors.text.primary }}>
                Review Distribution
              </h3>
              <div className="text-right">
                <div className="md:text-lg text-md font-semibold" style={{ color: premiumColors.text.primary }}>
                  <p>Average Rating: {rounded_rating(avgrating) ?? 0} out of 5</p>
                </div>
                <StarRatings
                  rating={rounded_rating(avgrating) ?? 0}
                  starRatedColor={premiumColors.accent.gold}
                  starEmptyColor={premiumColors.primary.light}
                  numberOfStars={5}
                  starDimension="24px"
                  starSpacing="3px"
                  readonly
                />
              </div>
            </div>
            <div className="w-full mx-auto mt-6" style={{ height: '400px' }}>
              <Bar data={chartData} options={options} />
            </div>
          </div>
        </div>

        {/* Reviews List Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-5" style={{ color: premiumColors.accent.gold }}>
            Reviews ({perticulerCollegereviews?.length})
          </h3>
          {perticulerCollegereviews?.map((data, index) => {
            const matchedRating = perticularCollegerating.find(
              (rating_data) =>
                rating_data?.user === data?.reviewUserDetails?._id
            );

            return (
              <div
                key={data._id}
                className="mb-6 border-b pb-4"
                style={{ borderColor: premiumColors.primary.light }}
              >
                {matchedRating && (
                  <div className="mb-2 text-lg font-semibold">
                    <StarRatings
                      rating={matchedRating?.rating ?? 0}
                      starRatedColor={premiumColors.accent.gold}
                      starEmptyColor={premiumColors.primary.light}
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                      readonly
                    />
                  </div>
                )}
                <p className="mb-4 text-base" style={{ color: premiumColors.text.secondary }}>
                  {data.review}
                </p>
                <p className="mb-4 font-bold" style={{ color: premiumColors.accent.roseGold }}>
                  {data?.reviewUserDetails?.name}
                </p>

                <div className="flex justify-between md:flex-row flex-col">
                  <div className="text-lg font-bold mb-3" style={{ color: premiumColors.text.primary }}>
                    Comments ({data?.comments?.length ?? 0})
                  </div>
                  <button
                    className="flex items-center hover:opacity-80 transition-opacity duration-300 font-semibold"
                    style={{ color: premiumColors.accent.gold }}
                    onClick={() => setcommnetBox_index(index)}
                  >
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    {commnetBox_index === index
                      ? "Hide Comments"
                      : "View Comments"}
                  </button>
                </div>

                {commnetBox_index === index && (
                  <>
                    {data?.comments?.slice(0, visibleComments).map((comment, i) => (
                      <div
                        key={i}
                        className="p-3 border rounded-lg mb-2 flex items-center"
                        style={{ 
                          backgroundColor: premiumColors.primary.dark,
                          borderColor: premiumColors.primary.light
                        }}
                      >
                        <FontAwesomeIcon 
                          icon={faComment} 
                          className="mr-3"
                          style={{ color: premiumColors.accent.gold }}
                        />
                        <div>
                          <p className="text-sm font-semibold mb-1" style={{ color: premiumColors.text.primary }}>
                            {comment?.userDetails?.name}
                          </p>
                          <p className="text-sm" style={{ color: premiumColors.text.secondary }}>
                            {comment?.comment}
                          </p>
                        </div>
                      </div>
                    ))}

                    {data?.comments?.length > visibleComments && (
                      <button
                        className="px-4 py-2 rounded font-semibold hover:opacity-90 transition-all duration-300 mt-4"
                        style={{ 
                          backgroundColor: premiumColors.accent.gold,
                          color: premiumColors.primary.dark
                        }}
                        onClick={handleLoadMore}
                      >
                        Load More Comments
                      </button>
                    )}

                    <div className="pt-4">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="border p-3 rounded-lg w-full focus:outline-none focus:border-blue-400"
                        style={{ 
                          backgroundColor: premiumColors.primary.dark,
                          borderColor: premiumColors.primary.light,
                          color: premiumColors.text.primary
                        }}
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                      />
                      <button
                        className="text-white px-6 py-2 rounded-lg mt-3 font-semibold hover:opacity-90 focus:outline-none transition-all duration-300"
                        style={{ backgroundColor: premiumColors.accent.gold }}
                        onClick={() => handleCommentSubmit(data._id)}
                      >
                        Submit Comment
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {comment_popup && <UserLoginPopup />}
        {comment_popup && <UserSignUp_Popup />}
      </div>
    </div>
  );
};

export default ReviewSection;