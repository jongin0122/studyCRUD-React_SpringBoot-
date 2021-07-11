package com.example.demo.service;


/*
 * 이제 쿼리문을 실행한 Mapper를 바로 사용하는 것이 아닌, 무언갈 한번 더 거쳐서 사용할 Service이다.
 * 바로 사용해도 문제가 없지만, 굳이 이렇게 하는 이유는 쿼리를 실행하는 부분과 이를 가져다 사용하는 (여기서는 Service) 부분을
 * 분리해서 역할을 명확히 나누고자 사용해본다.
 */


import java.util.List;

import com.example.demo.vo.UserVO;
import com.example.demo.vo.FileVO;

public interface UserService {

    List<UserVO> userList();
    UserVO fetchUserByID(int id);
    int updateUser(UserVO user);
    int insertUser(UserVO user);
    int deleteUser(int id);
    
    //파일 업로드 메소드 추가
    int insertFile(FileVO file);
}
