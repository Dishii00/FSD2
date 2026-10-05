package com.fullstack.exp211.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity
public class Post {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Size(min=3,max=100) private String title;
 @NotBlank @Size(min=10,max=1000) private String content;
 public Post(){} public Post(String t,String c){title=t;content=c;}
 public Long getId(){return id;} public String getTitle(){return title;} public String getContent(){return content;}
 public void setTitle(String t){title=t;} public void setContent(String c){content=c;}
}