import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import '../assets/sass/_email_sub.scss';


export default class EmailPopup extends Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    var popupStatus = "visible"
    if (typeof localStorage != "undefined") {
      var localPopupStatus = localStorage.getItem('popupStatus')
      if (typeof localPopupStatus != null) {
        popupStatus = localStorage.getItem('popupStatus')
      }
      console.log("popupStatus from constructor " + popupStatus)
    }
    var popupVisibility = ""
    var right = ""
    var toggleText = ""
    console.log(popupStatus)

    if (popupStatus != "" ){
      if (popupStatus == "visible") {
        popupVisibility = "visible"
        right = "0px"
        toggleText = '\u276F'
      } else if (popupStatus == "hidden") {
        popupVisibility = "hidden"
        right = "-220px"
        toggleText = '\u276E'
      }
    }
    this.state = {
      popupVisibility: popupVisibility,
      right: right,
      toggleText: toggleText
    }
  }

  componentDidMount() {
    const popupStatus = localStorage.getItem('popupStatus')
    console.log("loading popupStatus to " + popupStatus)
    this.setState({popupVisibility: popupStatus})
    this.toggleVisibility(popupStatus)
  }
  componentWillUnmount() {
    console.log("Set popupStatus to " + this.state.popupVisibility)
    
  }

  toggleVisibility(popupStatus) {
    var toggleTo = ""
    if (popupStatus !== undefined) {
      toggleTo = popupStatus
    }
    var current = this.state.popupVisibility
    var right = ""
    var toggleText = ""
    var popupVisibility = ""
    if (toggleTo == "") {
      if (current == "visible") {
        toggleTo = "hidden"
      } else if (current == "hidden") {
        toggleTo = "visible"
      }
    }
    console.log("toggleTo " + toggleTo)

    if (toggleTo == "visible") {
      popupVisibility = "visible"
      right = "0px"
      toggleText = '\u276F'
    } else if (toggleTo == "hidden") {
      popupVisibility = "hidden"
      right = "-220px"
      toggleText = '\u276E'
    }
    console.log(popupVisibility)
    this.setState({
      popupVisibility: popupVisibility,
      right: right,
      toggleText: toggleText
    })
    if (typeof localStorage != "undefined") {
      localStorage.setItem("popupStatus", toggleTo)
    }

    // console.log(this.state.popupVisibility)
    // if (this.state.popupVisibility == "visible") {
    //   this.setState({
    //     popupVisibility: "hidden",
    //     right: "-220px",
    //     toggleText: '\u276E'
    //   })
    // }
    // else {
    //   this.setState({
    //     popupVisibility: "visible",
    //     right: "0px",
    //     toggleText: '\u276F'
    //   })
    // }
    
  }
  
  render() {
    // xs={{ span: 8, offset: 4 }}
    //       sm={{ span: 7, offset: 5 }}
    //       md={{ span: 6, offset: 6 }}
    //       lg={{ span: 4, offset: 8 }}
    //       xl={{ span: 4, offset: 8 }}

    return (
      <div className={'popup-container'} style={{right: this.state.right}}>
        {/* <div style={{transform: this.state.transform}}> */}
      {/* <Row>
        <Col
          id={'Col1'}
          
          className="popup-col"
        > */}
        
        <p className="close-popup"
        onClick={() => this.toggleVisibility()}>{this.state.toggleText}
        </p>

          <Form className="form-container" name="Email subscription" method="POST" data-netlify="true" action="/thank-you">
            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              {/* <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Button className="subscribe-button" variant="primary" type="submit">
              Subscribe to newsletter
            </Button>
            </Form>
        {/* </Col>
      </Row> */}
      {/* </div> */}
    </div>
    );
  }
}
