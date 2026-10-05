package com.fullstack.exp212.repository;
import com.fullstack.exp212.model.Post; import org.springframework.data.jpa.repository.JpaRepository;
public interface PostRepository extends JpaRepository<Post,Long>{}