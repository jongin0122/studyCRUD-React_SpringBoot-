import React, { Component } from 'react';
import ApiService from "../../ApiService";

import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import { borders } from '@material-ui/system';

class WriteListComponent extends Component{

    constructor(props){
        super(props);
    
        this.state = {
          users: [],
          message: null,
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

    render(){
        return(
            <div>
            <Typography variant="h4" style={style}>글</Typography>
            <Table border={1} borderRadius={16}>
                <TableHead>
                    <TableRow>
                        <TableCell width="70px">제목</TableCell>
                        <TableCell align="center" >{this.state.writeTitle}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>작성자</TableCell>
                        <TableCell align="center" >{this.state.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>글</TableCell>
                        <TableCell align="center">{this.state.writeText}</TableCell>
                    </TableRow>
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

export default WriteListComponent;