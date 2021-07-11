package com.example.demo.vo;
 
/* Value Object
 * 리액트에서 유저를 등록 할 때 "user"라는 객체에 정보를 담았고, ApiService를 통해 스프링부트에게 URL로 작업 요청.
 * 리액트 언어와 자바의 언어는 다르기 때문에 자바 언어로 객체를 받아주어야 한다. 이를 VO라고 한다. 
 */
import lombok.Data;
 
@Data
public class UserVO {
 
    int id;
    String username;
    String password;
    String firstName;
    String lastName;
    int age;
    int salary;
    String writeTitle;
    String writeText;
    
	public String getWriteTitle() {
		return writeTitle;
	}
	public void setWriteTitle(String writeTitle) {
		this.writeTitle = writeTitle;
	}
	public String getWriteText() {
		return writeText;
	}
	public void setWriteText(String writeText) {
		this.writeText = writeText;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getSalary() {
		return salary;
	}
	public void setSalary(int salary) {
		this.salary = salary;
	}
    
}