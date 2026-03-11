import React, { useEffect, useState, useRef } from "react";
import { IMAGES } from "../utils/constants";
import { Mail, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import "../assets/style/Auth.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "sonner";
import { DashboardRoute } from "../utils/helper";
import ForgetPasswordParent from "./ForgetPasswordParent";

const images = [IMAGES.auth1, IMAGES.auth2, IMAGES.auth3];

const SignIn = () => {
  const navigate = useNavigate();
  const { refresh, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForget, setIsForget] = useState(false);

  const validations = () => {
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

  const handleSignIn = async () => {
    const isValid = validations();
    if (!isValid) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEmail("");
      setPassword("");
      await refresh();
      DashboardRoute(currentUser?.role, navigate);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <div className="signin-back-btn-container">
          <button onClick={() => navigate("/")} className="signin-back-btn">
            <span className="icon">
              <ArrowLeft size={18} />
            </span>
            Go back
          </button>
        </div>
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

            <div className="auth-options">
              <span className="auth-remember">
                <input type="checkbox" />
                Remember me
              </span>
              <span onClick={() => setIsForget(true)} className="auth-link">
                Forgot password?
              </span>
            </div>
            <button onClick={handleSignIn} className="login-btn">
              {loading ? (
                <Loader color="#fff" size="18" stroke="2" height="17px" />
              ) : (
                <>
                  Sign in{" "}
                  <span className="icon">
                    <ArrowRight size={16} />
                  </span>
                </>
              )}
            </button>

            <p className="signup-link">
              Don't have an account?{" "}
              <span onClick={() => navigate("/sign-up")}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
      <Carousel images={images} />
      {isForget && <ForgetPasswordParent onClose={() => setIsForget(false)} />}
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
