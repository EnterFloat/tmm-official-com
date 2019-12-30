import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';

import config from '../../config';
import Footer from '../components/Footer';
import Header from '../components/Header';

import PageTop from '../components/PageTop';
import {Container} from 'react-bootstrap';

import { Link } from 'gatsby';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout paddingTop="0">
        <Header /> 
        <PageTop/>
        <Container style={{ paddingBottom: '60px' }}>
          <h2>Welcome</h2>
        </Container>
        <Footer />
      </Layout>
    );
  }
}
