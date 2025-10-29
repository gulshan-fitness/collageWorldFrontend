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

  const chartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Rating Counts",
        data: Object.values(starCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // 1 Star color
          "rgba(255, 159, 64, 0.6)", // 2 Stars color
          "rgba(255, 205, 86, 0.6)", // 3 Stars color
          "rgba(75, 192, 192, 0.6)", // 4 Stars color
          "rgba(54, 162, 235, 0.6)"  // 5 Stars color
        ],
        borderColor: [
          "rgba(255, 182, 193, 1)", // 1 Star border color (light pink)
          "rgba(255, 182, 193, 1)", // 2 Stars border color (light pink)
          "rgba(255, 182, 193, 1)", // 3 Stars border color (light pink)
          "rgba(255, 182, 193, 1)", // 4 Stars border color (light pink)
          "rgba(255, 182, 193, 1)"  // 5 Stars border color (light pink)
        ],
        
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
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
          color: 'white', // Change x-axis number color to white
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white', // Change y-axis number color to white
        },
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
    <div className="w-full flex justify-center py-[5em]">
      <div className="w-[90%] rounded-lg shadow-lg p-4">
        <div className="flex flex-col md:flex-row justify-between w-full">
          {/* Review Submission Section */}
          <div className="md:w-[30%] w-full mb-10 px-3 ">
            <h2 className="md:text-2xl text-xl font-bold mb-5">Leave a Review</h2>
            <div className="mb-4">
              <ReactStarsRating
                onChange={onChange}
                value={rating_value}
                className="flex"
              />
            </div>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-black"
              rows="4"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {inputFillMessage && (
              <div className="text-red-600 text-lg font-bold mt-2">
                {inputFillMessage}
              </div>
            )}
            <button
              className="bg-blue-500 mt-4 w-full md:w-auto text-white px-4 py-2 rounded-lg 
              hover:bg-blue-600 focus:outline-none"
              onClick={Submit_handler}
            >
              Submit
            </button>
          </div>

          {/* Review Distribution Section */}

          <div className="flex flex-col md:w-[50%]  w-full">
            <div className="flex justify-between">

              <h3 className="md:text-xl  text-md font-semibold">Review Distribution</h3>

              <div>
                <div className="md:text-lg  text-md font-semibold w-full">

                  <p>Average Rating: {rounded_rating(avgrating) ?? 0} out of 5</p>

                </div>

                <StarRatings
                  rating={rounded_rating(avgrating) ?? 0}
                  starRatedColor="gold"
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
          <h3 className="text-xl font-semibold mb-5">
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
                className="mb-6 border-b border-gray-300 pb-4"
              >
                {matchedRating && (
                  <div className="mb-2 text-lg font-semibold text-blue-600">
                    <StarRatings
                      
                      rating={matchedRating?.rating ?? 0}
                      starRatedColor="gold"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                      readonly
                    />
                  </div>
                )}
                <p className="mb-4 text-base">{data.review}</p>
                <p className="mb-4 text-red-600 font-bold">
                  {data?.reviewUserDetails?.name}
                </p>

                <div className="flex justify-between  md:flex-row ">
                  <div className="text-lg font-bold mb-3">
                    Comments ({data?.comments?.length ?? 0})
                  </div>
                  <button
                    className="text-blue-500 hover:underline flex items-center"
                    onClick={() => setcommnetBox_index(index)}
                  >
                    <FontAwesomeIcon icon={faComment} className="text-white mr-2" />
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
                        className="p-3 border border-gray-300 rounded-lg mb-2 flex items-center"
                      >
                        <FontAwesomeIcon icon={faComment} className="text-gray-500 mr-2" />
                        <div>
                          <p className="text-sm font-semibold mb-1">
                            {comment?.userDetails?.name}
                          </p>
                          <p className="text-sm">{comment?.comment}</p>
                        </div>
                      </div>
                    ))}

                    {data?.comments?.length > visibleComments && (
                      <button
                        className="text-black px-1 py-1 rounded  bg-white hover:underline mt-4"
                        onClick={handleLoadMore}
                      >
                        Load More Comments
                      </button>
                    )}

                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="border border-gray-300 p-2 rounded-lg w-full  text-black focus:outline-none focus:border-blue-500"
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 focus:outline-none"
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
