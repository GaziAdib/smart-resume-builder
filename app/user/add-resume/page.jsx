"use client";

import AddCertificateForm from "@/app/components/user-forms/AddCertificateForm";
import AddEducationForm from "@/app/components/user-forms/AddEducationForm"
import AddExperienceForm from "@/app/components/user-forms/AddExperienceForm"
import AddProjectForm from "@/app/components/user-forms/AddProjectForm";
import AddReferenceForm from "@/app/components/user-forms/AddReferenceForm"
import AddResumeForm from "@/app/components/user-forms/AddResumeForm"
import AddRootSkillForm from "@/app/components/user-forms/AddRootSkillForm";
import AddSkillForm from "@/app/components/user-forms/AddSkillForm"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

const AddResumePage = () => {

  const session = useSession();

  if(!session) {
    return redirect('/auth/login')
  }


  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 7));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddResumeForm nextStep={nextStep} />;
      case 2:
        return <AddEducationForm nextStep={nextStep} prevStep={prevStep}  />;
      case 3:
        return <AddExperienceForm nextStep={nextStep} prevStep={prevStep}  />;
      case 4:
        return <AddRootSkillForm nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <AddReferenceForm nextStep={nextStep} prevStep={prevStep} />;
      case 6:
          return <AddProjectForm nextStep={nextStep} prevStep={prevStep} />;
      case 7:
          return <AddCertificateForm nextStep={nextStep} prevStep={prevStep} />;        
      default:
        return null;
    }
  };

  const isLastStep = step === 7;
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
      case 6:
          return 'Add Projects';
      case 7:
          return 'Add Certificates';    
      default:
        return '';
    }
  };

  const progress = ((step - 1) / 6) * 100; // Calculate progress percentage
  return (
    
   
      <div className="flex flex-col my-14 justify-center items-center">
            {/* Progress Bar */}
            <div className="w-3/4 h-3 bg-gray-200 rounded-full mb-4 mt-8 relative">
              <div className="h-full rounded-2xl bg-green-500" style={{ width: `${progress}%` }}></div>
              <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center text-white font-bold">
                {/* {Math.floor(progress)}% Completed */}
              </div>
            </div>
            {/* Timeline View */}
            <div className="relative w-3/4 flex justify-between items-center">
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <div key={index}>
                  <div className={`w-6 h-6 flex dark:bg-gray-900 dark:border-2 justify-center items-center rounded-full bg-gray-200 border-gray-200 ${index === step ? 'bg-green-500 border-green-500' : index < step ? 'bg-blue-500 border-blue-500' : ''}`}>
                    {index}
                  </div>
                  {index < 7 && <div className={`w-10 bg-gray-300  ${index < step ? 'bg-blue-500' : ''}`}></div>}
                </div>
              ))}
            </div>
            {/* Step Title */}
            <div className="text-center text-xl mt-4 py-4 font-semibold">
              Step {step}: {renderStepTitle(step)}
            </div>
            {/* Step Content */}
            <section className="container py-3 my-3 justify-center">
              {renderStep()}
            </section>
            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4">
              {step !== 1 && <button className="bg-gray-100 hover:bg-gray-600 hover:text-gray-100 text-gray-600 rounded-xl px-4 py-0.5 shadow-sm font-semibold border-2 border-gray-300"  onClick={prevStep}>Previous</button>}
              {step !== 7 && <button className="bg-gray-100 hover:bg-gray-600 hover:text-gray-100 text-gray-600 rounded-xl px-4 py-0.5 shadow-sm font-semibold border-2 border-gray-300" onClick={nextStep}>Next</button>}
            </div>
      </div>

    
  );
};

export default AddResumePage;