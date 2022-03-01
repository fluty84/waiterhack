import IndexPage from "../pages/IndexPage/IndexPage";
import RegisterPage from "../pages/registerPage/RegisterPage";

import { Routes, Route } from 'react-router-dom'



const AppRoutes = () => {
  return (<>
  
    <Routes>
      <Route path="/" element={<IndexPage></IndexPage>}/>
      <Route path="/restaurante/registro" element={<RegisterPage></RegisterPage>}></Route>
    </Routes>
    </>
  );
};

export default AppRoutes;
