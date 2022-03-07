import IndexPage from "../pages/IndexPage/IndexPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import CreateOrder from "../components/CreateOrder/CreateOrder";
import CreateMenu from "../components/createMenu/CreateMenu";
import Basket from "../pages/CustomerPages/Basket";
import { Routes, Route } from "react-router-dom";
import DayPanel from "../pages/DayPanel/DayPanel";
import ClientView from "../pages/CustomerPages/ClientView";
import QrPrint from "../pages/qrPrint/QrPrint";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />

        <Route path="/restaurante/registro" element={<RegisterPage />}></Route>

        <Route path="/restaurante/:id/menu" element={<CreateMenu />}></Route>

        <Route
          path="/:_id/:tableId/customer-order" // Pedido del cliente
          element={<ClientView></ClientView>}
        ></Route>

        <Route
          path="/:_id/:tableId/display-order"
          element={<Basket></Basket>}
        ></Route>

        <Route path="/panel" element={<DayPanel></DayPanel>}></Route>

        <Route
          path="/:_id/:tableId/vista-cliente" //landing cliente cambiar componente
          element={<QrPrint></QrPrint>}
        ></Route>

        <Route
          path="/restaurante/:id/panel/:tableId/qr/:number"
          element={<QrPrint></QrPrint>}
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
