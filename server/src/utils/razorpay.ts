import Razorpay from "razorpay";

// ==========================
// Validate Razorpay Config
// ==========================
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new Error(
    "Razorpay configuration is missing"
  );
}

// ==========================
// Razorpay Client
// ==========================
const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export default razorpay;