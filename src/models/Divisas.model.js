import * as yup from "yup";
import { EMPTY } from "./errors/es";

export const divisasFields = {
  tipoCambio: "tipoCambio",
};

const Divisa = yup.object().shape({
  [divisasFields.tipoCambio]: yup.number().required(EMPTY.GENERAL),
});

export default Divisa;
