import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/cartContext.jsx'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <ProductContextProvider>
      <CartProvider>
        <Navbar />
        <App />
        <Footer />
      </CartProvider>
    </ProductContextProvider>
  </BrowserRouter>
  // </StrictMode>,
)
