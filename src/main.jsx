import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/provider/CartContext';
import './locales/i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>,
)
