package com.fullstack.exp222.service;

import com.fullstack.exp222.model.Post;
import com.fullstack.exp222.repository.PostRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository repo;

    public PostService(PostRepository repo) {
        this.repo = repo;
    }

    @Cacheable(value = "posts", key = "#id")
    public Post get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    @CacheEvict(value = "posts", key = "#id")
    public Post update(Long id, Post input) {
        Post post = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        post.setTitle(input.getTitle());
        post.setContent(input.getContent());

        return repo.save(post);
    }

    public Post nativeQuery(Long id) {
        return repo.findNative(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }
}