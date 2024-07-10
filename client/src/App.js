
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {


  return (
    <div className="App">
     
      <BrowserRouter>
        <Routes>
    
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home/>} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
