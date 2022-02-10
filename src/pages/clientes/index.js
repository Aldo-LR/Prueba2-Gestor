import { Box, Container, Typography, Button,Modal } from "@mui/material";
import ClientesTable from "components/Clientes/ClientesTable";

const pageStyles = {
  paddingTop: "1em",
  display: "flex",
  flexDirection: "column",
};

const Clientes = () => {
  return (
    <Container className="Pagos" maxWidth="xl" style={pageStyles}>
      <Typography variant="h4" align="center">
        Clientes
      </Typography>
      <Box></Box>

      <ClientesTable />
    </Container>
    

  );
};

export default Clientes;
