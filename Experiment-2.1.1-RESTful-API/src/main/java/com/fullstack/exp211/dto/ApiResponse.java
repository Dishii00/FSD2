package com.fullstack.exp211.dto;
public record ApiResponse<T>(boolean success,String message,T data){}