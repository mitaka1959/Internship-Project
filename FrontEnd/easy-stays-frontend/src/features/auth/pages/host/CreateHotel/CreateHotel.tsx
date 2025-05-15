import BasicInfo from "./BasicInfo";
import AntSteps from "./Steps";
import React from "react";
import { useState } from "react";
import RoomConfiguration from "./RoomConfiguration";
import PhotosAndMedia from "./PhotosAndMedia";
import PricingAndAvailability from "./PricingAndAvailability";
import ReviewAndSubmit from "./ReviewAndSubmit";
import Policies from "./Policies";

const CreateHotel: React.FC = () => {
  const [step, setstep] = useState(1);
  const nextStep = () => {
    setstep(step + 1);
  };
  const prevStep = () => {
    setstep(step - 1);
  };
  return (
    <div>
      <BasicInfo />
      <div
        style={{
          padding: "0.5rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntSteps />
      </div>
    </div>
  );
};
export default CreateHotel;
