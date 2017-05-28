import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import FlatButton from 'material-ui/FlatButton';

import { updatePassword } from '../actions';

class EditPassword extends Component{
  constructor(props){
    super(props)
    this.state={
      url: '',
      username: '',
      password: '',
      disabled: false
    }
  }
  
  componentDidMount(){
    this.setState({
      url: this.props.data.url,
      username: this.props.data.username,
      password: this.props.data.password
    })
  }
  
  handleClose(){
    this.props.close()
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
    } else {
      this.setState({
        disabled: true
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
    this.props.updatePassword(this.props.data, {
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
        disabled={this.state.disabled}
        onTouchTap={()=>{this.submit()}}
      />,
    ];
    return(
      <Dialog
        title="Add New Password"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={()=>{this.handleClose()}}
      >
        <TextField
          hintText="Insert URL"
          floatingLabelText="URL"
          type="url"
          value={this.state.url}
          onChange={(e)=>{this.handleURL(e)}}
        /><br/>
        <TextField
          hintText="Insert username"
          floatingLabelText="Username"
          value={this.state.username}
          onChange={(e)=>{this.handleUsername(e)}}
        /><br/>
        <TextField
          hintText="Insert password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={(e)=>{this.handlePassword(e)}}
        />
        {this.passwordStrength()}
      </Dialog>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    updatePassword: (data, newData) => {
      return dispatch(updatePassword(data, newData))
    }
  })
}

export default connect(null, mapDispatchToProps)(EditPassword)