import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.css';
import "./CSS/Main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MainRouter } from './Router';
import { MainSegment } from './Segments';

function App() {
  return (
    <div className="App">
      <MainSegment/>
    </div>
  );
}

export default App;
