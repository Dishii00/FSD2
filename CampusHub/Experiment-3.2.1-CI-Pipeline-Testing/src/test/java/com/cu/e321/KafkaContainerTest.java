package com.cu.e321;
import org.junit.jupiter.api.Test; import org.testcontainers.containers.KafkaContainer; import org.testcontainers.utility.DockerImageName; import static org.junit.jupiter.api.Assertions.*;
class KafkaContainerTest {
 @Test void kafkaStarts(){try(KafkaContainer k=new KafkaContainer(DockerImageName.parse("confluentinc/cp-kafka:7.7.1"))){k.start();assertTrue(k.isRunning());}}
}