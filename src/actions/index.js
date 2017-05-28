import axios from 'axios'
import * as actionTypes from './constants'

const fetchPasswordSuccess = (datas) => ({
  type: actionTypes.FETCH_PASSWORD_SUCCESS,
  datas
})

const createPasswordSuccess = (data) => ({
  type: actionTypes.CREATE_PASSWORD_SUCCESS,
  data
})

const deletePasswordSuccess = (data) => ({
  type: actionTypes.DELETE_PASSWORD_SUCCESS,
  data
})

const updatePasswordSuccess = (data) => ({
  type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  data
})

export const fetchPassword = () => {
  return (dispatch)=>{
    axios.get('http://localhost:8888/datas')
    .then((res)=>{
      dispatch(fetchPasswordSuccess(res.data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export const createPassword = (data) => {
  return (dispatch)=>{
    axios.post('http://localhost:8888/datas',{
      url: data.url,
      username: data.username,
      password: data.password,
      createdAt: new Date()
    }).then((res)=>{
      dispatch(createPasswordSuccess(res.data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export const deletePassword = (data) => {
  return (dispatch)=>{
    axios.delete('http://localhost:8888/datas/' + data.id)
    .then((res)=>{
      dispatch(deletePasswordSuccess(data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export const updatePassword = (data, newData) => {
  return (dispatch)=>{
    axios.patch('http://localhost:8888/datas/' + data.id, {
      url: newData.url,
      username: newData.username,
      password: newData.password,
      updatedAt: new Date()
    }).then((res)=>{
      dispatch(updatePasswordSuccess(res.data))
    }).catch((err)=>{
      console.log(err);
    })
  }
}