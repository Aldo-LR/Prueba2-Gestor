import { dniRegex, phoneRegex } from "utils/regex";
import * as yup from "yup";
import { EMPTY, VALID } from "./errors/es";

export const clientesFields = {
  nombre: "nombre",
  direccion: "direccion",
  distrito: "distrito",
  dni: "dni",
  telefono: "telefono",
  correo: "correo",
  coopropietario: "coopropietario",
  telefonoCoopropietario: "telefonoCoopropietario",
};

const Cliente = yup.object().shape({
  [clientesFields.nombre]: yup.string().required(EMPTY.GENERAL),
  [clientesFields.direccion]: yup.string().required(EMPTY.GENERAL),
  [clientesFields.distrito]: yup.string().required(EMPTY.GENERAL),
  [clientesFields.dni]: yup
    .string()
    .matches(dniRegex, VALID.DNI)
    .required(EMPTY.GENERAL),
  [clientesFields.telefono]: yup
    .string()
    .matches(phoneRegex, VALID.PHONE)
    .required(EMPTY.GENERAL),
  [clientesFields.correo]: yup
    .string()
    .email(VALID.EMAIL)
    .required(EMPTY.GENERAL),
  [clientesFields.coopropietario]: yup.string(),
  [clientesFields.telefonoCoopropietario]: yup
    .string()
    .matches(phoneRegex, VALID.PHONE),
});

export default Cliente;
