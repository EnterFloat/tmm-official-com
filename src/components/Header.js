import React, { Component } from 'react';
import Scroll from './Scroll';
import config from '../../config';
import { Link } from 'gatsby'
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"


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

    const buttonStyle = {
      cursor:'pointer'
    }
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-light fixed-top ${visibilityClass}`}
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="#page-top">
            {config.siteTitle}
          </a>
          <button
            onClick={_ => this.toggleMenu(!openMenu)}
            className={`navbar-toggler navbar-toggler-right ${
              openMenu ? '' : 'collapsed'
            }`}
            type="button"
            aria-controls="navbarResponsive"
            aria-expanded={openMenu}
            aria-label="Toggle navigation"
            style={buttonStyle}
                      >
            Menu {" "}
            <i className="fas fa-bars"></i>
          </button>
          <div
            className={`collapse navbar-collapse ${openMenu ? 'show' : ''}`}
            id="navbarResponsive"
          >
            <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
                <Scroll
                  onClick={_ => this.toggleMenu(!openMenu)}
                  type="id"
                  element="home"
                >
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </Scroll>
              </li> */}
              <li className="nav-item">
                <Scroll
                  onClick={_ => this.toggleMenu(!openMenu)}
                  type="id"
                  element="marketplace"
                >
                  <a className="nav-link" href="/marketplace">
                    Marketplace
                  </a>
                </Scroll>
              </li>
              <li className="nav-item">
                <Scroll
                  onClick={_ => this.toggleMenu(!openMenu)}
                  type="id"
                  element="maskuline-society"
                >
                  <a className="nav-link" href="/maskuline-society">
                    Maskuline Society
                  </a>
                </Scroll>
              </li>
              <li className="nav-item">
                <Scroll
                  onClick={_ => this.toggleMenu(!openMenu)}
                  type="id"
                  element="faq"
                >
                  <a className="nav-link" href="/faq">
                    FAQ
                  </a>
                </Scroll>
              </li>
              <li className="nav-item">
                <Scroll
                  onClick={_ => this.toggleMenu(!openMenu)}
                  type="id"
                  element="about-me"
                >
                  <a className="nav-link" href="/about-me">
                    About
                  </a>
                </Scroll>
              </li>
              <li className="nav-item">
                <LoginLogout />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const LoginLogout = () => {
  
  if (!isAuthenticated()) {
    return <Link className="nav-link" to="#logout" onClick={e => {
      login()
    }
    }>
      Login
    </Link>
  } else {
    return <Link to="" className="nav-link" onClick={e => {
      logout()
      e.preventDefault()
    }}>
      Logout
  </Link>
  }
}