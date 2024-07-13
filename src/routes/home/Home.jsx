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
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); 

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

  const showMore = () => {
    setVisibleProducts(prev => prev + 6); 
  };

  return (
    <div className='home__container'>
      <h1 className='home__title'>{t('ALL PRODUCTS')}</h1>
      <div className='product__list'>
        {products.slice(0, visibleProducts).map((product) => (
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
      {visibleProducts < products.length && (
        <button className='show-more-button' onClick={showMore}>
          {t('LOAD MORE')}
          <div className="show__more__line"></div>
        </button>
        )}
    </div>
  );
};

export default Home;
