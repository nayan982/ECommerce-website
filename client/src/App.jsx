import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';

const Home = lazy(() => import('./pages/Home.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const ProductDisplay = lazy(() => import('./pages/ProductDisplay.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));

function App() {

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:slug' element={<ProductDisplay />} />
          <Route path='/viewcart' element={<Cart />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
