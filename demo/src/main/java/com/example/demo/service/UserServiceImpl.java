package com.example.demo.service;
/*
 *  Implement 파일을 하나 더 만들어 다형성을 위해준다. 
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.UserMapper;
import com.example.demo.vo.UserVO;
import com.example.demo.vo.FileVO;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserMapper usermapper;

	@Override
	public List<UserVO> userList() {
		return usermapper.userList();
	}

	@Override
	public UserVO fetchUserByID(int id) {
		return usermapper.fetchUserByID(id);
	}

	@Override
	public int insertUser(UserVO user) {
		return usermapper.insertUser(user);
	}

	@Override
	public int updateUser(UserVO user) {
		return usermapper.updateUser(user);
	}

	@Override
	public int deleteUser(int id) {
		return usermapper.deleteUser(id);
	}
	
	@Override
	public int insertFile(FileVO file) {
		return usermapper.insertFile(file);
	}
	
	
}
