import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.css';
import "./CSS/Main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MainRouter } from './Router';
import { MainSegment } from './Segments';
import {editor} from "monaco-editor";
import {Colors} from "./Theme"
import { HomePage } from './Pages';

function App() {
  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
