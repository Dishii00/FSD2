package com.fullstack.exp212.controller;
import com.fullstack.exp212.model.Post; import com.fullstack.exp212.repository.PostRepository; import com.fullstack.exp212.exception.PostNotFoundException; import jakarta.validation.Valid; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/posts") public class PostController{
 private final PostRepository repo; public PostController(PostRepository r){repo=r;}
 @GetMapping public Object all(){return repo.findAll();}
 @GetMapping("/{id}") public Post one(@PathVariable Long id){return repo.findById(id).orElseThrow(()->new PostNotFoundException(id));}
 @PostMapping public Post create(@Valid @RequestBody Post p){return repo.save(p);}
}