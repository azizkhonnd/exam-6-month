/* eslint-disable react/prop-types */
import HeaderImg from './img/adidas-shoe.png'
import Shipping from './img/shipping.svg'
import { Link } from 'react-router-dom'
import './Header.scss'
const Header = () => {
  return (
    <>
      <div className="header__container">
        <div className='container'>
          <div className="container shop__item">
            <div className="header__title">
              <h1 className='sneakers__title'>Adidas Men Running
                Sneakers</h1>
              <p className='sneakers__subtitle'>
                Performance and design. Taken right to the edge.
              </p>
              <Link className='shop__now__link' to="/">SHOP NOW</Link>
              <div className="shop__now__line"></div>
            </div>
            <div className='hero__img'>
              <img className='hero__img' src={HeaderImg} alt="adidas" />
            </div>
          </div>
        </div>
      </div>
      <div className=' container'>
        <div className="header__cards">
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>
              FREE SHIPPING
            </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>
              100% REFUND
            </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>
              SUPPORT 24/7
            </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>
      <div className="most__rated__header">
        <div className="most__rated__products__header">
          <h2 className='most__rated__title'>Most Top Rated Products</h2>
        </div>
        <div className="header__cards__most">
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>
              FREE SHIPPING
            </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>
              100% REFUND
            </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div className="header__card">
            <img className='card__img' style={{ width: '100px', height: '65px' }} src={Shipping} alt="shipping" />
            <h3 className='h3__header__card'>
              SUPPORT 24/7
            </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
