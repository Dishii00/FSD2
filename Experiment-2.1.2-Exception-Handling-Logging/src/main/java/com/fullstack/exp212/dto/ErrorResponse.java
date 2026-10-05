package com.fullstack.exp212.dto;
import java.time.LocalDateTime; import java.util.Map;
public record ErrorResponse(boolean success,String message,Map<String,String> errors,String correlationId,LocalDateTime timestamp){}