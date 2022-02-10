import "./styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import PagosStepper from "../PagosStepper";
import PagosContext from "contexts/PagosContext";
import FormStepOne from "../PagosStepper/FormStepOne";
import { CuotasProvider } from "contexts/PagosContext/CuotasContext";
import FormStepTwo from "../PagosStepper/FormStepTwo";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const STEPS = [
  {
    label: "Datos del pago",
    component: <FormStepOne />,
    handleNext: () => {},
  },
  {
    label: "Cuotas iniciales",
    component: (
      <CuotasProvider>
        <FormStepTwo />
      </CuotasProvider>
    ),
    handleNext: () => {},
  },
  {
    label: "Cuotas a financiar",
    component: <CuotasProvider></CuotasProvider>,
    handleNext: () => {},
  },
];

const PagosDialog = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const {
    setPagos,
    steps,
    setSteps,
    activeStep,
    setActiveStep,
    isDisabledNext,
    setIsDisabledNext,
  } = useContext(PagosContext);

  useEffect(() => {
    setSteps(STEPS);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIsDisabledNext(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setPagos({});
    setOpen(false);
    setActiveStep(0);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
        Crear
      </Button>
      <ReactHTMLTableToExcel
        className="btn btn-success"
        id="exporttable"
        table="emp-table"
        filename="tablexls"
        sheet="tablexls"
        buttonText="DESCARGAR ESTADOS DE PAGO"
      />
      <Dialog
        className="PagosDialog"
        open={open}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth={true}
        fullScreen={fullScreen}
      >
        <DialogTitle>Agregar Nuevo Pago</DialogTitle>
        <DialogContent>
          <PagosStepper />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>

          <Button onClick={handleNext} disabled={isDisabledNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PagosDialog;
