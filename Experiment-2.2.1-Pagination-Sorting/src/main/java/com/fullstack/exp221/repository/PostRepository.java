package com.fullstack.exp221.repository;
import com.fullstack.exp221.model.Post; import org.springframework.data.jpa.repository.JpaRepository;
public interface PostRepository extends JpaRepository<Post,Long>{}