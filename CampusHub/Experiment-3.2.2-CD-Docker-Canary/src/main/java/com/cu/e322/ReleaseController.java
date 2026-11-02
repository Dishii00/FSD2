package com.cu.e322;
import java.util.Map; import org.springframework.beans.factory.annotation.Value; import org.springframework.web.bind.annotation.*;
@RestController public class ReleaseController {
 @Value("${app.release:stable-v1}") String release;
 @GetMapping("/api/health") public Map<String,String> health(){return Map.of("status","UP","release",release);}
 @GetMapping("/api/release") public Map<String,String> release(){return Map.of("release",release);}
}