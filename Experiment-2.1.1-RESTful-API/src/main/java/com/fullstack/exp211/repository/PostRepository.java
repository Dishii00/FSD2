package com.fullstack.exp211.repository;
import com.fullstack.exp211.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PostRepository extends JpaRepository<Post,Long>{}