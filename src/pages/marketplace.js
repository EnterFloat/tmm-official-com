import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Scroll from '../components/Scroll';
import config from '../../config';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Marketplace from '../components/Marketplace';

import axios from 'axios'

import { Link } from 'gatsby';
import { isAuthenticated, getProfile } from "../utils/auth"

export default class MarketplacePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Header/>
        <Marketplace/>
        <Footer />
    </Layout>
    );
  }
}
