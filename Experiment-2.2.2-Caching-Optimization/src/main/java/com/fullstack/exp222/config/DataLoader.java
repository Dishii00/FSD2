package com.fullstack.exp222.config;

import com.fullstack.exp222.model.Post;
import com.fullstack.exp222.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(PostRepository repo) {
        return args -> {
            repo.save(new Post(
                    "Post 1",
                    "This is sample content for caching"
            ));

            repo.save(new Post(
                    "Post 2",
                    "This is sample content for caching"
            ));

            repo.save(new Post(
                    "Post 3",
                    "This is sample content for caching"
            ));
        };
    }
}