package com.cu.e321;
import org.junit.jupiter.api.Test; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc; import org.springframework.boot.test.context.SpringBootTest; import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get; import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest @AutoConfigureMockMvc class ApiTest {
 @Autowired MockMvc mvc;
 @Test void health() throws Exception {mvc.perform(get("/api/health")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("UP"));}
 @Test void greeting() throws Exception {mvc.perform(get("/api/greeting").param("name","Student")).andExpect(status().isOk()).andExpect(jsonPath("$.message").value("Hello, Student!"));}
}