package com.fullstack.exp221.config;
import com.fullstack.exp221.model.Post; import com.fullstack.exp221.repository.PostRepository; import org.springframework.boot.CommandLineRunner; import org.springframework.context.annotation.Bean; import org.springframework.context.annotation.Configuration;
@Configuration public class DataLoader{
 @Bean CommandLineRunner load(PostRepository r){return a->{for(int i=1;i<=12;i++)r.save(new Post("Post "+i,"This is sample content for pagination and sorting experiment number "+i));};}
}