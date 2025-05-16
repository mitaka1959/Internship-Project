import BasicInfo from "./BasicInfo";
import React, { useState } from "react";
import RoomConfiguration from "./RoomConfiguration";
import StepsComponent from "./Steps";

const CreateHotelFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFormDataChange = (data: { [key: string]: any }) => {
    setFormData({ ...formData, ...data });
    console.log("Current Collected Data:", { ...formData, ...data });
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
        <StepsComponent currentStep={step} />
      </div>

      <div>
        {step === 1 && (
          <BasicInfo onNext={nextStep} onChange={handleFormDataChange} />
        )}
        {step === 2 && (
          <RoomConfiguration
            onNext={nextStep}
            onPrev={prevStep}
            onChange={handleFormDataChange}
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
