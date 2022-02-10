import "./styles.css";
import PagosTable from "components/Pagos/PagosTable";
import PagosDialog from "components/Pagos/PagosDialog";

import { Container, Typography, Box } from "@mui/material";
import { PagosProvider } from "contexts/PagosContext";

const pageStyles = {
  paddingTop: "1em",
  display: "flex",
  flexDirection: "column",
};

const Pagos = () => {
  return (
    <Container className="Pagos" maxWidth="xl" style={pageStyles}>
      <Typography variant="h4" align="center">
        Pagos
      </Typography>
      <Box>
        <PagosProvider>
          <PagosDialog />
        </PagosProvider>
      </Box>
      <PagosTable />
    </Container>
  );
};

export default Pagos;
