import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./CSS/Main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MainSegment } from './Segments';


function App() {
  return (
    <div className="App" style={{
      height : "100vh",
      overflow : "scroll"
    }}>
      <MainSegment/>
    </div>
  );
}

export default App;
