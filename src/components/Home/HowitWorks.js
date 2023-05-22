import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="lg:py-20 py-10 customstepper" id='howitworks'>
      <Box className="container-sk border-white border   lg:p-10 p-5 rounded-xl">
        <h2 className="font-display text-center text-white lg:text-4xl md:text-2xl text-xl">
          {" "}
          How it works ?{" "}
        </h2>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className="mt-20 text-white"
          
        >
          {steps.map((step, index) => (
            <Step key={step.label}   className="text-white"   >
              <StepLabel
              className="text-white"
               
                optional={
                  index === 2 ? (
                    <Typography variant="caption" className="text-white">Last step</Typography>
                  ) : null
                }
              >
               
                <Box className="text-white text-[20px]"> {step.label}</Box>
              </StepLabel>
              <StepContent>
                <Typography   className="text-white pl-3">{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div className="mt-4">
                    <Button
                      variant="contained"
                      hidden={index === steps.length - 1}
                      onClick={handleNext}
                      className="bg-white hover:bg-gray-300 duration-300 text-black"
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      hidden={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      className="bg-white hover:bg-gray-300 duration-300 text-black"
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
    
      </Box>
    </div>
  );
}
