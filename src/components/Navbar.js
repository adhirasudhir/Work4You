import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { FaShoppingCart, FaSun, FaMoon } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Badge, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import { CartState } from '../reducer/Context';
import './styles.css'; // Ensure your CSS file is imported
import image from '../image/work4youlogo.png';
import image2 from '../Imagesmall/maidimage.jpg';
import Popuplogin from './Popuplogin';

const Navbar = () => {
  const {
    state: { cart },
    dispatch
  } = CartState();

  const { state } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('light'); // Initially set to light theme

  useEffect(() => {
    const userHome = async () => {
      try {
        const res = await fetch('/getdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        console.log(data);
        setUserName(data.name);
      } catch (err) {
        console.log(err);
      }
    };

    // Function to initialize Google Translate widget
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    }

    userHome();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme + '-theme';
  };

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <form className="d-flex mr-5" style={{ marginRight: '3rem' }}>
            <NavDropdown title={userName.toUpperCase()} variant="text-warning" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">
                <Link className="dropdown-item" to="/about">
                  Profile
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="/">
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </form>
        </>
      );
    } else {
      return (
        <>
          <form className="d-flex">
            <Link className="btn btn-outline-warning mx-1" to="/register">
              REGISTER
            </Link>
            <Link className="btn btn-outline-warning mx-1" to="/login">
              LOGIN
            </Link>
          </form>
        </>
      );
    }
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'} nav2`}
        style={{ position: 'fixed', top: '0', width: '100%', zIndex: '9999', fontFamily: 'Poppins' }}>
        <div className="container-fluid">
          <Popuplogin />
          <button
            className={`navbar-toggler ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="google_translate_element"></div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/" className="margin2">
              <img src={image} alt="error" />
            </Link>

            <ul className="navbar-nav mx-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active hover-underline-animation margin1 w3-animate-top" aria-current="page" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active hover-underline-animation margin w3-animate-top" to="/aboutus">
                  ABOUT US
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active hover-underline-animation margin w3-animate-top" to="/homemaid">
                  HOME SERVICE
                </Link>
              </li>
              <li className="nav-item w3-animate-top">
                <Link className="nav-link active hover-underline-animation margin" to="/book">
                  BOOK SERVICE
                </Link>
              </li>
              <li className="nav-item dropdown margin w3-animate-top">
                <Link className="nav-link" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  APPLY FOR JOB
                </Link>
                <ul className="dropdown center animated2 animatedFadeInUp2 fadeInUp2" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item zoom" to="/contact">
                      Professionals
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item zoom" to="/locals">
                      Locals
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown hover-underline-animation margin white w3-animate-top">
                <Link className="nav-link" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  SUPPORT
                </Link>
                <ul className="dropdown center animated2 animatedFadeInUp2 fadeInUp2" aria-labelledby="navbarDropdown" style={{ background: '#c5c3c3' }}>
                  <li>
                    <Link className="dropdown-item zoom" to="/contactus">
                      CONTACT US
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item zoom" to="/touch">
                      FEEDBACK
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <form className="d-flex">
            <Button
             className={`toggle ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
              variant="transparent"
             onClick={toggleTheme}
           style={{ marginRight: '1rem' }}
>
  {theme === 'dark' ? <FaSun color="#ffffff" /> : <FaMoon color="#000000" />}
</Button>


              <Dropdown alignRight>
                <Dropdown.Toggle variant="btn btn-primary mr-5" style={{ width: '7rem', marginRight: '1rem' }}>
                  <FaShoppingCart color="white" fontSize="25px" />
                  <Badge>{cart.length}</Badge>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: 370 }}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((prod) => (
                        <div className={`d-flex mt-2 card-${theme}`} key={prod.id}>
                          <div className="mx-4">
                            <img src={image2} className="card-img-small2 mt-2" alt={prod.name} />
                          </div>

                          <div className="cartItemDetail" style={{ marginLeft: '-2rem' }}>
                            <ul>
                              <li>Name: {prod.name}</li>
                              <li>Service: {prod.service}</li>
                              <li>Price:₹ {prod.price}</li>
                            </ul>
                          </div>
                          <AiFillDelete
                            className="mx-5 mt-4"
                            fontSize="20px"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              dispatch({
                                type: 'REMOVE_FROM_CART',
                                payload: prod
                              })
                            }
                          />
                        </div>
                      ))}
                      <hr />
                      <Link to="/cart">
                        <Button style={{ width: '95%', margin: '0 10px' }}>Go To Cart</Button>
                      </Link>
                    </>
                  ) : (
                    <span style={{ padding: 10 }}>Cart is Empty!</span>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <RenderMenu />
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
