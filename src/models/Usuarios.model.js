import * as yup from "yup";
import { EMPTY, VALID } from "./errors/es";

export const usuariosFields = {
  username: "correo",
  password: "password",
  confirmPassword: "confirmPassword",
};

const Usuario = yup.object().shape({
  [usuariosFields.username]: yup
    .string()
    .email(VALID.EMAIL)
    .required(EMPTY.GENERAL),
  [usuariosFields.password]: yup
    .string()
    .min(6, VALID.PASSWORD)
    .required(EMPTY.GENERAL),
  [usuariosFields.confirmPassword]: yup
    .string()
    .min(6, VALID.PASSWORD)
    .required(EMPTY.GENERAL),
});

export default Usuario;
