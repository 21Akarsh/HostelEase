import { FaClipboardList, FaCheckCircle, FaShieldAlt, FaPhone } from "react-icons/fa";
import ImageCarousel from "./ImageCarousel";
import { RoutesPathName } from "../constants";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Button = ({ children, className, ...props }) => (
  <button className={`px-5 py-2 rounded-full font-semibold transition ${className}`} {...props}>
    {children}
  </button>
);

export default function HostelComplaintLanding() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);

  const handleLogin = () => {
    navigate(RoutesPathName.LOGIN_PAGE);
  };

  const handleRegister = () => {
    navigate(RoutesPathName.SIGNUP_PAGE);
  };

  const handleGetStarted = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileComplaint=()=>{
    navigate(RoutesPathName.DASHBOARD_PAGE);
  }

  return (
    <div className="min-h-screen bg-indigo-50 font-sans">
      {/* Navbar */}
      <div className="bg-white shadow-lg py-4 px-8 flex justify-between items-center fixed w-full z-50">
        <h2 className="text-3xl font-extrabold text-indigo-600">HostelEase</h2>
        <div className="space-x-4">
          <Button className="bg-white text-indigo-600 border border-indigo-600 px-5 py-2 rounded-full shadow-md hover:bg-indigo-100" onClick={handleLogin}>
            Login
          </Button>
          {/* <Button className="bg-white text-indigo-600 border border-indigo-600 px-5 py-2 rounded-full shadow-md hover:bg-indigo-100" onClick={handleRegister}>
            Register
          </Button> */}
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[650px] flex items-center justify-center text-center text-white"
      >
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-70 flex flex-col items-center justify-center px-6">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Hostel Complaint Management System</h1>
          <p className="text-xl max-w-2xl drop-shadow-md">Easily register and track complaints for a seamless hostel experience.</p>
          <ImageCarousel />
          <Button className="mt-10 relative bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg" onClick={handleGetStarted}>
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-900">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
              <feature.icon className="text-5xl text-indigo-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2 text-indigo-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-600 py-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Register Your Complaint Now</h2>
        <p className="text-xl mb-6">A hassle-free way to report issues and get quick resolutions.</p>
        <Button className="bg-white text-indigo-600 border border-indigo-600 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-100" onClick={handleFileComplaint}>
          File a Complaint
        </Button>
      </div>

      {/* Contact Section */}
      <div className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-indigo-900">Contact Support</h2>
        <p className="text-lg mb-6">Need help? Get in touch with us.</p>
        <p className="text-2xl font-semibold flex items-center justify-center gap-3">
          <FaPhone className="text-indigo-600" /> 0821-2548296
        </p>
      </div>
    </div>
  );
}

const features = [
  { icon: FaClipboardList, title: "Easy Complaint Registration", description: "Quickly submit complaints online." },
  { icon: FaCheckCircle, title: "Real-time Status Tracking", description: "Check updates on your complaint anytime." },
  { icon: FaShieldAlt, title: "Secure & Transparent", description: "Ensuring privacy and fair resolution." },
];
