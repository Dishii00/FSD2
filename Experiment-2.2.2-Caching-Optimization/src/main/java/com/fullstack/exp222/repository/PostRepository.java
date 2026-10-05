package com.fullstack.exp222.repository;
import com.fullstack.exp222.model.Post; import org.springframework.data.jpa.repository.*; import org.springframework.data.repository.query.Param; import java.util.Optional;
public interface PostRepository extends JpaRepository<Post,Long>{
 @Query(value="SELECT * FROM post WHERE id=:id",nativeQuery=true) Optional<Post> findNative(@Param("id")Long id);
}