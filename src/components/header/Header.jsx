import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderImg from './img/adidas-shoe.png';
import Shipping from './img/shipping.svg';
import Rate from '../../routes/home/img/rate.svg'; // Assuming you have a rating icon/image
import './Header.scss';

const Header = () => {
  const { t } = useTranslation();
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const response = await axios.get('https://backend-e-commerce-production.up.railway.app/api/v1/products');
        const filteredProducts = response.data.filter(product => product.rating >= 4); // Adjust the condition as per your rating system
        setTopRatedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching top-rated products:', error);
      }
    };

    fetchTopRatedProducts();
  }, []);

  return (
    <>
      <div className="header__container">
        <div className='container'>
          <div className="container shop__item">
            <div className="header__title">
              <h1 className='sneakers__title'>Adidas Men Running Sneakers</h1>
              <p className='sneakers__subtitle'>
                Performance and design. Taken right to the edge.
              </p>
              <Link className='shop__now__link' to="/">{t('SHOP NOW')}</Link>
              <div className="shop__now__line"></div>
            </div>
            <div className='hero__img'>
              <img className='hero__img' src={HeaderImg} alt="adidas" />
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className="header__cards">
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>FREE SHIPPING</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>100% REFUND</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>SUPPORT 24/7</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
      </div>
      <div className="most__rated__header">
        <div className="most__rated__products__header">
          <h2 className='most__rated__title'>{t('MOST TOP RATED PRODUCTS')}</h2>
        </div>
        <div className="header__cards__most">
          {topRatedProducts.map(topProduct => (
            <div key={topProduct.id} className="header__card">
              <img className='card__img' style={{ width: '100px', height: '65px' }} src={topProduct.image} alt={topProduct.name} />
              <div className="rate__product">
              <h3 className='h3__header__card'>{topProduct.name}</h3>
              <p>${topProduct.price}</p>
              <div className="product__rating">
                <img src={Rate} alt="rate"  />
                <span>{topProduct.rating}</span>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
