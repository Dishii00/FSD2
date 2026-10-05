package com.fullstack.exp211.controller;
import com.fullstack.exp211.dto.ApiResponse;
import com.fullstack.exp211.model.Post;
import com.fullstack.exp211.service.PostService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/posts")
@CrossOrigin(origins="http://localhost:5500")
public class PostController {
 private final PostService service;
 public PostController(PostService s){service=s;}
 @GetMapping public ApiResponse<?> all(){return new ApiResponse<>(true,"Posts fetched successfully",service.all());}
 @GetMapping("/{id}") public ApiResponse<?> one(@PathVariable Long id){return new ApiResponse<>(true,"Post fetched successfully",service.one(id));}
 @PostMapping public ApiResponse<?> create(@Valid @RequestBody Post p){return new ApiResponse<>(true,"Post created successfully",service.create(p));}
 @PutMapping("/{id}") public ApiResponse<?> update(@PathVariable Long id,@Valid @RequestBody Post p){return new ApiResponse<>(true,"Post updated successfully",service.update(id,p));}
 @DeleteMapping("/{id}") public ApiResponse<?> delete(@PathVariable Long id){service.delete(id);return new ApiResponse<>(true,"Post deleted successfully",null);}
}