import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import PagosContext from "contexts/PagosContext";
import CuotasContext, {
  ListCuotasContext,
} from "contexts/PagosContext/CuotasContext";
import { pagosFields } from "models/Pagos.model";
import { useContext, useEffect } from "react";
import { getDateSameDayNextMonth } from "utils/date";
import CuotaInicial from "./CuotaInicial";

const CuotasInicial = () => {
  const { cuotas, setCuotas } = useContext(ListCuotasContext);

  const { nCuotas, fechaInicioCuotas, totalMonto, setTotalMonto } =
    useContext(CuotasContext);
  const { pagos, setPagos, setIsDisabledNext } = useContext(PagosContext);

  const handleNextStepTwoForm = () => {
    const resStepTwo = {
      [pagosFields.cantidadCuotasMontoInicial]: nCuotas,
      [pagosFields.fechaInicioCuotasMontoInicial]: fechaInicioCuotas,
      [pagosFields.cuotasMontoInicial]: cuotas,
    };
    setPagos({ ...pagos, ...resStepTwo });
  };

  useEffect(() => {
    if (nCuotas && fechaInicioCuotas) {
      const _nCuotasInicial = parseInt(nCuotas);
      const _cuotasInicial = new Array(_nCuotasInicial);

      let date = new Date(fechaInicioCuotas);
      const initialEndDay = date.getDate();

      _cuotasInicial[0] = {};
      _cuotasInicial[0].n = 1;
      _cuotasInicial[0].fecha = date;
      _cuotasInicial[0].monto = 0;
      _cuotasInicial[0].saldo = pagos.precio;

      for (let i = 1; i < _nCuotasInicial; i++) {
        _cuotasInicial[i] = {};
        const currentDate = date;

        /* Fecha */
        date = getDateSameDayNextMonth(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          initialEndDay
        );

        /* Monto */

        _cuotasInicial[i].n = i + 1;
        _cuotasInicial[i].fecha = date;
        _cuotasInicial[i].monto = 0;
        _cuotasInicial[i].saldo = pagos.precio;
      }
      setCuotas(_cuotasInicial);
    }
  }, [nCuotas, fechaInicioCuotas]);

  useEffect(() => {
    setCuotas(pagos[pagosFields.cuotasMontoInicial] || []);
  }, []);

  useEffect(() => {
    if (nCuotas && fechaInicioCuotas && cuotas.length) {
      console.log("pagos", pagos);
      handleNextStepTwoForm();
      setIsDisabledNext(false);
      return;
    }
    setIsDisabledNext(true);
  }, [nCuotas, fechaInicioCuotas, cuotas]);

  useEffect(() => {
    if (!cuotas.length) return;
    let montoTotal = 0;
    cuotas.forEach(({ monto }) => {
      montoTotal += parseFloat(monto);
    });
    setTotalMonto(montoTotal);
  }, [cuotas]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Monto Cuota</TableCell>
            <TableCell>Saldo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cuotas.map(({ ...props }, i) => (
            <CuotaInicial key={props.n} {...props} index={i} />
          ))}
          <TableRow>
            <TableCell colSpan={2} align="right">
              Total
            </TableCell>
            <TableCell>{totalMonto}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CuotasInicial;
