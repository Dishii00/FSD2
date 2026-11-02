package com.cu.e321;
import java.util.Map; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api") public class ApiController {
 @GetMapping("/health") public Map<String,String> health(){return Map.of("status","UP");}
 @GetMapping("/greeting")
public Map<String, String> greet(
        @RequestParam(name = "name", defaultValue = "Student") String name) {
    return Map.of("message", "Hello, " + name + "!");
}
}