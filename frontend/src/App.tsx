import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <ThemeProvider>
      <div className="container mx-auto px-4 min-h-screen flex flex-col justify-between">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
        <Footer />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </ThemeProvider>
  );
}

export default App;
