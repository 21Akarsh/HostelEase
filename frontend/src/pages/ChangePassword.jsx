import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:3000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:3000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) setStep(3);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      //alert(data.message);
      if (response.ok){
        alert("Password reset successfull.. Redirecting to Login .....");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border rounded mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={resetPassword}>
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;