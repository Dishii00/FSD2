package com.cu.e312;
import java.util.*; import java.util.concurrent.*; import java.util.concurrent.atomic.*; import org.springframework.kafka.annotation.KafkaListener; import org.springframework.stereotype.Component;
@Component public class PaymentConsumer {
 private final Set<String> seen=ConcurrentHashMap.newKeySet(); private final AtomicInteger count=new AtomicInteger();
 @KafkaListener(topics="cu.payments") public void receive(String payload){
 String[] a=payload.split("\\|",2); if(!seen.add(a[0])){System.out.println("DUPLICATE IGNORED: "+a[0]);return;}
 System.out.println("PAYMENT PROCESSED ONCE: "+payload+" total="+count.incrementAndGet()); }
}