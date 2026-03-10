import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useOutletContext } from "react-router";

const PaymentSuccess = () => {
  const { setValue } = useOutletContext();

    useEffect(() => {
      setValue("Payment");
    }, []);

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
