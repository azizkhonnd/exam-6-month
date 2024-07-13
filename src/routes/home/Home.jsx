import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Home.scss';
import HeartLogo from './img/heart-button-svg.svg';
import CartLogo from './img/cart-shopping.svg';
import Rate from './img/rate.svg';
import { CartContext } from '../../context/provider/CartContext';
import ProductDetail from '../../pages/singlePage/SingleProduct';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setSelectedProduct(product);
  };

  return (
    <>
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} />
      ) : (
        <div className='home__container'>
          <h1 className='home__title'>ALL PRODUCTS</h1>
          <div className='product__list'>
            {products.map((product) => (
              <div key={product.id} className='product__item' onClick={() => handleProductClick(product)}>
                <img src={product.image} alt={product.name} className='product__image' />
                <h2 className='product__name'>{product.name}</h2>
                <div className="product__title__price">
                  <p className='product__price'>${product.price}</p>
                  <p className='product__sale'>$534,33</p>
                  <p className='product__sale__percent'>24% Off</p>
                </div>
                <img src={Rate} alt="rate" />
                <div className="product__get__buttons">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
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
      )}
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

export default Home;
