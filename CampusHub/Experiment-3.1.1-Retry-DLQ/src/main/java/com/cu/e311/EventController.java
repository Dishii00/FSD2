package com.cu.e311;
import java.util.Map; import org.springframework.kafka.core.KafkaTemplate; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/events") public class EventController {
 private final KafkaTemplate<String,String> kafka;
 public EventController(KafkaTemplate<String,String> k){kafka=k;}
 @PostMapping public Map<String,String> send(@RequestParam(defaultValue="normal") String type,@RequestParam(defaultValue="hello") String message){
 kafka.send("cu.events",type,message); return Map.of("status","published","message",message); }
}