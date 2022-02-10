import { TableCell, TableRow, TextField } from "@mui/material";
import { textFieldStyles } from "components/General/TextField";
import PagosContext from "contexts/PagosContext";
import CuotasContext, {
  ListCuotasContext,
} from "contexts/PagosContext/CuotasContext";
import format from "date-fns/format";
import { useContext, useState } from "react";
import { periodRegex } from "utils/regex";

const CuotaInicial = ({ n, fecha, monto = 0, saldo, index }) => {
  const { pagos } = useContext(PagosContext);
  const { nCuotas } = useContext(CuotasContext);
  const { cuotas, setCuotas } = useContext(ListCuotasContext);

  const handleChangeMount = ({ target: { value } }) => {
    if (!value) {
      const _cuotasInicial = cuotas;
      _cuotasInicial[index].monto = 0;
      if (index > 0) {
        _cuotasInicial[index].saldo = _cuotasInicial[index - 1].saldo;
        setCuotas([..._cuotasInicial]);
        return;
      }
      _cuotasInicial[index].saldo = pagos.precio;
      setCuotas([..._cuotasInicial]);
      return;
    }
    if (periodRegex.test(value)) {
      const _cuotasInicial = cuotas;
      _cuotasInicial[index].monto = +value;
      console.log(value);

      if (index > 0) {
        let saldoInicial = _cuotasInicial[index - 1].saldo;
        for (let i = index; i < +nCuotas; i++) {
          saldoInicial -= _cuotasInicial[i].monto;
          _cuotasInicial[i].saldo = saldoInicial;
        }
        setCuotas([..._cuotasInicial]);
        return;
      }

      let saldoInicial = pagos.precio;
      for (let i = 0; i < +nCuotas; i++) {
        saldoInicial -= _cuotasInicial[i].monto;
        _cuotasInicial[i].saldo = saldoInicial;
      }
      console.log("cuotasmontoini", _cuotasInicial);
      setCuotas([..._cuotasInicial]);
    }
  };

  return (
    <TableRow>
      <TableCell>{n}</TableCell>
      <TableCell>
        <TextField
          {...textFieldStyles}
          type="date"
          onChange={({ target: { value } }) => {
            const _date = new Date(value);
            _date.setDate(_date.getDate() + 1);
            // setDate(format(_date, "yyyy-MM-dd"));
            const _cuotasInicial = cuotas;
            _cuotasInicial[index].fecha = _date;
            setCuotas([..._cuotasInicial]);
          }}
          value={format(fecha, "yyyy-MM-dd")}
        />
      </TableCell>
      <TableCell>
        <TextField
          {...textFieldStyles}
          value={monto || ""}
          type="number"
          onChange={handleChangeMount}
        />
      </TableCell>
      <TableCell>{saldo.toString()}</TableCell>
    </TableRow>
  );
};

export default CuotaInicial;
