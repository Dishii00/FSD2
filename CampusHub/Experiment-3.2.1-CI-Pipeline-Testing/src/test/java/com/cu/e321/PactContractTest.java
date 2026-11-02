
package com.cu.e321;

import au.com.dius.pact.consumer.MockServer;
import au.com.dius.pact.consumer.dsl.PactDslWithProvider;
import au.com.dius.pact.consumer.junit5.PactConsumerTestExt;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.core.model.V4Pact;
import au.com.dius.pact.core.model.annotations.Pact;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "GreetingAPI")
class PactContractTest {

    @Pact(consumer = "CUFrontend")
    public V4Pact contract(PactDslWithProvider builder) {
        return builder
                .given("greeting available")
                .uponReceiving("greeting request")
                .path("/api/greeting")
                .method("GET")
                .willRespondWith()
                .status(200)
                .headers(Map.of("Content-Type", "application/json"))
                .body("{\"message\":\"Hello, Student!\"}")
                .toPact(V4Pact.class);
    }

    @Test
    @PactTestFor(pactMethod = "contract")
    void verifies(MockServer server) throws Exception {
        HttpRequest request = HttpRequest.newBuilder(
                URI.create(server.getUrl() + "/api/greeting"))
                .GET()
                .build();

        HttpResponse<String> response =
                HttpClient.newHttpClient().send(
                        request, HttpResponse.BodyHandlers.ofString());

        assertTrue(response.body().contains("Hello, Student!"));
    }
}
