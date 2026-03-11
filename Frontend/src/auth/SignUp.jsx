import React, { useEffect, useState, useRef } from "react";
import { IMAGES } from "../utils/constants";
import { Mail, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import "../assets/style/Auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../components/Loader";

const images = [IMAGES.auth1, IMAGES.auth2, IMAGES.auth3];

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validations = () => {
    if (name.trim() === "") {
      toast.error("Name is required.");
      return false;
    }
    if (email.trim() === "") {
      toast.error("Email is required.");
      return false;
    }
    if (password.trim() === "") {
      toast.error("Password is required.");
      return false;
    }
    if (password.length < 8) {
      toast.error("password must be at least 8 characters required!");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validations()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: name,
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Error signing up");
        return;
      }

      toast.success("Account created! Please login.");
      navigate("/sign-in");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <div className="signin-left-inner">
          <div className="sign-in-logo-container">
            <div className="sign-in-logo">
              <img src={IMAGES.SiteLogo} alt="" />
            </div>
          </div>
          <h1>Welcome to Hustle</h1>
          <p>Please sign up to continue to your dashboard</p>

          <div className="form-card">
            <label>Full Name</label>
            <div className="icon-input-wrapper">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter name"
              />
              <span className="icon">
                <User size={20} />
              </span>
            </div>

            <label>Email</label>
            <div className="icon-input-wrapper">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
              <span className="icon">
                <Mail size={20} />
              </span>
            </div>

            <label>Password</label>
            <div className="icon-input-wrapper">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <span onClick={() => setIsPassword(!isPassword)} className="icon">
                {isPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="login-btn"
            >
              {loading ? (
                <Loader color="#fff" size="18" stroke="2" height="17px" />
              ) : (
                <>
                  Sign Up{" "}
                  <span className="icon">
                    <ArrowRight size={16} />
                  </span>
                </>
              )}
            </button>

            <p className="signup-link">
              Already have an account?{" "}
              <span onClick={() => navigate("/sign-in")}>Sign In</span>
            </p>
          </div>
        </div>
      </div>
      <Carousel images={images} />
    </div>
  );
};

export default SignUp;

export const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {images.map((img, i) => (
          <div key={i} className="card">
            <img src={img} alt={`slide-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
