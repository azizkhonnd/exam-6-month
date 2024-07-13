import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeartLogo from './img/heart-button-svg.svg';
import CartLogo from './img/cart-shopping.svg';
import Rate from './img/rate.svg';
import { CartContext } from '../../context/provider/CartContext';
import { useTranslation } from 'react-i18next';
import './Home.scss';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-e-commerce-production.up.railway.app/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    addToCart(product);
    toast.success(`${product.name} ${t('added to cart')}`);

    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <div className='home__container'>
        <h1 className='home__title'>{t('ALL PRODUCTS')}</h1>
        <div className='product__list'>
          {products.map((product) => (
            <div key={product.id} className='product__item' onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.name} className='product__image' />
              <h2 className='product__name'>{product.name}</h2>
              <div className="product__title__price">
                <p className='product__price'>${product.price}</p>
                <p className='product__sale'>$534.33</p>
                <p className='product__sale__percent'>24% Off</p>
              </div>
              <img src={Rate} alt="rate" />
              <div className="product__get__buttons">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    toast.success(`${product.name} ${t('added to cart')}`);
                  }}
                  className='cart__button'
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <img className="heart__img" style={{ width: '22px' }} src={CartLogo} alt="cart" />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  className='cart__button__favorite'
                >
                  <img className="heart__img" style={{ width: '40px' }} src={HeartLogo} alt="heart" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <ul className='footer__text'>
            <li className='footer__wrap'>
              <b className='b'>E comm</b>
              <p>{t('Subtitle')}</p>
            </li>
            <div className='social'>
              <li className='footer__wrap'>
                <b className='b'>Contact Us</b>
                <p>{t('Subtitle2')}</p>
              </li>
              <div className="social__ico">
                <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                  <img src='https://img.icons8.com/color/48/000000/facebook-f.png' alt='Facebook' />
                </a>
                <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                  <img src='https://img.icons8.com/color/48/000000/instagram-new.png' alt='Instagram' />
                </a>
              </div>
            </div>
            <li className='footer__wrap'>
              <b className='b'>Contact Us</b>
              <p>{t('Subtitle3')}</p>
            </li>
          </ul>
        </div>
        <p className='footer__title__end'>{('© 2018 Ecommerce theme by www.bisenbaev.com')}</p>
      </footer>

    </>
  );
};

export default Home;

