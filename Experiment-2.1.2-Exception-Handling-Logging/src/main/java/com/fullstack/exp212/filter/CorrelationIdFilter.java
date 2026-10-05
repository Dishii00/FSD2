package com.fullstack.exp212.filter;
import jakarta.servlet.*; import jakarta.servlet.http.*; import org.slf4j.MDC; import org.springframework.stereotype.Component; import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException; import java.util.UUID;
@Component public class CorrelationIdFilter extends OncePerRequestFilter{
 protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws ServletException,IOException{
  String id=req.getHeader("X-Correlation-ID"); if(id==null||id.isBlank())id=UUID.randomUUID().toString();
  MDC.put("correlationId",id); req.setAttribute("correlationId",id); res.setHeader("X-Correlation-ID",id);
    long start=System.currentTimeMillis(); try{chain.doFilter(req,res);}finally{logger.info(String.format("%s %s -> %d (%d ms)",req.getMethod(),req.getRequestURI(),res.getStatus(),System.currentTimeMillis()-start));MDC.remove("correlationId");}
 }}