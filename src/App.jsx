// src/App.jsx
// import Router from "./router/Router";

// const App = () => {
//   return <Router />;
// };

// export default App;

// src/App.jsx
// import Router from "./router/Router";
// import { AuthProvider } from "./context/AuthContext";

// const App = () => {
//   return (
//     <div className="dark:gray-dark-second">
//       <AuthProvider>
//       <Router />
//     </AuthProvider>
//     </div>
//   )
// };

// export default App;

import { useState, useEffect } from "react";
import Router from "./router/Router";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-dark-second transition-colors duration-200">
      <AuthProvider>
        <Router darkMode={darkMode} setDarkMode={setDarkMode} />
      </AuthProvider>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;