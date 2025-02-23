import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartLogo from '../../routes/home/img/cart-shopping.svg';
import Rate from '../../routes/home/img/rate.svg';
import { CartContext } from '../../context/provider/CartContext';
import { useTranslation } from 'react-i18next';
import Heart from '../../routes/home/img/heart-button-svg.svg'
import './SingleProduct.scss';

const ProductDetail = () => {
    const { addToCart } = useContext(CartContext);
    const { t } = useTranslation();
    const [product, setProduct] = useState(null);
    const [topRatedProducts, setTopRatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://backend-e-commerce-production.up.railway.app/api/v1/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchTopRatedProducts = async () => {
            try {
                const response = await axios.get('https://backend-e-commerce-production.up.railway.app/api/v1/products');
                const filteredProducts = response.data.filter(product => product.rating >= 4); // Adjust the condition as per your rating system
                setTopRatedProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching top-rated products:', error);
            }
        };

        fetchProduct();
        fetchTopRatedProducts();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className='container product__detail'>
            <div className="product__container">
                <img src={product.image} alt={product.name} className='product__image_single' />
                <div className="single__product__items">
                    <h2 className='product__name__single'>{product.name}</h2>
                    <div className="rating__desc__single__product">
                        <img src={Rate} alt="rate" />
                        <p className='review__title'>{t('0 reviews')}</p>
                        <a className='submit__link__single' href="#">{t('Submit a review')}</a>
                    </div>
                    <div className="product__title__price__single">
                        <p className='product__price'>${product.price}</p>
                        <p className='product__sale'>$534.33</p>
                        <p className='product__sale__percent'>24% Off</p>
                    </div>
                    <div className='single__product__desc__item'>
                        <div className='single__item'>
                            <span className='single__product__desc__items'>{t('Availability')}</span>
                            <span className='single__product__desc__items'>{t('Category')}:</span>
                        </div>
                        <div className='single__item'>
                            <span className='single__product__desc__items'>{t('In stock')}: 10</span>
                            <span className='single__product__desc__items'>{t('Accessories')}</span>
                        </div>
                    </div>
                    <p className='single__ship'>
                        {t('Free shipping')}
                    </p>
                    <div className="single__product__btns">
                        <div className='single__btns'>
                            <button className='decrease' onClick={decreaseQuantity}>-</button>
                            <p>{quantity}</p>
                            <button className='increase' onClick={increaseQuantity}>+</button>
                        </div>
                        <button
                            onClick={() => addToCart({ ...product, quantity })}
                            className='cart__button__single'
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        >
                            <img style={{ width: '22px' }} src={CartLogo} alt="cart" />
                            {t('Add to Cart')}
                        </button>
                    </div>
                </div>
            </div>
            <div className="single__product__description">
                <h3 className='description__title'>{t('Product Information')}</h3>
                <div className='single_product__line'></div>
                <div className="desc__subtitles">
                    <p className='description__text'>{t(product.description)}</p>
                </div>
            </div>
            <div className="single__product__reviews">
                <h2 className='rate__products'>{t('MOST TOP RATED PRODUCTS')}</h2>
                <div className='product__list'>
                    {topRatedProducts.map(topProduct => (
                        <div key={topProduct.id} className='product__item'>
                            <img src={topProduct.image} alt={topProduct.name} className='product__image' />
                            <h2 className='product__name'>{topProduct.name}</h2>
                            <div className="product__title__price">
                                <p className='product__price'>${topProduct.price}</p>
                                <p className='product__sale'>$534.33</p>
                                <p className='product__sale__percent'>24% Off</p>
                            </div>
                            <img src={Rate} alt="rate" />
                            <div className="product__get__buttons">
                                <button
                                    onClick={() => addToCart(topProduct)}
                                    className='cart__button'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <img className="heart__img" style={{ width: '22px' }} src={CartLogo} alt="cart" />
                                </button>
                                <button
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    className='cart__button__favorite'
                                >
                                    <img className="heart__img" style={{ width: '40px' }} src={Heart} alt="heart" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
