import React, { useState, useEffect, useContext } from "react";
import Post from "../post/post";
import PostTopSection from "../blogtopsection/blogTop";
import { Context } from "../../../../../Context_holder";
import { useSearchParams } from "react-router-dom";

const BlogSection = () => {
  const { website_blog_fetch, website_blog } = useContext(Context);




  const [Heading_Terms, setHeading_Terms] = useState("");
  const [posted_time, setposted_time] = useState("");
  const [search_heading, setsearch_heading] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();


  const recent_post_handler = (posted_time) => {
    setposted_time(posted_time);
    setHeading_Terms("")
  };

  // ✅ Fetch blogs when filters change
  useEffect(() => {
    const query = {};

    if (Heading_Terms !== "") {
      query.heading = Heading_Terms;
    }

    if (posted_time !== "") {
      query.posted = posted_time;
    }

    setSearchParams(query);
 website_blog_fetch(null, window.location.search.toString());
   
  }, [Heading_Terms, posted_time]);





  // // ✅ Update displayed posts when data changes
  // useEffect(() => {
  //   setPosts(website_blog || []);
  //   setDisplayedPosts((website_blog || []).slice(0, currentPage * 5));
  // }, [website_blog, currentPage]);

  // const handleLoadMore = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //     setLoading(false);
  //   }, 500);
  // };

  return (
    <div className="container mx-auto p-4">
      <nav className="md:bg-gray-800 bg-transparent text-white md:p-4 w-full rounded">
        <div className="flex justify-between items-center w-full">
          <button
            onClick={() => recent_post_handler("past24Hours")}
            className="md:text-lg text-md font-semibold hover:text-gray-400 ml-1 bg-gray-800 px-2 py-2"
          >
            Latest
          </button>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              
              onChange={(e) => setsearch_heading(e.target.value)}
              className="px-4 py-2 rounded-lg text-black"
            />

            {/* ✅ Fixed: wrap function in arrow to prevent immediate call */}
            <button
              className="bg-blue-500 w-full md:w-auto hover:bg-blue-900 text-white md:px-4 px-2 py-2 rounded"
             onClick={()=>{ search_heading&& setHeading_Terms(search_heading)}}
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      {/* <PostTopSection search_handler={search_handler} recent_post_handler={recent_post_handler}/> */}

      <div className="my-4">

        {website_blog.length > 0 ? (
          website_blog.map((post, index) => <Post key={index} post={post} />)
        ) : (
          <p className="text-gray-600 text-center mt-4">No posts found.</p>
        )}
      </div>

      {/* ✅ Load More Button */}
      {/* {displayedPosts?.length < posts.length && (

        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-4 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default BlogSection;
