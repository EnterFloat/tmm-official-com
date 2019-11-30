import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Container, Row, Col, Card } from 'react-bootstrap';


import '../assets/sass/grayscale.scss';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.body.style.backgroundColor = this.props.BGColor
    document.body.style.marginTop = this.props.marginTop + "px"
  }
  render() {
    const { children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Grayscale' },
                { name: 'keywords', content: 'site, web' },
              ]}
            >
              <html lang="da" />
            </Helmet>
            <div className={'page-top'} style={{backgroundColor: this.props.BGColor}}>
              {children}
            </div>
            <CookieConsent
              location="bottom"
              buttonText="Accept"
              cookieName="myAwesomeCookieName2"
              style={{ background: "#2B373B", zIndex: 1000001, opacity: 0.8 }}
              buttonStyle={{ color: "#4e503b" }}
              enableDeclineButton
              expires={150}
          >
              This website uses cookies to enhance the user experience.{" "}
              {/* <span style={{ fontSize: "10px" }}>
              This bit of text is smaller :O
              </span> */}
          </CookieConsent>
            
          </>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
