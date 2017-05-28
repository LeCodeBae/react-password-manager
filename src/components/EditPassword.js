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
      password: ''
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
  
  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  
  submit(){
    this.handleClose()
    this.props.updatePassword(this.props.data, {
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