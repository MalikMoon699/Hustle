import API from "../utils/api";

export const handlePaymentHelper = async ({ credits = 0, price = 0 }) => {
  if (credits === 0 || price === 0) return;

  try {
    const body = { credits, price };

    const res = await API.post("/api/payment/create-checkout-session", body);

    const data = res.data;
    if (data.url) {
      window.location.href = data.url;
    }

    return data;
  } catch (err) {
    throw err?.response?.data || err;
  }
};

export const handleVerifyHelper = async (sessionId) => {
  try {
    const res = await API.post("/api/payment/verify-payment", {
      sessionId,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
