import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import React from "react";
import './App.css';
import Header from './components/Header';
import CoinPage from "./Pages/CoinPage";
import Homepage from './Pages/Homepage';
import { makeStyles } from "@material-ui/core"
import HomePage from "./Pages/Homepage";
function App() {

  const useStyle = makeStyles(() => ({
    App:{
      backgroundColor:'#14161A',
      color: "white",
      minHeight: "100vh",
    }
  }));

  const classes = useStyle()

  return (
    <Router>
      <div className = {classes.App}>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/coins/:id" element={<CoinPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
