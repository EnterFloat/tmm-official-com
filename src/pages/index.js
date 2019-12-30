import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';

import config from '../../config';
import Footer from '../components/Footer';
import Header from '../components/Header';

import PageTop from '../components/PageTop';
import {Container} from 'react-bootstrap';
import '../assets/sass/_pagetop.scss';

import { Link } from 'gatsby';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout paddingTop="0">
        <Header animation="animated-header" /> 
        <PageTop/>
        <Container style={{ paddingBottom: '60px' }}>
        </Container>
        <Footer />
      </Layout>
    );
  }
}
