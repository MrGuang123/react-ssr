import React from 'react'
import { Routes, useRoutes, Route, Link } from "react-router-dom";

// import Home from './Home'
// import About from './About'
import RouteConfig from './Router'

const App = () => {
  return (
    <div>
      <h1>hello world</h1>
      {useRoutes(RouteConfig)}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes> */}

    </div>
  )
}

export default App