package com.example.demo.controller;
 
import java.io.File;
import java.io.IOException;
/* VO에서 받은 URL로 들어온 오청을 처리해준다.
 * 요청한 URL과 method(get, post, delete 등)로 작업을 처리한다.
 * 흔히 Controller에서 DB를 다루는 작업을 많이 한다. 
 *
 * MyBatis는 자바 Controller에서 DB다루는 작업을 용이하게 해주는 라이브러리이다.
 * 이를 mapper라는 이름으로 2번(java파일, xml파일)로 작업을한다.
 * xml파일에서 작성한 쿼리문을 java파일에서 작성한 메소드와 연결시켜 DB에서 작업한다.
 */
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.mapper.UserMapper;
import com.example.demo.vo.UserVO;
import com.example.demo.vo.FileVO;
import com.example.demo.service.UserService;
 
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
 
    @Autowired
    UserMapper userMapper;
    
    @Autowired
    UserService userService;
    
    @GetMapping
    public List<UserVO> userList(){
        System.out.println(userMapper.userList());
        System.out.println("유저리스트 출력 성공");
        return userMapper.userList();
    }
    
    @PostMapping
    void insertUser(@RequestBody UserVO user) {
        userMapper.insertUser(user);
        System.out.println("유저 DB 저장 성공");
    }
    
    @GetMapping("/{id}")
    public UserVO fetchUserByID(@PathVariable int id) {
        System.out.println(userMapper.fetchUserByID(id));
        UserVO fetchUser = userMapper.fetchUserByID(id);
        return fetchUser;
    }
        
    @PutMapping("/{id}")
    public void updateUser(@PathVariable int id, @RequestBody UserVO user) {
        
        UserVO updateUser = user;
        System.out.println("업데이트유저 => " + updateUser);
        
        updateUser.setFirstName(user.getFirstName());
        updateUser.setLastName(user.getLastName());
        updateUser.setAge(user.getAge());
        updateUser.setSalary(user.getSalary());
        updateUser.setWriteTitle(user.getWriteTitle());
        updateUser.setWriteText(user.getWriteText());
        
        userMapper.updateUser(updateUser); 
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userMapper.deleteUser(id);
        System.out.println("유저 삭제, 성공적");
    }
    
    @RequestMapping("/insertProc")
    private String insertUserProc(@ModelAttribute UserVO user, @RequestPart MultipartFile files, HttpServletRequest request) throws IllegalStateException, IOException, Exception{
    	if(files.isEmpty()) {
    		userService.insertUser(user);
    	}else {
    		String fileName = files.getOriginalFilename();
    		String fileNameExtension = FilenameUtils.getExtension(fileName).toLowerCase();
    		File destinationFile;
    		String destinationFileName;
    		String fileURL ="C:\\Users\\jongi\\tutorial\\file";
    		
    		do {
    			destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + fileNameExtension;
    			destinationFile = new File(fileURL + destinationFileName);
    		}while (destinationFile.exists());
    	
    		destinationFile.getParentFile().mkdirs();
    		files.transferTo(destinationFile);
    	
    		userService.insertUser(user);
    	
    		FileVO file= new FileVO();
    		file.setId(user.getId());
    		file.setFilename(destinationFileName);
    		file.setFileOriginName(fileName);
    		file.setFileURL(fileURL);
    	
    		userService.insertFile(file);
    	
    	}
    	return "forward:/users/list"; //객체 재사용
    }
}