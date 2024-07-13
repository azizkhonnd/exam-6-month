
import { useTranslation } from 'react-i18next'

import './Footer.scss'

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer__container">
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
    </div>
  )
}

export default Footer