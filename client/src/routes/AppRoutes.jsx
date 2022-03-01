<<<<<<< HEAD
import IndexPage from "../pages/IndexPage/IndexPage";
import RegisterPage from "../pages/RegisterPage";
=======
import IndexPage from "../pages/IndexPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
>>>>>>> 9bbbcf611f9fc8b598d0f323c0d0da2d5521cd7b

import { Routes, Route } from 'react-router-dom'



const AppRoutes = () => {
  return (<>
  
    <Routes>
<<<<<<< HEAD
   
      <Route path="/" element={<IndexPage />}/>
      <Route path="/restaurante/registro" element={<RegisterPage/>}></Route>
=======
      <Route path="/" element={<IndexPage></IndexPage>}/>
      <Route path="/restaurante/registro" element={<RegisterPage></RegisterPage>}></Route>
>>>>>>> 9bbbcf611f9fc8b598d0f323c0d0da2d5521cd7b
    </Routes>
    </>
  );
};

export default AppRoutes;
