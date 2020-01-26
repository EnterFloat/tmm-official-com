import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../assets/sass/_dialog.scss';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: this.props.visibility,
      title: this.props.title,
      message: this.props.message,
    };
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {    
    this.setState({
      visibility: nextProps.visibility,
      title: nextProps.title,
      message: nextProps.message,
    });
  }

  closeDialog() {    
    this.props.setState({ dialogVisibility: 'hidden' });
    this.setState({
      visibility: 'hidden',
    });
  }

  render() {
    return (
      <>
        <div
          className={'fullscreen-shade'}
          style={{ visibility: `${this.state.visibility}` }}
          onClick={this.closeDialog}
        ></div>
        <div
          className={'dialog-container'}
          style={{ visibility: `${this.state.visibility}` }}
        >
          <div className={'close-dialog'} onClick={this.closeDialog}>
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
  visibility: 'hidden',
  title: 'Title',
  message: 'Message',
};
