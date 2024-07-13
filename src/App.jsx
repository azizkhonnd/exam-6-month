import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import Auth from './routes/auth/Auth';
import Admin from './routes/admin/Admin';
import Login from './routes/auth/login/Login';
import Register from './routes/auth/register/Register';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/Cart/Cart';
import ProductDetail from './pages/singlePage/SingleProduct';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
