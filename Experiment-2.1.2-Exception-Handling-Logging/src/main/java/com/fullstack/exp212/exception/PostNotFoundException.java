package com.fullstack.exp212.exception;
public class PostNotFoundException extends RuntimeException{public PostNotFoundException(Long id){super("Post not found with id: "+id);}}