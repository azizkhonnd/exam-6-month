import { useContext, useState } from 'react';
import { CartContext } from '../../context/provider/CartContext';
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  const [itemQuantities, setItemQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const increaseQuantity = (itemId) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1
    }));
  };

  const decreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 1) {
      setItemQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1
      }));
    }
  };

  const productName = cartItems.length > 0 ? cartItems[0].name : 'Default Product Name';

  return (
    <>

      <div className='container cart__wrapper'>
        <div className="cart__route" style={{ textAlign: 'center' }}>
          <Link className='navigate__link__cart' to='/'>Home/</Link>
          <Link className='navigate__link__cart' to='/auth'>Hot Deal/</Link>
          <span>{productName}</span>
        </div>
        <div className="cart-items">
          <div className='table__item'>
            <div className="header">PRODUCT</div>
            <div className="product__control__price">
              <div className="header">PRICE</div>
              <div className="header">QTY</div>
              <div className="header">UNIT PRICE</div>
            </div>
          </div>
          {cartItems.map((item, index) => {
            const price = parseFloat(item.price);
            const quantity = itemQuantities[item.id] || 0;

            return (
              <div key={`${item.id}-${index}`} className='table__item'>
                <div className="product">
                  <img src={item.image} alt={item.name} className='product__image__cart' />
                  <span className='product__price__table'>{item.name}</span>
                </div>
                <div className="table__item__product">
                  <div className="price">${price.toFixed(2)}</div>
                  <div className="quantity__controls">
                    <button className='decrease' onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{quantity}</span>
                    <button className='increase' onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <div className="total">${(price * quantity).toFixed(2)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart__total">
          <div className="cart__total__title">Total<div className="cart__total__price">${cartItems.reduce((acc, item) => acc + parseFloat(item.price) * itemQuantities[item.id], 0).toFixed(2)}</div></div>
          <p className='subtotal__cart'>
            Subtotal: <span>${cartItems.reduce((acc, item) => acc + parseFloat(item.price) * itemQuantities[item.id], 0).toFixed(2)}</span>
          </p>
          <p className='cart___coupon'>
            Coupon <p>No</p>
          </p>

          <Link className='navigate__link__cart__btn' to='/'>Checkout</Link>
        </div>

      </div>
      <section className='footer'>
        <div className="container">
          <ul>
            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever. Since the 1500s, when an unknown printer.</li>
            <li>Since the 1500s, when an unknown printer took a galley of type and scrambled.</li>
            <li>E-Comm , 4578 Marmora Road, Glasgow D04 89GR</li>
          </ul>
          <div className='social'>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'><img src='https://img.icons8.com/color/48/000000/facebook-f.png' alt='Facebook' /></a>
            <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'><img src='https://img.icons8.com/color/48/000000/instagram-new.png' alt='Instagram' /></a>
          </div>
        </div>
        <p>© 2022 E-Commerce. All rights reserved.</p>
      </section>
    </>
  );
};

export default Cart;
