package com.cu.e311;
import org.springframework.kafka.annotation.*; import org.springframework.retry.annotation.Backoff; import org.springframework.stereotype.Component;
@Component public class EventConsumer {
 @RetryableTopic(attempts="3",backoff=@Backoff(delay=1000,multiplier=2.0),dltTopicSuffix=".DLT",autoCreateTopics="true")
 @KafkaListener(topics="cu.events") public void consume(String m){
 System.out.println("Received: "+m); if(m.toLowerCase().contains("fail")) throw new IllegalStateException("Demo failure"); System.out.println("Processed: "+m); }
 @DltHandler public void dlt(String m){System.out.println("DLQ after retries: "+m);}
}