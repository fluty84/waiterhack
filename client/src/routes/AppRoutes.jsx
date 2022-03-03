import IndexPage from "../pages/IndexPage/IndexPage";
import RegisterPage from "../pages/registerPage/RegisterPage";

import { Routes, Route } from 'react-router-dom'
import CreateMenu from "../components/createMenu/CreateMenu";



const AppRoutes = () => {
  return (<>
  
    <Routes>
      <Route path="/" element={<IndexPage />}/>
      <Route path="/restaurante/registro" element={<RegisterPage/>}></Route>
      <Route path="/restaurante/:id/menu" element={<CreateMenu />}></Route>


    </Routes>
    </>
  );
};

export default AppRoutes;
