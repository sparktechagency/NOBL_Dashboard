// import "./NotFound.css"; // Create this CSS file for animations

import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen justify-center items-center flex  overflow-hidden">
      <div className="flex flex-col gap-3 ">
        <div className=" ">
          {/* You can replace this with your preferred animated image/illustration */}
          <img src="/not-found.png" className=" h-[40vh] object-fill" />
        </div>
        <h1 className=" text-primary text-4xl text-center font-bold">
          Oops! Page Not Found
        </h1>
        <p className="not-found-message font-semibold text-center text-xs">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          className="bg-primary w-[6vw] self-center text-sm rounded-3xl text-white px-4 py-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
