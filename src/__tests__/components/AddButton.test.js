import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { AddPassword } from '../../components/AddPassword';

describe('<AddPassword/>', () => {
  const minProps = {
    createPassword: ()=>{}
  }
  
  let AddPasswordWrapper,
  PasswordField,
  SubmitButton
  
  beforeEach(()=>{
    AddPasswordWrapper = shallow(<AddPassword createPassword='test'/>)
    PasswordField = AddPasswordWrapper.find('TextField').at(2)
    SubmitButton = AddPasswordWrapper.find('FlatButton').at(1)
  })
  
  
  it('renders without exploding', () => {
    expect(AddPasswordWrapper.length).toEqual(1)
  })
  
  it('render password field', ()=>{
    expect(PasswordField).toBeDefined()
  })
  
  it('password must at least contain one uppercase letter', ()=>{
    PasswordField.simulate('change', {target: {value: 'abcd'}})
    expect(
      AddPasswordWrapper.containsMatchingElement(
        <p style={{color: '#F44336'}}>password must at least contain one uppercase letter</p>
      )
    ).toEqual(true)
  })
  
  it('password must at least contain one lowercase letter', ()=>{
    PasswordField.simulate('change', {target: {value: 'ABCD'}})
    expect(
      AddPasswordWrapper.containsMatchingElement(
        <p style={{color: '#F44336'}}>password must at least contain one lowercase letter</p>
      )
    ).toEqual(true)
  })
  
  it('password must at least contain one symbol character', ()=>{
    PasswordField.simulate('change', {target: {value: 'abcd'}})
    expect(
      AddPasswordWrapper.containsMatchingElement(
        <p style={{color: '#F44336'}}>password must at least contain one symbol character</p>
      )
    ).toEqual(true)
  })
  
  it('password must at least contain one numeral character', ()=>{
    PasswordField.simulate('change', {target: {value: 'abcd'}})
    expect(
      AddPasswordWrapper.containsMatchingElement(
        <p style={{color: '#F44336'}}>password must at least contain one numeral character</p>
      )
    ).toEqual(true)
  })
  
  it('password must be at least 5 characters length', ()=>{
    PasswordField.simulate('change', {target: {value: 'abcd'}})
    expect(
      AddPasswordWrapper.containsMatchingElement(
        <p style={{color: '#F44336'}}>password must be at least 5 characters length</p>
      )
    ).toEqual(true)
  })
  
  it('button should not be disabled when all password requirements are met', ()=>{
    PasswordField.simulate('change', {target: {value: 'Ab!12'}})
    expect(
      AddPasswordWrapper.state('disabled')
    ).toEqual(false)
  })
  
  it('renders submit button', ()=>{
    expect(SubmitButton).toBeDefined()
  })
  
  it('Add password require createPassword props to be defined', ()=>{
    const createPassword = jest.fn()
    const AddPasswordWrapper = shallow(
    <MuiThemeProvider>
      <AddPassword createPassword={createPassword}/>
    </MuiThemeProvider>)
    expect(AddPasswordWrapper.prop('createPassword')).toEqual(createPassword)
  })
})