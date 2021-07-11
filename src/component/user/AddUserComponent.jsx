import React, { Component } from 'react';
import ApiService from "../../ApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import createSpacing from '@material-ui/core/styles/createSpacing';

class AddUserComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      age: '',
      salary: '',
      writeTitle:'',
      writeText:'',
      message: null
    }

  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      salary: this.state.salary,
      writeTitle:this.state.writeTitle,
      writeText:this.state.writeText
    }

    ApiService.addUser(user)
    .then( res => {
        this.setState({
          message: user.username + '님이 성공적으로 등록되었습니다.'
        })
        console.log(this.state.message);
        this.props.history.push('/users');
    })
    .catch( err => {
      console.log('saveUser() 에러', err);
    });

  }
  
  listUser= (ID)=>{
    window.localStorage.setItem("userID", ID);
    this.props.history.push('/users');
  }

  render(){
    return(
      <div style={{paddingTop:"10px"}}>
        <Typography variant="h4" style={style}>Add User</Typography>
        <form style={formContainer}>
         
            <TextField type="text" placeholder="please input your username" name="username" 
fullWidth margin="normal" value={this.state.username} onChange={this.onChange} />

            <TextField type="password" placeholder="please input your password" name="password" 
fullWidth margin="normal" value={this.state.password} onChange={this.onChange} />

            <TextField placeholder="please input your first name" name="firstName" 
fullWidth margin="normal" value={this.state.firstName} onChange={this.onChange} />

            <TextField placeholder="please input your last name" name="lastName" 
fullWidth margin="normal" value={this.state.lastName} onChange={this.onChange} />

            <TextField type="number" placeholder="please input your age" name="age" 
fullWidth margin="normal" value={this.state.age} onChange={this.onChange} />

            <TextField type="number" placeholder="please input your salary" name="salary" 
fullWidth margin="normal" value={this.state.salary} onChange={this.onChange} />

            <TextField type="text" placeholder="please input your writeTitle" name="writeTitle" 
fullWidth margin="normal" value={this.state.writeTitle} onChange={this.onChange} />

            <TextareaAutosize rowsMin={15} style={{width:"100%",resize:"none",marginBottom:"10px"}} input type="text" placeholder="please input your writeText" name="writeText"
 value={this.state.writeText} onChange={this.onChange} />

            <input type="file" name="file" />

        </form>
         <form>
          <Button variant="contained" color="primary" onClick={this.saveUser} style={{marginRight:"10px",marginTop:"10px"}}>Save</Button>
          <Button variant="contained" color="primary" onClick={this.listUser} style={{marginRight:"10px",marginTop:"10px"}}>Back</Button>
        </form>
      </div>
    );
  }
}

const formContainer = {
  display: 'flex',
  flexFlow: 'row wrap'
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  Button: {
    padding: createSpacing(3),
  }
}


export default AddUserComponent;