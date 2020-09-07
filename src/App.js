
import React from 'react';
import './App.css';
import './stylesFonts.css';
import { HashRouter } from 'react-router-dom';
import Home from './component/init'


const App = ()=>{
  return (
    <div style={{ zIndex: 0, overflow: "hidden"}} >
        <HashRouter>
          <Home/>
        </HashRouter>
    </div>
  );
}


export default App;
