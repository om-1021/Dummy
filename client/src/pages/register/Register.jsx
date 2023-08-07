import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

// const handleSendEmail = async () => {
//   try {
//     await newRequest.post("/send/send-email", {
//       to: "omdubey737683r@gmail.com",
//     });
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email", error);
//   }
// };

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const [enteredOTP, setEnteredOTP] = useState(""); // State for entered OTP
  const [verificationStatus, setVerificationStatus] = useState(false); // State for verification status

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSendEmail = async () => {
    try {
      await newRequest.post("/send/send-email", {
        to: user.email,
        enteredOTP: enteredOTP, // Include the entered OTP
      });
      console.log("Email sent successfully");
      setVerificationStatus(false); // Reset verification status
    } catch (error) {
      console.error("Error sending email", error);
    }
  };
  const verifyOTP = async () => {
    try {
      const response = await newRequest.post("/send/verify-otp", {
        otp: enteredOTP,
      });

      if (response.status === 200) {
        setVerificationStatus("verified");
      } else {
        setVerificationStatus("wrong otp");
      }
    } catch (err) {
      console.error(err);
      setVerificationStatus("wrong otp");
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <button type="button" onClick={handleSendEmail}>Send Otp</button>
          <input
            name="email"
            type="number"
            placeholder="otp"
            onChange={(e)=>setEnteredOTP(e.target.value)}
          />
          
          <button type="button" onClick={verifyOTP}>
            {verificationStatus === "verified" ? "Verified" : "Verify"}
          </button>
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="India"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+91 847-397-8031"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
