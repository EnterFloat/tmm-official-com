import React, { Component } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import '../assets/sass/_dialog.scss';
import { StaticRouter as Router, Route } from 'react-router-dom';


export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visibility: this.props.visibility,
        title: this.props.title,
        message: this.props.message,
    }
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      console.log("componentWillReceiveProps")
      console.log({
        visibility: nextProps.visibility,
        title: nextProps.title,
        message: nextProps.message,
    })
    this.setState({
        visibility: nextProps.visibility,
        title: nextProps.title,
        message: nextProps.message,
    })
  }

  closeDialog() {
    console.log("close")
    console.log(this.props.parentState)
    this.props.setState({dialogVisibility: "hidden"})
    this.setState({
        visibility: "hidden",
    })
    console.log(this.props.parentState)
  }

  
  render() {
    return (
        <>
        <div className={"fullscreen-shade"} style={{visibility: `${ this.state.visibility }`}} onClick={this.closeDialog}></div>
        <div className={"dialog-container"} style={{visibility: `${ this.state.visibility }`}}>
            <div className={"close-dialog"} onClick={this.closeDialog}>
                <p onClick={this.closeDialog}>&#10005;</p>
            </div>
            <Card>
                <Card.Header>
                    <Card.Title>{this.props.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{this.props.message}</Card.Text>
                </Card.Body>
            </Card>
        </div>
        </>
    );
  }
}
Dialog.defaultProps = {
    visibility: "hidden",
    title: "Title",
    message: "Message",
  };