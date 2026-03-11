import React, { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";
import { handleVerifyHelper } from "../services/payment.services";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { setValue } = useOutletContext();
  const { refresh } = useAuth();

  useEffect(() => {
    setValue("Payment");
    handleVerify();
  }, []);

  const handleVerify = async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    try {
      const res = await handleVerifyHelper(sessionId);
      toast.success(res?.data?.message || "Credits added successfully");
      if (res?.status === 200) {
        refresh();
      }
    } catch (err) {
      console.error("Failed to increase credits:", err.response?.data);
      toast.error("Credits failed to add.");
    }
  };

  return (
    <section
      style={{ width: "100%", background: "transparent" }}
      className="watch-demo-section"
    >
      <div className="watch-demo-container">
        <div className="watch-demo-card">
          <div
            style={{
              background: "var(--gradian-background)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(20px,2vw,40px)",
            }}
            className="watch-demo-video-wrapper"
          >
            <CheckCircle2 size={70} color="#e8f9f7" fill="var(--primary)" />
          </div>
          <div className="watch-demo-content">
            <h2 className="watch-demo-title">Payment Successful</h2>
            <p className="watch-demo-description">
              Your credits will be added shortly.
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "8px",
              }}
            >
              <button
                className="btn-primary"
                onClick={() => navigate("/pricing")}
              >
                Go to Plans
                <span className="icon">
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
