import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

import { fetchPassword } from '../actions'
import PasswordRow from './PasswordRow'

class PasswordTable extends Component {
  componentDidMount(){
    this.props.fetchPassword()
  }
  
  render(){
    return(
      <Table selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>URL</TableHeaderColumn>
            <TableHeaderColumn>Username</TableHeaderColumn>
            <TableHeaderColumn>Password</TableHeaderColumn>
            <TableHeaderColumn>CreatedAt</TableHeaderColumn>
            <TableHeaderColumn>UpdatedAt</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {this.props.datas.map(data=>
          <PasswordRow key={data.id} data={data}/>
        )}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    datas: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchPassword: () => {
      return dispatch(fetchPassword())
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordTable)