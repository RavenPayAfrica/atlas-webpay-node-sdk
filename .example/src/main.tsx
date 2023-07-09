import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const render: any = document.getElementById('root')
ReactDOM.createRoot(render).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
