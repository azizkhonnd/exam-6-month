/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { CartContext } from '../../context/provider/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Cart.scss';
import RemoveIcon from './img/delete-img.svg';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { t } = useTranslation();

  const initialQuantities = cartItems.reduce((acc, item) => {
    acc[item.id] = 1;
    return acc;
  }, {});
  const [itemQuantities, setItemQuantities] = useState(initialQuantities);

  const handleIncreaseQuantity = (itemId) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 1) {
      setItemQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1
      }));
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    setItemQuantities(prevQuantities => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId];
      return updatedQuantities;
    });
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * itemQuantities[item.id], 0).toFixed(2);
  const productName = cartItems.length > 0 ? cartItems[0].name : t('Default Product Name');

  return (
    <div className="container cart__wrapper">
      <Breadcrumb productName={productName} />
      <CartItems
        cartItems={cartItems}
        itemQuantities={itemQuantities}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <CartSummary totalAmount={totalAmount} />
    </div>
  );
};

const Breadcrumb = ({ productName }) => {
  const { t } = useTranslation();

  return (
    <div className="cart__route" style={{ textAlign: 'center' }}>
      <Link className="navigate__link__cart" to="/">{t('Home')}/</Link>
      <Link className="navigate__link__cart" to="/">{t('Hot Deal')}/</Link>
      <span>{productName}</span>
    </div>
  );
};

const CartItems = ({ cartItems, itemQuantities, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }) => {
  const { t } = useTranslation();

  return (
    <div className="cart-items">
      <CartItemsHeader />
      {cartItems.map((item, index) => {
        const price = parseFloat(item.price);
        const quantity = itemQuantities[item.id] || 0;

        return (
          <div key={`${item.id}-${index}`} className="table__item">
            <button className="removeBtn" onClick={() => onRemoveItem(item.id)}>
              <img src={RemoveIcon} alt="remove" />
            </button>
            <div className="product">
              <img src={item.image} alt={item.name} className="product__image__cart" />
              <span className="product__price__table">{item.name}</span>
            </div>
            <div className="table__item__product">
              <div className="price">${price.toFixed(2)}</div>
              <QuantityControls
                quantity={quantity}
                onIncrease={() => onIncreaseQuantity(item.id)}
                onDecrease={() => onDecreaseQuantity(item.id)}
              />
              <div className="total">${(price * quantity).toFixed(2)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CartItemsHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="table__item">
      <div className="header">{t('PRODUCT')}</div>
      <div className="product__control__price">
        <div className="header">{t('PRICE')}</div>
        <div className="header">{t('QTY')}</div>
        <div className="header">{t('UNIT PRICE')}</div>
      </div>
    </div>
  );
};

const QuantityControls = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="quantity__controls">
      <button className="decrease" onClick={onDecrease}>-</button>
      <span>{quantity}</span>
      <button className="increase" onClick={onIncrease}>+</button>
    </div>
  );
};

const CartSummary = ({ totalAmount }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="cart__total">
        <div className="cart__total__title">
          {t('Total')}
          <div className="cart__total__price">${totalAmount}</div>
        </div>
        <p className="subtotal__cart">
          {t('Subtotal')}: <span>${totalAmount}</span>
        </p>
        <p className="cart___coupon">
          {t('Coupon')} <span>{t('No')}</span>
        </p>
        <Link className="navigate__link__cart__btn" to="/">{t('Checkout')}</Link>
      </div>
    </div>
  );
};

export default Cart;
