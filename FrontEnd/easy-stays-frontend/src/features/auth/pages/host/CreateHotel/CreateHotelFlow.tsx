import BasicInfo from "./BasicInfo";
import React, { useState } from "react";
import RoomConfiguration from "./RoomConfiguration";
import StepsComponent from "./Steps";
import PhotosAndMedia from "./PhotosAndMedia";
import Polisies from "./Policies";
import ReviewAndSubmit from "./ReviewAndSubmit";

const CreateHotelFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFormDataChange = (data: { [key: string]: any }) => {
    setFormData({ ...formData, ...data });
    console.log("Current Collected Data:", { ...formData, ...data });
  };
  const onSubmit = () => {
    console.log("Final Submitted Data:", formData);

    alert("Hotel Created Successfully!");
    setFormData({});
  };

  return (
    <div>
      <div
        style={{
          padding: "0.5rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StepsComponent
          currentStep={step}
          onStepChange={(newStep) => setStep(newStep)}
        />
      </div>

      <div>
        {step === 1 && (
          <BasicInfo
            onNext={nextStep}
            onChange={handleFormDataChange}
            formData={formData}
          />
        )}
        {step === 2 && (
          <RoomConfiguration
            onNext={nextStep}
            onPrev={prevStep}
            onChange={handleFormDataChange}
            formData={formData}
          />
        )}
        {step === 3 && (
          <PhotosAndMedia
            onNext={nextStep}
            onPrev={prevStep}
            onChange={handleFormDataChange}
            formData={formData}
          />
        )}
        {step === 4 && (
          <Polisies
            onNext={nextStep}
            onPrev={prevStep}
            onChange={handleFormDataChange}
            formData={formData}
          />
        )}
        {step === 5 && (
          <ReviewAndSubmit
            formData={formData}
            onPrev={prevStep}
            onChange={handleFormDataChange}
            onSubmit={onSubmit}
          />
        )}
      </div>

      <pre style={{ padding: "1rem", background: "#f5f5f5" }}>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
};

export default CreateHotelFlow;
