import React from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';
import Product from '../components/Product';

// import ProductPage from '../components/ProductPage'

const ProductPage = ({ pageContext: { id, data } }) => {
  return (
    <Layout paddingTop="56">
      <Header />
      <Product id={id} />
      <Footer />
    </Layout>
  );
};

export default ProductPage;
