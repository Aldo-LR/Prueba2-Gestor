import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "pages/login";
import Navbar from "components/General/Navbar";
import { AuthProvider } from "contexts/AuthContext";
import RequireAuth from "components/General/RequireAuth";
import Pagos from "pages/pagos";
import Clientes from "pages/clientes";
import { privateRoutes } from "routes/routes";
import Home from "pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/pagos_mykonos">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {privateRoutes.map(({ path, title, element }) => (
              <Route
                key={title}
                path={path}
                element={<RequireAuth>{element}</RequireAuth>}
              />
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
