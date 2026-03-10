import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import "../assets/style/Pricing.css";
import { Minus, Plus } from "lucide-react";
import { handlePaymentHelper } from "../services/payment.services";
import { toast } from "sonner";

const Pricing = () => {
  const { setValue } = useOutletContext();

  useEffect(() => {
    setValue("Upgrade");
  }, []);

  const PrinciplePlans = [
    { planType: "Basic", price: 300, timeLimit: "month", creadits: 500 },
    { planType: "Standard", price: 850, timeLimit: "month", creadits: 1000 },
  ];

  return (
    <div className="dashboard-page">
      <h3 className="princing-header">Choose your subscription plan</h3>
      <div className="plans-grid">
        {PrinciplePlans?.map((principle, index) => (
          <PrincingCard
            key={index}
            planType={principle?.planType}
            price={principle?.price}
            timeLimit={principle?.timeLimit}
            creadits={principle?.creadits}
          />
        ))}
        <PrincingCard custom={true} planType="" />
      </div>
    </div>
  );
};

export default Pricing;

const PrincingCard = ({
  custom = false,
  planType = "",
  price = 0,
  timeLimit = "month",
  creadits = 0,
}) => {
  const [customCreadits, setCustomCreadits] = useState(1500);
  const [customPrice, setCustomPrice] = useState(0);
  const [payLoading, setPayLoading] = useState(false);

  const handlePayNow = async () => {
    try {
      setPayLoading(true);

      await handlePaymentHelper({
        credits: custom ? customCreadits : creadits,
        price: custom ? customPrice : price,
      });
    } catch (err) {
      console.error("Payment Failed:", err);
      toast.error("Payment failed.");
    } finally {
      setPayLoading(false);
    }
  };

  useEffect(() => {
    const price = getCustomCreaditsPrice(customCreadits);
    setCustomPrice(price);
  }, [customCreadits]);

  const getCustomCreaditsPrice = (creadits = 1) => {
    const inOneDollar = 0.6;
    const price = creadits * inOneDollar;
    return price.toFixed(2);
  };

  const handleChangeCreadit = (type = "inc") => {
    setCustomCreadits((prev) => {
      if (type === "inc") return prev + 1;
      if (type === "dec") return prev > 1 ? prev - 1 : 1;
      return prev;
    });
  };

  return (
    <div className="pricing-card">
      <div style={{ width: "100%" }}>
        <div className="pricing-header">{custom ? "Custom" : planType}</div>

        <div className="pricing-price">
          <span className="price">€ {custom ? customPrice : price}</span>
          <span className="duration">/{timeLimit}</span>
        </div>

        <div className="pricing-divider" />

        <div className="pricing-credits">
          <span className="credits-number">
            {custom ? customCreadits : creadits}
          </span>
          <span className="credits-text">credits/{timeLimit}</span>
        </div>
        {custom && (
          <>
            <div className="pricing-custom-creadits">
              <button
                disabled={customCreadits < 2}
                onClick={() => handleChangeCreadit("dec")}
              >
                <Minus />
              </button>
              <input
                type="number"
                value={customCreadits}
                className="custom-input"
                min={1}
                onChange={(e) => {
                  let value = parseInt(e.target.value, 10);
                  if (e.target.value === "") {
                    return;
                  }
                  if (value < 1 || isNaN(value)) value = 1;
                  setCustomCreadits(value);
                }}
              />
              <button onClick={() => handleChangeCreadit("inc")}>
                <Plus />
              </button>
            </div>
          </>
        )}
      </div>
      <button
        disabled={payLoading}
        className="pricing-btn"
        onClick={handlePayNow}
      >
        {payLoading ? "Paying..." : "Pay now"}
      </button>
    </div>
  );
};
