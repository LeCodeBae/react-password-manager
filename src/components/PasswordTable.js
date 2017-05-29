import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import { fetchPassword } from '../actions'
import PasswordRow from './PasswordRow'

class PasswordTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: ''
    }
  }
  
  componentDidMount(){
    this.props.fetchPassword()
  }
  
  handleType(e){
    this.setState({
      searchTerm: e.target.value
    })
  }
  
  handleSearch(){
    if(this.state.searchTerm === null || this.state.searchTerm === undefined || this.state.searchTerm === ''){
      return (
        this.props.datas.map(data=>
          <PasswordRow key={data.id} data={data}/>
        )
      )
    } else {
      const regEx = new RegExp(this.state.searchTerm, 'g')
      let datas = this.props.datas.filter(data=>data.password.match(regEx))
      return (
        datas.map(data=>
          <PasswordRow key={data.id} data={data}/>
        )
      )
    }
  }
  
  render(){
    return(
      <div style={{margin: '50px'}}>
      <TextField
        hintText="search password"
        onChange={(e)=>{this.handleType(e)}}
      />
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
        {this.handleSearch()}
        </TableBody>
      </Table>
      </div>
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