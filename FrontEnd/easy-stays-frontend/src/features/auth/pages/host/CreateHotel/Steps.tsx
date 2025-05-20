import { Steps } from "antd";

interface StepsComponentProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const StepsComponent: React.FC<StepsComponentProps> = ({
  currentStep,
  onStepChange,
}) => {
  return (
    <Steps
      current={currentStep - 1}
      onChange={(newStep) => {
        if (newStep + 1 <= currentStep) {
          onStepChange(newStep + 1);
        }
      }}
      items={[
        { title: "Basic Info" },
        { title: "Room Configuration" },
        { title: "Photos & Media" },
        { title: "Policies" },
        { title: "Review & Submit" },
      ]}
    />
  );
};

export default StepsComponent;
