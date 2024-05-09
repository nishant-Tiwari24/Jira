import React from 'react'
import { LoginRegister } from './components/LoginRegister';
import  Home  from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />}/> */}
          <Route path="/*" element={<Home />}/>
          <Route path="/loginRegister" element={<LoginRegister />}/>
        </Routes>
      </Router>
    </div>
  )
}


export default App;

