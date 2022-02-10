import Clientes from "pages/clientes";
import Login from "pages/login";
import Pagos from "pages/pagos";

export const publicRoutes = [
  {
    path: "/login",
    title: "Iniciar Sesión",
    element: <Login />,
  },
];

export const privateRoutes = [
  {
    path: "/clientes",
    title: "Clientes",
    element: <Clientes />,
  },
  {
    path: "/pagos",
    title: "Pagos",
    element: <Pagos />,
  },
  {
    path: "/ajustes",
    title: "Ajustes",
  },
  {
    path: "/proyecciones",
    title: "Proyecciones",
  },
  {
    path: "/mantenimiento",
    title: "Mantenimiento",
  },
];
