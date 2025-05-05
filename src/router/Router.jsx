// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import MovieDetail from "../pages/MovieDetail";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import PrivateRouter from "./PrivateRouter";
// import { MovieProvider } from "../context/MovieContext";
// import Navbar from "../components/Navbar";

// const Router = ({ darkMode, setDarkMode }) => {
//   return (
//     <BrowserRouter>
//      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
//       <MovieProvider>
     
        

//         <Routes>
//           <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<PrivateRouter />}>
//             <Route path="/movie/:id" element={<MovieDetail darkMode={darkMode} setDarkMode={setDarkMode} />} />
//           </Route>
//         </Routes>
//       </MovieProvider>
//     </BrowserRouter>
//   );
// };

// export default Router;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import { MovieProvider } from "../context/MovieContext";
import Navbar from "../components/Navbar";

const Router = ({ darkMode, setDarkMode }) => {
  return (
    <BrowserRouter>
      <MovieProvider>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/movie/:id" 
            element={
              <PrivateRouter>
                <MovieDetail darkMode={darkMode} setDarkMode={setDarkMode} />
              </PrivateRouter>
            } 
          />
        </Routes>
      </MovieProvider>
    </BrowserRouter>
  );
};

export default Router;