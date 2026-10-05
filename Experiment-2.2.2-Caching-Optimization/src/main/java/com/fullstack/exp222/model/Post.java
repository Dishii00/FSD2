package com.fullstack.exp222.model;
import jakarta.persistence.*;
@Entity public class Post{
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; String title; String content;
 public Post(){} public Post(String t,String c){title=t;content=c;} public Long getId(){return id;} public String getTitle(){return title;} public String getContent(){return content;} public void setTitle(String t){title=t;} public void setContent(String c){content=c;}
}