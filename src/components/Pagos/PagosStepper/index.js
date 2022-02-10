import "./styles.css";
import { useContext, useEffect, useState } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
} from "@mui/material";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import { CuotasProvider } from "contexts/PagosContext/CuotasContext";
import PagosContext from "contexts/PagosContext";

export const PagosStepper = () => {
  const { activeStep, steps } = useContext(PagosContext);

  return (
    <Box className="PagosStepper" sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label || ""} {...stepProps}>
              <StepLabel {...labelProps}>{label || ""}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {steps[activeStep]?.label || ""}
          </Typography>
          <Box>
            <Button>REset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {steps[activeStep].label}
          </Typography>
          <Box>{steps[activeStep].component}</Box>
        </>
      )}
    </Box>
  );
};

export default PagosStepper;
