import React, { Component } from 'react';
import ApiService from "../../ApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class EditUserComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      age: '',
      salary: '',
      writeText:'',
      writeTitle:'',
      message: null
    }
  }

  componentDidMount(){
    this.loadUser();
  }

  loadUser = () => {
    ApiService.fetchUserByID(window.localStorage.getItem("userID"))
      .then( res => {
        let user = res.data;
        this.setState({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          salary: user.salary,
          writeTitle: user.writeTitle,
          writeText: user.writeText
        })
      })
      .catch(err => {
        console.log('loadUser() 에러', err);
      });
  }

  listUser= (ID)=>{
    window.localStorage.setItem("userID", ID);
    this.props.history.push('/users');
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      id: this.state.id,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      salary: this.state.salary,
      writeTitle: this.state.writeTitle,
      writeText: this.state.writeText
    }

    ApiService.editUser(user)
      .then( res => {
        this.setState({
          message : user.lastName + '님 정보가 수정되었습니다.'
        })
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log('saveUser() 에러', err);
      })
  }

  render(){
    return(
      <div>
        <Typography variant="h4" style={style}>Edit User</Typography>
        <form>
            <TextField type="text" name="username" readOnly={true} 
fullWidth margin="normal" value={this.state.username} />

            <TextField placeholder="Edit your first name" name="firstName" 
fullWidth margin="normal" value={this.state.firstName} onChange={this.onChange} />

            <TextField placeholder="Edit your last name" name="lastName" 
fullWidth margin="normal" value={this.state.lastName} onChange={this.onChange} />

            <TextField type="number" placeholder="Edit your age" name="age" 
fullWidth margin="normal" value={this.state.age} onChange={this.onChange} />

            <TextField type="number" placeholder="Edit your salary" name="salary" 
fullWidth margin="normal" value={this.state.salary} onChange={this.onChange} />

            <TextField type="text" placeholder="Edit your writeTitle" name="writeTitle" 
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

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default EditUserComponent;