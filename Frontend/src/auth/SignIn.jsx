import React, { useEffect, useState, useRef } from "react";
import { IMAGES } from "../utils/constants";
import { Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import "../assets/style/Auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const images = [IMAGES.auth1, IMAGES.auth2, IMAGES.auth3];

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  const Validations = () => {
    if (email.trim() === "") {
      toast.error("Email is required.");
      return false;
    }
    if (password.trim() === "") {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!Validations()) return;
    toast.success("Login sucessfully.");
    navigate("/dashboard");
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
          <h1>Welcome back to Hustle</h1>
          <p>Please sign in to continue to your dashboard</p>

          <div className="form-card">
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
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setIsPassword(!isPassword)}
                className="icon"
              >
                {isPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button onClick={handleLogin} className="login-btn">
              Log in
              <span className="icon">
                <ArrowRight size={18} />
              </span>
            </button>

            <p className="signup-link">
              Don't have an account?{" "}
              <span onClick={() => navigate("/sign-up")}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
      <Carousel images={images} />
    </div>
  );
};

export default SignIn;

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
