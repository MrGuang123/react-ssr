import React from 'react'
import Home from './Home'
import About from './About'

const RouteConfig = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />,
    loadData: About.service.getData
  },
]

export default RouteConfig