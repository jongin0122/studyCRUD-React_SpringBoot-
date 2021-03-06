import React, { Component } from 'react';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import WriteIcon from '@material-ui/icons/Assignment'

class UserListComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      users: [],
      message: null
    }
  }

  componentDidMount(){
    this.reloadUserList();
  }

  reloadUserList = () => {
    ApiService.fetchUsers()
      .then( res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log('reloadUserList() Error!', err);
      })
  }

  deleteUser = (userID) => {
    ApiService.deleteUser(userID)
      .then( res => {
        this.setState({
          message: 'User Deleted Successfully.'
        });
        this.setState({
          users: this.state.users.filter( user =>
            user.id !== userID)
          });
        })
      .catch(err => {
        console.log('deleteUser() Error!', err);
      })
  }
  
  editUser = (ID) => {
    window.localStorage.setItem("userID", ID);
    this.props.history.push('/edit-user');
  }

  addUser = () => {
    window.localStorage.removeItem("userID");
    this.props.history.push('/add-user');
  }

  listUser= (ID)=>{
    window.localStorage.setItem("userID", ID);
    this.props.history.push('/users');
  }

  writeList=(ID)=>{
    window.localStorage.setItem("userID",ID);
    this.props.history.push('/write-List')
  }
 

  render(){

    return(
      <div>
        <Typography variant="h4" style={style}>User List</Typography>
        <Button variant="contained" color="primary" onClick={this.addUser}> ????????? </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>??? ??????</TableCell>
              <TableCell align="right">FistName</TableCell>
              <TableCell align="right">LastName</TableCell>
              <TableCell align="right">UserName</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">??????</TableCell>
              <TableCell align="right">??? ??????</TableCell>
              <TableCell align="right">??????</TableCell>
              <TableCell align="right">??????</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map( user => 
              <TableRow key={user.id}>
                <TableCell component="th" scope="user">{user.id}</TableCell>
                <TableCell align="right">{user.firstName}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="right">{user.salary}</TableCell>
                <TableCell align="right">{user.writeTitle}</TableCell>
                <TableCell align="right" onClick={()=> this.writeList(user.id)}>
                  <WriteIcon />
                </TableCell>
                <TableCell align="right" onClick={()=> this.editUser(user.id)}>
                  <CreateIcon />
                </TableCell>
                <TableCell align="right" onClick={()=> this.deleteUser(user.id)}>
                  <DeleteIcon />
                </TableCell>
              </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
    );
    
  }

}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default UserListComponent;