import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class PasswordRow extends Component {
  componentDidMount(){
    console.log(this.props.data);
  }
  handleDate(date){
    let d = new Date(date)
    return d.toUTCString()
  }
  render() {
    return (
      <TableRow key={this.props.data.id}>
        <TableRowColumn>{this.props.data.url}</TableRowColumn>
        <TableRowColumn>{this.props.data.username}</TableRowColumn>
        <TableRowColumn>{this.props.data.password}</TableRowColumn>
        <TableRowColumn>{this.handleDate(this.props.data.createdAt)}</TableRowColumn>
        <TableRowColumn>{this.props.data.updatedAt}</TableRowColumn>
      </TableRow>
    )
  }
}

export default PasswordRow