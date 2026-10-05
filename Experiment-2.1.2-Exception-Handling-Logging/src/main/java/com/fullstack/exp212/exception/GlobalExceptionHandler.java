package com.fullstack.exp212.exception;
import com.fullstack.exp212.dto.ErrorResponse; import jakarta.servlet.http.HttpServletRequest; import org.springframework.http.*; import org.springframework.web.bind.MethodArgumentNotValidException; import org.springframework.web.bind.annotation.*; import java.time.LocalDateTime; import java.util.*;
@RestControllerAdvice public class GlobalExceptionHandler{
 @ExceptionHandler(PostNotFoundException.class) ResponseEntity<ErrorResponse> notFound(PostNotFoundException e,HttpServletRequest r){return ResponseEntity.status(404).body(body(e.getMessage(),r,Map.of()));}
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException e,HttpServletRequest r){
  Map<String,String> m=new LinkedHashMap<>();e.getBindingResult().getFieldErrors().forEach(x->m.put(x.getField(),x.getDefaultMessage()));
  return ResponseEntity.badRequest().body(body("Validation failed",r,m));}
 private ErrorResponse body(String msg,HttpServletRequest r,Map<String,String> m){return new ErrorResponse(false,msg,m,(String)r.getAttribute("correlationId"),LocalDateTime.now());}
}