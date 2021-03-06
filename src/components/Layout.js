import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import CookieConsent from 'react-cookie-consent';
import '../assets/sass/_layout.scss';

import '../assets/sass/tmm.scss';
import EmailPopup from './EmailPopup';

class Layout extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = this.props.BGColor;
    document.body.style.height = '100%';
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
          <div
            className={'page-top'}
            style={{
              backgroundColor: this.props.BGColor,
              paddingTop: this.props.paddingTop + 'px',
            }}
          >
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Grayscale' },
                { name: 'keywords', content: 'site, web' },
              ]}
            >
              <html lang="da" />
            </Helmet>
            <EmailPopup />
            {children}
            <CookieConsent
              location="bottom"
              buttonText="Accept"
              cookieName="myAwesomeCookieName2"
              style={{ background: '#2B373B', zIndex: 1000001, opacity: 0.8 }}
              buttonStyle={{ color: '#4e503b' }}
              enableDeclineButton
              expires={150}
            >
              This website uses cookies to enhance the user experience.{' '}              
            </CookieConsent>
          </div>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  BGColor: '#F3F3F3',
  paddingTop: '100',
};

export default Layout;
