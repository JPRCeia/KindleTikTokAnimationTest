import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route,Outlet} from 'react-router-dom'

import MainPage from './components/page/book/MainPage';

function App() {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
