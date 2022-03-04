import IndexPage from "../pages/IndexPage/IndexPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import CreateOrder from "../components/CreateOrder/CreateOrder";
import CreateMenu from "../components/createMenu/CreateMenu";
import Basket from "../pages/CustomerPages/Basket";
import { Routes, Route } from "react-router-dom";
import DayPanel from "../pages/DayPanel/DayPanel";
import ClientView from "../pages/CustomerPages/ClientView";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />

        <Route path="/restaurante/registro" element={<RegisterPage />}></Route>

        <Route path="/restaurante/:id/menu" element={<CreateMenu />}></Route>

        <Route
          path="/:_id/:tableId/customer-order"
          element={<CreateOrder></CreateOrder>}
        ></Route>

        <Route
          path="/:_id/:tableId/display-order"
          element={<Basket></Basket>}
        ></Route>

        <Route path="/panel" element={<DayPanel></DayPanel>}></Route>

        <Route
          path="/:_id/:tableId/vista-cliente"
          element={<ClientView></ClientView>}
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
