import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import "../assets/style/Pricing.css";
import { Minus, Plus } from "lucide-react";
import {
  handlePaymentHelper,
  getPaymentRecordsHelper,
} from "../services/payment.services";
import { LoadMore } from "../components/CustomComponents";
import { limit } from "../utils/constants";
import { toast } from "sonner";
import { getExpireDate } from "../utils/helper";
import Loader from "../components/Loader";

const Pricing = () => {
  const { setValue } = useOutletContext();
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setValue("Upgrade");
    getPaymentRecords(1);
  }, []);

  const getPaymentRecords = async (nextPage = 1) => {
    try {
      if (nextPage === 1) setLoading(true);
      else setLoadMoreLoading(true);
      const res = await getPaymentRecordsHelper(nextPage, limit);
      if (nextPage === 1) {
        setPaymentRecords(res.data);
      } else {
        setPaymentRecords((prev) => [...prev, ...res.data]);
      }
      setTotal(res?.pagination?.total);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to get Services:", err);
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (paymentRecords.length >= total) return;
    getPaymentRecords(page + 1);
  };

  const PrinciplePlans = [
    { planType: "Basic", price: 300, timeLimit: "month", credits: 500 },
    { planType: "Standard", price: 850, timeLimit: "month", credits: 1000 },
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
            credits={principle?.credits}
          />
        ))}
        <PrincingCard custom={true} planType="" />
      </div>
      <div className="princing-records-container">
        <div className="princing-records-header">
          Payment Records <span>({total || 0})</span>
        </div>
        <div className="princing-records-list">
          {loading ? (
            <Loader style={{height:"180px",width:"100%"}}/>
          ) : paymentRecords?.length > 0 ? (
            paymentRecords?.map((record, index) => {
              const expireAt = getExpireDate(
                record?.createdAt,
                record?.periodType,
              );
              return (
                <div key={index} className="princing-record-card">
                  <div className="princing-record-header">
                    <div className="princing-record-plan">
                      {record?.planType}
                    </div>

                    <div
                      className={`princing-record-status princing-record-status-${record?.status}`}
                    >
                      {record?.status}
                    </div>
                  </div>

                  <div className="princing-record-body">
                    <div className="princing-record-item">
                      <span className="princing-record-label">Credits</span>
                      <span className="princing-record-value">
                        {record?.credits}
                      </span>
                    </div>

                    <div className="princing-record-item">
                      <span className="princing-record-label">Period</span>
                      <span className="princing-record-value">
                        {record?.periodType}
                      </span>
                    </div>

                    <div className="princing-record-item">
                      <span className="princing-record-label">Price</span>
                      <span className="princing-record-value">
                        € {record?.price}
                      </span>
                    </div>

                    <div className="princing-record-item">
                      <span className="princing-record-label">
                        Subscribe At
                      </span>
                      <span className="princing-record-value">
                        {new Date(record?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="princing-record-item">
                      <span className="princing-record-label">Expire At</span>
                      <span className="princing-record-value">{expireAt}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="empty-data">No records found.</p>
          )}
        </div>
        <LoadMore
          loading={loadMoreLoading}
          disabled={loadMoreLoading || loading}
          show={paymentRecords.length < total && !loading}
          onLoad={handleLoadMore}
        />
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
  credits = 0,
}) => {
  const [customcredits, setCustomcredits] = useState(1500);
  const [customPrice, setCustomPrice] = useState(0);
  const [payLoading, setPayLoading] = useState(false);

  const handlePayNow = async () => {
    try {
      setPayLoading(true);

      await handlePaymentHelper({
        credits: custom ? customcredits : credits,
        price: custom ? customPrice : price,
        planType: custom ? "Custom" : planType,
        periodType: timeLimit,
      });
    } catch (err) {
      console.error("Payment Failed:", err);
      toast.error("Payment failed.");
    } finally {
      setPayLoading(false);
    }
  };

  useEffect(() => {
    const price = getCustomcreditsPrice(customcredits);
    setCustomPrice(price);
  }, [customcredits]);

  const getCustomcreditsPrice = (credits = 1) => {
    const inOneDollar = 0.6;
    const price = credits * inOneDollar;
    return price.toFixed(2);
  };

  const handleChangeCreadit = (type = "inc") => {
    setCustomcredits((prev) => {
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
            {custom ? customcredits : credits}
          </span>
          <span className="credits-text">credits/{timeLimit}</span>
        </div>
        {custom && (
          <>
            <div className="pricing-custom-credits">
              <button
                disabled={customcredits < 2}
                onClick={() => handleChangeCreadit("dec")}
              >
                <Minus />
              </button>
              <input
                type="number"
                value={customcredits}
                className="custom-input"
                min={1}
                onChange={(e) => {
                  let value = parseInt(e.target.value, 10);
                  if (e.target.value === "") {
                    return;
                  }
                  if (value < 1 || isNaN(value)) value = 1;
                  setCustomcredits(value);
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
