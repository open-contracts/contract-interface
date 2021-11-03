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

function App() {

  editor.defineTheme(
    'darkDapp',    
    {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': Colors.Maintheme,
        }
    })
    editor.setTheme("darkDapp")
  return (
    <div className="App">
      <MainSegment/>
    </div>
  );
}

export default App;
