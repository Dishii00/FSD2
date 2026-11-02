package com.cu.e312;
import java.util.Map; import org.springframework.kafka.core.KafkaTemplate; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/payments") public class PaymentController {
 private final KafkaTemplate<String,String> kafka; public PaymentController(KafkaTemplate<String,String> k){kafka=k;}
 @PostMapping public Map<String,String> send(@RequestParam String eventId,@RequestParam(defaultValue="100") String amount){
 String v=eventId+"|"+amount; kafka.send("cu.payments",eventId,v); return Map.of("status","published","eventId",eventId); }
}