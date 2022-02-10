import * as yup from "yup";

export const pagosFields = {
  cliente: "cliente",
  proyecto: "proyecto",
  lote: "lote",
  moneda: "moneda",
  precio: "precio",
  cantidadCuotasMontoInicial: "cantidadCuotasMontoInicial",
  fechaInicioCuotasMontoInicial: "fechaInicioCuotasMontoInicial",
  cuotasMontoInicial: "cuotasMontoInicial",
  cantidadCuotasMontoFinanciar: "cantidadCuotasMontoFinanciar",
  fechaInicioCuotasMontoFinanciar: "fechaInicioCuotasMontoFinanciar",
  cuotasMontoFinanciar: "cuotasMontoFinanciar",
};

export const cuotasFields = {
  numero: "numero",
  fechaCuota: "fechaCuota",
  montoCuota: "montoCuota",
  saldoCuota: "saldoCuota",
};

const Cuota = yup.object().shape({
  [cuotasFields.numero]: yup.number().required(),
  [cuotasFields.fechaCuota]: yup.date().required(),
  [cuotasFields.montoCuota]: yup.number().required(),
  [cuotasFields.saldoCuota]: yup.number().required(),
});

export const StepOne = yup.object().shape({
  [pagosFields.cliente]: yup.number().required(),
  [pagosFields.proyecto]: yup.number().required(),
  [pagosFields.lote]: yup.number().required(),
  [pagosFields.moneda]: yup.number().required(),
  [pagosFields.precio]: yup.number().required(),
});

export const StepTwo = yup.object().shape({
  [pagosFields.cantidadCuotasMontoInicial]: yup.number().required(),
  [pagosFields.fechaInicioCuotasMontoInicial]: yup.date().required(),
  [pagosFields.cuotasMontoInicial]: yup
    .array()
    .of(yup.object().shape(Cuota))
    .required(),
});

export const StepTthree = yup.object().shape({
  [pagosFields.cantidadCuotasMontoFinanciar]: yup.number().required(),
  [pagosFields.fechaInicioCuotasMontoFinanciar]: yup.date().required(),
  [pagosFields.cuotasMontoFinanciar]: yup
    .array()
    .of(yup.object().shape(Cuota))
    .required(),
});
