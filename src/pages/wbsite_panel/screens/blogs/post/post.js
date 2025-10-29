  import { useState } from "react";

import parse from 'html-react-parser';

const Post = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    console.log(post,"bhawani post")
    const handleReadMoreClick = () => {
      setIsExpanded(!isExpanded);
    };
  
    // Ensure post.content is a string or fallback to empty string
    // const content = typeof post.content === 'string' ? post.content : '';

    const getTextContent = (htmlString) => {
      // Create a temporary DOM element to hold the parsed HTML
      const tempElement = document.createElement('div');
      tempElement.innerHTML = htmlString;
    
      // Return the text content of the element
      return tempElement.textContent || tempElement.innerText || '';
    };

    const content =post?.post && isExpanded 
  ? parse(post?.post)
  : `${getTextContent(post?.post).substring(0, 150)}...`;


  
    
    return (
      <div className="bg-white p-6 shadow-md rounded-lg mb-6 flex flex-col">

        <img
          src={`${process.env.REACT_APP_API_BASE_URL}image/website_blog_image/${post?.logo}`} // Fallback image
          alt={post?.heading}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{post?.heading}</h2>
        <p className="text-gray-700 mb-4 preview">
          {content}
          
        </p>
        <button
          onClick={handleReadMoreClick}
          className="text-blue-500 hover:underline"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    );
  };


  export default Post
  