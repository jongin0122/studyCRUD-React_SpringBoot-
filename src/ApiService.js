import axios from 'axios';
/*
*스프링부트 서버와 연결해주는 역할을 한다. 즉, 리액트에서 무언가 요청을 하면 이를 스프링부트에서
*받아 MySQL에서 데이터를 가져오거나 처리한다. 전형적인 MVC패턴이라고 할 수 있다. 
*/
const USER_API_BASE_URL = "http://localhost:8080/users";

class ApiService {

  fetchUsers(){
    return axios.get(USER_API_BASE_URL);
  }

  fetchUserByID(userID){
    return axios.get(USER_API_BASE_URL + '/' + userID);
  }

  deleteUser(userID){
    return axios.delete(USER_API_BASE_URL + '/' + userID);
  }
  
  addUser(user){
    return axios.post(USER_API_BASE_URL, user);
  }

  editUser(user){
    return axios.put(USER_API_BASE_URL + '/' + user.id, user)
  }

}

export default new ApiService();