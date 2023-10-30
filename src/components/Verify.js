import React, { useState } from "react";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";

import { useNavigate, useParams } from "react-router-dom";

function Verify() {
  const [otp, setOtp] = useState("");
  const { phoneNumber, requestId } = useParams();
  const endpoint = "https://dev.api.goongoonalo.com/v1";
  const navigate = useNavigate();
  const [phoneNumberFinal, setPhoneNumberFinal] = useState(phoneNumber);
  const [requestIdFinal, setRequestIdFinal] = useState(requestId);

  const handleVerify = () => {
    fetch(`${endpoint}/auth/verify_otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumberFinal,
        requestId: requestIdFinal,
        otp: otp,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response JSON if the request was successful
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        // Handle the response data here
        console.log("Response Data:", data);
        navigate("/home");

        // You can update your UI or take other actions based on the response
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        navigate("/home");
        // Handle errors, e.g., update the UI to show an error message
      });
  };

  //resend api
  function handleResend() {
    fetch(`${endpoint}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumberFinal,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRequestIdFinal(data?.requestId);

        alert("OTP sent again. Enter the otp recieved");

        // Move the navigate call inside the .then() block
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  }

  return (
    <>
      <div className="   w-4/12  ">
        <div className="mx-8">
          <p className="font-roboto font-medium text-start text-4xl text-darkPurple ">
            OTP Verification
          </p>
          <p className="font-lato mt-2 font-normal  text-start text-xs">
            We have sent and OTP to {phoneNumberFinal} Please enter the code
            received to verify.
          </p>
        </div>

        <div className="bg-white p-8 ">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between w-96">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderInput={(props, index) => (
                    <input
                      {...props}
                      style={{
                        width: "80px", // Adjust the width as needed
                        height: "80px", // Adjust the height as needed
                        fontSize: "25px", // Adjust the font size as needed
                        padding: "25px", // Add padding to the input fields
                        border: "1px solid #D0D3D4",
                        borderRadius: "4px",
                        margin: "0 10px",
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full font-montse text-white  h-10 justify-center rounded-xl  px-3 py-1.5 text-base font-bold bg-darkPurple"
                onClick={handleVerify}
                // disabled={submitbuttondisable}
              >
                Verify
              </button>

              <div className="mt-3 text-center ">
                <div className="lato font-normal text-base  ">
                  <p>
                    <a onClick={handleResend}>Resend OTP</a>
                  </p>
                </div>
                <div className="lato font-normal text-base  ">
                  <a href="/">Use Another Number</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verify;
