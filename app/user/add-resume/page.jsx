"use client";

import AddEducationForm from "@/app/components/user-forms/AddEducationForm"
import AddExperienceForm from "@/app/components/user-forms/AddExperienceForm"
import AddReferenceForm from "@/app/components/user-forms/AddReferenceForm"
import AddResumeForm from "@/app/components/user-forms/AddResumeForm"
import AddSkillForm from "@/app/components/user-forms/AddSkillForm"
import { useState } from "react";

const AddResumePage = () => {
  const [step, setStep] = useState(2);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddResumeForm nextStep={nextStep} />;
      case 2:
        return <AddEducationForm nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <AddExperienceForm nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <AddSkillForm nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <AddReferenceForm prevStep={prevStep} />;
      default:
        return null;
    }
  };

  const isLastStep = step === 5;
  const isFirstStep = step === 1;

  const renderStepTitle = (step) => {
    switch (step) {
      case 1:
        return 'Add Resume Information';
      case 2:
        return 'Add Education';
      case 3:
        return 'Add Experience';
      case 4:
        return 'Add Skills';
      case 5:
        return 'Add References';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center mt-5 py-5 font-extrabold">
        Step {step}: {renderStepTitle(step)}
      </div>
      <section className="container py-5 my-5 justify-center">
        {renderStep()}
      </section>
      <div className="flex justify-center space-x-4">
        {!isFirstStep && <button onClick={prevStep}>Previous</button>}
        {!isLastStep && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};


export default AddResumePage;