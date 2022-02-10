import { useState, createContext } from "react";

const PagosContext = createContext({
  pagos: {},
  setPagos: () => {},
  activeStep: 0,
  setActiveStep: () => {},
  steps: [],
  setSteps: () => {},
  isDisabledNext: true,
  setIsDisabledNext: () => {},
});

export const PagosProvider = ({ children }) => {
  const [pagos, setPagos] = useState({});
  const [saldo, setSaldo] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [steps, setSteps] = useState([]);

  const value = {
    pagos,
    setPagos,
    saldo,
    setSaldo,
    activeStep,
    setActiveStep,
    steps,
    setSteps,
    isDisabledNext,
    setIsDisabledNext,
  };
  return (
    <PagosContext.Provider value={value}>{children}</PagosContext.Provider>
  );
};

export default PagosContext;
