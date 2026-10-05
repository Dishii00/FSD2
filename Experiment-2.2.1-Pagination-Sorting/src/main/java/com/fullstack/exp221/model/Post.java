package com.fullstack.exp221.model;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity public class Post{
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; String title; String content; LocalDateTime createdAt=LocalDateTime.now();
 public Post(){} public Post(String t,String c){title=t;content=c;} public Long getId(){return id;} public String getTitle(){return title;} public String getContent(){return content;} public LocalDateTime getCreatedAt(){return createdAt;}
}