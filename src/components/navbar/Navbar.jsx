import { AiOutlineUser } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.scss';
import SiteLogo from './img/site-logo.svg';

const { Option } = Select;

const Nav = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="container">
      <div className="nav">
        <Select
          defaultValue="en"
          style={{ width: 120 }}
          onChange={handleLanguageChange}
        >
          <Option value="uz">Uzbek</Option>
          <Option value="en">English</Option>
          <Option value="ru">Russian</Option>
        </Select>
        <div className="line"></div>
        <div className="nav__items">
          <div className="nav__item__profile">
            <Link className="profile__title" to="/auth/login" style={{ display: 'flex', alignItems: 'center', gap: '6.32px' }}>
              <AiOutlineUser />
              {t('Profile')}
            </Link>
          </div>
          <div className="nav__wrapper">
            <a className="site__link" href="/">
              <img src={SiteLogo} alt="site logo" />
              E-Comm
            </a>
          </div>
          <Link to="/auth/cart">
            <GrCart color="#000" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
