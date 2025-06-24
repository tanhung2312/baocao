import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BookRenewalSimulation from './BookRenewalSimulation.jsx';
import ReviewComponent from "./ReviewComponent";
import ReviewInventory from "./ReviewInventory";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReviewComponent />
    <BookRenewalSimulation />
    <ReviewInventory />
  </React.StrictMode>
);
