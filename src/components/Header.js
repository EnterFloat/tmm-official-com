import React, { Component } from 'react';
import { Link } from 'gatsby';
import { login, logout, isAuthenticated } from '../utils/auth';
import { StaticRouter as Router, Route } from 'react-router-dom';
import logo from '../assets/images/TMM_logo_circle_512.png';

import { Navbar, Nav } from 'react-bootstrap';
import '../assets/sass/_header.scss';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      visibilityClass: '',
    };
  }
  toggleMenu = value => {
    this.setState({ openMenu: value });
  };
  handleScroll = () => {
    const { visibilityClass } = this.state;
    if (window.pageYOffset > 300) {
      if (visibilityClass !== 'navbar-shrink') {
        this.setState({ visibilityClass: 'navbar-shrink' });
      }
    } else {
      if (visibilityClass === 'navbar-shrink') {
        this.setState({ visibilityClass: '' });
      }
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { openMenu, visibilityClass } = this.state;
    const { data } = this.props;

    return (
      <div>
        <Navbar key="Navbar" expand="lg" fixed="top" className={`${this.props.animation} navbar-style`}>
          <div
            className="container-fluid"
            style={{ padding: '0px', margin: '0px' }}
          >
            <Link
              to={''}
              className={'nav-link navbar-right'}
              activeClassName={'active'}
              style={{ padding: '4px' }}
            >
              <img
                style={{ maxHeight: '48px', width: 'auto' }}
                src={logo}
              ></img>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="justify-content-end" style={{ padding: '0px' }}>
                <NavElement text={'Marketplace'} to={'/marketplace'} />
                <NavElement
                  text={'Masculine Society'}
                  to={'/masculine-society'}
                />
                <NavElement text={'FAQ'} to={'/faq'} />
                <NavElement text={'About'} to={'/about'} />
                <LoginLogout />
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        <div>
          <Router>
            <Route path="/" exact component={Component.IndexPage} />
            <Route
              path="/marketplace"
              strict
              component={Component.Marketplace}
            />
            <Route
              path="/masculine-society"
              exact
              component={Component.MasculineSociety}
            />
            <Route path="/faq" exact component={Component.Faq} />
            <Route path="/about" exact component={Component.About} />
            <Route path="/stripe-callback-success" component={Component.StripeSuccess} />
            <Route path="/thank-you" component={Component.ThankYouPage} />

            
            <Route component={Component.ErrorPage} />
          </Router>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  animation: '',
};

const LoginLogout = () => {
  if (!isAuthenticated()) {
    return (
      <Link
        className={'navbar-right nav-text'}
        onClick={e => {
          login();
        }}
      >
        Login
      </Link>
    );
  } else {
    return (
      <Link
        className={'navbar-right nav-text'}
        onClick={e => {
          logout();
          e.preventDefault();
        }}
      >
        Logout
      </Link>
    );
  }
};

function NavElement(props) {
  return (
    <Link
      to={props.to}
      partiallyActive={true}
      className={'navbar-right nav-text'}
      activeClassName={'active'}
    >
      {props.text}
    </Link>
  );
}




// <Link
//         to="/login"
//         partiallyActive={true}
//         className={'navbar-right nav-text'}
//         activeClassName={'active'}
//         onClick={e => {
//           login();
//         }}
//       >
//         Login
//       </Link>