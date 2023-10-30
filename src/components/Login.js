import React, { useState } from "react";
import "react-phone-number-input/style.css";

import Phone from "react-phone-number-input";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [requestId, setRequestId] = useState("");
  const endpoint = "https://dev.api.goongoonalo.com/v1";
  const navigate = useNavigate();

  const sendOTP = () => {
    fetch(`${endpoint}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRequestId(data?.requestId);

        alert("OTP sent! Proceed to the Verification Page.");

        // Move the navigate call inside the .then() block
        navigate(`/verify/${phoneNumber}/${data?.requestId}`);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  return (
    <>
      <div className="   w-4/12  ">
        <div className="mx-8">
          <p className="font-roboto font-medium text-start text-4xl text-darkPurple ">
            Sign In
          </p>
          <p className="font-lato mt-2 font-normal  text-start text-xs">
            Please send your mobile number to login. We will send you an otp to
            verify your number{" "}
          </p>
        </div>

        <div className="bg-white p-8 ">
          <div class="space-y-6">
            <div>
              <div class="">
                <div className="border-2 border-lightGreyNew rounded-lg">
                  <Phone
                    className=" p-3 border-1 rounded-xlg block w-full h-10  border-1 border-lightGreyNew placeholder:text-admin-whisper-1 "
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full font-montse text-white  h-10 justify-center rounded-xl  px-3 py-1.5 text-base font-bold bg-darkPurple"
                onClick={sendOTP}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
