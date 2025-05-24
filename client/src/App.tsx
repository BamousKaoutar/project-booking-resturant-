import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/dashboardPage";
import MenuPage from "./pages/admin/menuPage";
import TablesPage from "./pages/admin/tablePage";


const App: React.FC = () => {
  return (
    <Router>
          <Routes>
            
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="admin/menu" element={<MenuPage />} />
            <Route path="admin/tables" element={<TablesPage />} /> 

            
          </Routes>
       </Router> 
  );
};

export default App;
















/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import '@/App.css'
import Home from '@/app/page'
import { Route, Router, Routes } from "react-router-dom"
import { Dashboard } from './pages/dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Home></Home>
  )
  
 /* return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  ) */
//}

// export default App
