package com.example.demo.mapper;
 
import java.util.List;
 
import org.apache.ibatis.annotations.Mapper;
 
import com.example.demo.vo.UserVO;
import com.example.demo.vo.FileVO; 

@Mapper
public interface UserMapper {
 
    List<UserVO> userList();
    List<FileVO> fileList();
    UserVO fetchUserByID(int id);
    
    int updateUser(UserVO user);
    int insertUser(UserVO user);
    int deleteUser(int id);
    //파일 업로드 메소드 추가
    int insertFile(FileVO file);
    FileVO fileDetail(int id);
}