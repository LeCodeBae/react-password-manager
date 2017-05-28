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
      password: '',
      disabled: true
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
  
  handleDisabled(password){
    if(
      /[A-Z]/g.test(password) &&
      /[a-z]/g.test(password) &&
      /[\W]/g.test(password) &&
      /[\d]/g.test(password) &&
      password.length >= 5
    ){
      this.setState({
        disabled: false
      })
    }
  }
  
  handlePassword(e){
    this.setState({
      password: e.target.value
    })
    this.handleDisabled(e.target.value)
  }
  
  submit(){
    this.handleClose()
    this.props.createPassword({
      url: this.state.url,
      username: this.state.username,
      password: this.state.password
    })
  }
  
  passwordUpperCase(){
    if(/[A-Z]/g.test(this.state.password) === false){
      return (
        <p style={{color: '#F44336'}}>password must at least contain one uppercase letter</p>
      )
    }
  }
  
  passwordLowerCase(){
    if(/[a-z]/g.test(this.state.password) === false){
      return (
        <p style={{color: '#F44336'}}>password must at least contain one lowercase letter</p>
      )
    }
  }
  
  passwordSpecial(){
    if(/[\W]/g.test(this.state.password) === false){
      return (
        <p style={{color: '#F44336'}}>password must at least contain one symbol character</p>
      )
    }
  }
  
  passwordNumber(){
    if(/[\d]/g.test(this.state.password) === false){
      return (
        <p style={{color: '#F44336'}}>password must at least contain one numeral character</p>
      )
    }
  }
  
  passwordLength(){
    if(this.state.password.length < 5){
      return (
        <p style={{color: '#F44336'}}>password must be at least 5 characters length </p>
      )
    }
  }
  
  passwordStrength(){
    if(this.state.password === '' || this.state.password === null || this.state.password === undefined){
      return(
        <div/>
      )
    } else {
      return(
        <div>
        {this.passwordUpperCase()}
        {this.passwordLowerCase()}
        {this.passwordSpecial()}
        {this.passwordNumber()}
        {this.passwordLength()}
        </div>
      )
    }
  }
  
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={()=>{this.handleClose()}}
      />,
      <FlatButton
        label="Submit"
        keyboardFocused={true}
        onTouchTap={()=>{this.submit()}}
        disabled={this.state.disabled}
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
            onChange={(e)=>{this.handlePassword(e)}}
          />
          {this.passwordStrength()}
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