import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../assets/sass/_email_sub.scss';
import { StaticRouter as Router, Route } from 'react-router-dom';

export default class EmailPopup extends Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    var popupStatus = 'hidden';
    if (typeof localStorage != 'undefined') {
      var localPopupStatus = localStorage.getItem('popupStatus');

      if (localPopupStatus !== null) {
        popupStatus = localPopupStatus;
      }
    }
    var popupVisibility = '';
    var right = '';
    var toggleText = '';

    if (popupStatus === 'visible') {
      popupVisibility = 'visible';
      right = '0px';
      toggleText = '\u276F';
    } else if (popupStatus === 'hidden') {
      popupVisibility = 'hidden';
      right = '-220px';
      toggleText = '\u276E';
    } else if (popupStatus === 'closed') {
      popupVisibility = 'closed';
      right = '-320px';
      toggleText = '\u276E';
    }
    this.state = {
      popupVisibility: popupVisibility,
      right: right,
      toggleText: toggleText,
    };
  }

  toggleVisibility(popupStatus) {
    var toggleTo = '';
    if (popupStatus !== undefined) {
      toggleTo = popupStatus;
    }
    var current = this.state.popupVisibility;
    var right = '';
    var toggleText = '';
    var popupVisibility = '';
    if (toggleTo === '') {
      if (current === 'visible') {
        toggleTo = 'hidden';
      } else if (current === 'hidden') {
        toggleTo = 'visible';
      }
    }

    if (toggleTo === 'visible') {
      popupVisibility = 'visible';
      right = '0px';
      toggleText = '\u276F';
    } else if (toggleTo === 'hidden') {
      popupVisibility = 'hidden';
      right = '-220px';
      toggleText = '\u276E';
    } else if (toggleTo === 'closed') {
      popupVisibility = 'closed';
      right = '-320px';
      toggleText = this.state.toggleText;
    }
    this.setState({
      popupVisibility: popupVisibility,
      right: right,
      toggleText: toggleText,
    });
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('popupStatus', toggleTo);
    }
  }

  render() {
    return (
      <div className={'popup-container'} style={{ right: this.state.right }}>
        <p
          className="minimize-popup"
          onClick={() => this.toggleVisibility('closed')}
        >
          &#10005;
        </p>
        <p className="close-popup" onClick={() => this.toggleVisibility()}>
          {this.state.toggleText}
        </p>

        <div className="form-container">
          <Form
            name="Email Subscription"
            method="POST"
            data-netlify="true"
            action={'/thank-you'}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicHidden">
              <Form.Control
                type="hidden"
                name="form-name"
                value="Email Subscription"
              />
            </Form.Group>

            <Button
              className="subscribe-button"
              variant="primary"
              type="submit"
            >
              Subscribe to newsletter
            </Button>
          </Form>
          <Router>
            <Route path="/thank-you" exact component={Component.ThankYouPage} />
          </Router>
        </div>
      </div>
    );
  }
}
