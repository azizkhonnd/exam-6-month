import { AiOutlineUser } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import SiteLogo from './img/site-logo.svg'

const { Option } = Select;

const Nav = () => {
  const handleLanguageChange = (value) => {
    console.log('Selected language:', value);

  };

  return (
    <>

      <div className="container">
        <div className="nav">
          <Select
            defaultValue="UZ"
            style={{ width: 120 }}
            onChange={handleLanguageChange}
          >
            <Option value="UZ">Uzbek</Option>
            <Option value="EN">English</Option>
            <Option value="RU">Russian</Option>

          </Select>
          <div className="line"></div>
          <div className="nav__items">
            <div className="nav__item__profile">

              <Link className="profile__title" to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '6.32px' }}>
                <AiOutlineUser />
                My profile</Link>
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
    </>
  );
};


export default Nav;
