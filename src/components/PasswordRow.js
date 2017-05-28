import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { deletePassword } from '../actions'
import EditPassword from './EditPassword'

class PasswordRow extends Component {
  constructor(props){
    super(props)
    this.state={
      open: false,
      edit: false
    }
    this.closeEdit = this.closeEdit.bind(this)
  }
  componentDidMount(){
    console.log(this.props.data);
  }
  handleDate(date){
    let d = new Date(date)
    return d.toUTCString()
  }
  handleTouchTap(event){
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };
  
  deletePassword(data){
    this.props.deletePassword(data)
  }
  
  openEdit(){
    this.handleRequestClose()
    this.setState({
      edit: true
    })
  }
  
  closeEdit(){
    this.setState({
      edit: false
    })
  }
  
  render() {
    return (
      <TableRow onTouchTap={(e)=>{this.handleTouchTap(e)}}>
        <TableRowColumn>{this.props.data.url}</TableRowColumn>
        <TableRowColumn>{this.props.data.username}</TableRowColumn>
        <TableRowColumn>{this.props.data.password}</TableRowColumn>
        <TableRowColumn>{this.handleDate(this.props.data.createdAt)}</TableRowColumn>
        <TableRowColumn>{this.handleDate(this.props.data.updatedAt)}</TableRowColumn>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin= {{horizontal: 'right',vertical: 'top'}}
          targetOrigin= {{horizontal: 'right',vertical: 'bottom'}}
          onRequestClose={()=>{this.handleRequestClose()}}
          style= {{backgroundColor: 'white'}}
        >
          <Menu>
            <MenuItem primaryText="Edit" onTouchTap={()=>{this.openEdit()}}/>
            <MenuItem primaryText="Delete" onTouchTap={()=>{this.deletePassword(this.props.data)}}/>
          </Menu>
        </Popover>
        <EditPassword data={this.props.data} open={this.state.edit} close={this.closeEdit}/>
      </TableRow>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    deletePassword: (data) => {
      return dispatch(deletePassword(data))
    }
  })
}

export default connect(null, mapDispatchToProps)(PasswordRow)