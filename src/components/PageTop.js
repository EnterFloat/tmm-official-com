import { StaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Container,
  Card,
  Button,
} from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';
import '../assets/sass/_pagetop.scss';
import LogoText from '../assets/images/the-masculine-mentality.png';
import HeaderLogo from '../assets/images/index-header-logo.png';


const PageTop = class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {

    return (
      <>
      <div className="background-div">
        <div className="centered-div">
          <img className="logo" src={HeaderLogo}></img><br></br>
          <img className="logo-text" src={LogoText}></img>
        </div>
      </div>
      </>
    );
  }
};
export default PageTop;