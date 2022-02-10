import { textFieldStyles } from "components/General/TextField";
import { useState, useEffect, useContext } from "react";
import { pagosFields } from "models/Pagos.model";
import PagosContext from "contexts/PagosContext";

import { TextField } from "@mui/material";
import { integerRegex } from "utils/regex";
import CuotasContext, {
  ListCuotasProvider,
} from "contexts/PagosContext/CuotasContext";
import CuotasInicial from "./CuotasInicial";
import { format } from "date-fns";

const FormStepTwo = () => {
  const { nCuotas, setNCuotas, fechaInicioCuotas, setFechaInicioCuotas } =
    useContext(CuotasContext);

  const { pagos, setPagos, steps, setSteps, activeStep, setActiveStep } =
    useContext(PagosContext);
  const [saldoTotal, setSaldoTotal] = useState(pagos.precio);

  useEffect(() => {
    setNCuotas(pagos[pagosFields.cantidadCuotasMontoInicial] || "");
    setFechaInicioCuotas(
      pagos[pagosFields.fechaInicioCuotasMontoInicial] || ""
    );
  }, []);

  return (
    <form>
      <TextField
        {...textFieldStyles}
        label="Cantidad Cuotas Monto Inicial"
        onChange={({ target: { value } }) => {
          if (!value) {
            setNCuotas(value);
            return;
          }
          if (integerRegex.test(value)) setNCuotas(value);
        }}
        defaultValue={nCuotas}
        helperText="Debe ingresar un numero menor a 300"
      />
      <TextField
        {...textFieldStyles}
        type="date"
        label="Fecha Cuotas Monto Inicial"
        InputLabelProps={{ shrink: true }}
        onChange={({ target: { value } }) => {
          const date = new Date(value);
          date.setDate(date.getDate() + 1);
          setFechaInicioCuotas(date);
        }}
        defaultValue={
          fechaInicioCuotas && format(fechaInicioCuotas, "yyyy-MM-dd")
        }
      />
      <ListCuotasProvider>
        <CuotasInicial />
      </ListCuotasProvider>
    </form>
  );
};

export default FormStepTwo;
