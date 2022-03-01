import IndexPage from "../pages/IndexPage/IndexPage";
import RegisterPage from "../pages/RegisterPage";

import { Routes, Route } from 'react-router-dom'



const AppRoutes = () => {
  return (<>
  
    <Routes>
   
      <Route path="/" element={<IndexPage />}/>
      <Route path="/restaurante/registro" element={<RegisterPage/>}></Route>
    </Routes>
    </>
  );
};

export default AppRoutes;
