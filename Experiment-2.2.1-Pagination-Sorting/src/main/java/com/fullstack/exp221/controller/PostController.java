package com.fullstack.exp221.controller;
import com.fullstack.exp221.repository.PostRepository; import org.springframework.data.domain.*; import org.springframework.data.web.PageableDefault; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/posts") public class PostController{
 private final PostRepository repo; public PostController(PostRepository r){repo=r;}
 @GetMapping public Page<?> getPosts(@PageableDefault(size=5,sort="id",direction=Sort.Direction.ASC) Pageable pageable){return repo.findAll(pageable);}
}