import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { createPassword } from '../actions'

class AddPassword extends Component {
  constructor(props){
    super(props)
    this.state={
      open: false,
      url: '',
      username: '',
      password: ''
    }
  }
  
  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };
  
  handleURL(e){
    this.setState({
      url: e.target.value
    })
  }
  
  handleUsername(e){
    this.setState({
      username: e.target.value
    })
  }
  
  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  
  submit(){
    this.handleClose()
    this.props.createPassword({
      url: this.state.url,
      username: this.state.username,
      password: this.state.password
    })
  }
  
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>{this.handleClose()}}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={()=>{this.submit()}}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Add Password" onTouchTap={()=>{this.handleOpen()}} />
        <Dialog
          title="Add New Password"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={()=>{this.handleClose()}}
        >
          <TextField
            hintText="Insert URL"
            floatingLabelText="URL"
            type="url"
            onChange={(e)=>{this.handleURL(e)}}
          /><br/>
          <TextField
            hintText="Insert username"
            floatingLabelText="Username"
            onChange={(e)=>{this.handleUsername(e)}}
          /><br/>
          <TextField
            hintText="Insert password"
            floatingLabelText="Password"
            type="password"
            onChange={(e)=>{this.handlePassword(e)}}
          />
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createPassword: (data) => {
      return dispatch(createPassword(data))
    }
  })
}

export default connect(null, mapDispatchToProps)(AddPassword)