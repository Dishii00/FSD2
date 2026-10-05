package com.fullstack.exp222.controller;
import com.fullstack.exp222.model.Post; import com.fullstack.exp222.service.PostService; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/posts") public class PostController{
 private final PostService service; public PostController(PostService s){service=s;}
 @GetMapping("/{id}") public Post get(@PathVariable Long id){return service.get(id);}
 @PutMapping("/{id}") public Post update(@PathVariable Long id,@RequestBody Post p){return service.update(id,p);}
 @GetMapping("/{id}/native") public Post nativeSql(@PathVariable Long id){return service.nativeQuery(id);}
}