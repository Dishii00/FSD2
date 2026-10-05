package com.fullstack.exp211.service;
import com.fullstack.exp211.model.Post;
import com.fullstack.exp211.repository.PostRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class PostService {
 private final PostRepository repo;
 public PostService(PostRepository r){repo=r;}
 public List<Post> all(){return repo.findAll();}
 public Post one(Long id){return repo.findById(id).orElseThrow();}
 public Post create(Post p){return repo.save(p);}
 public Post update(Long id,Post p){Post x=one(id);x.setTitle(p.getTitle());x.setContent(p.getContent());return repo.save(x);}
 public void delete(Long id){repo.deleteById(id);}
}