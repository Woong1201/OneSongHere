package com.ownsong.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Slf4j
@Component
public class CorsFilter extends OncePerRequestFilter {
    private static final String ALLOWED_ORIGIN =  "http://localhost:3000";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        try{
            response.addHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
            response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
            response.addHeader("Access-Control-Allow-Headers", "*");
            response.setIntHeader("Access-Control-Max-Age", 3600);
        }catch(Exception e){
            log.info("Cors Error : {}",e.getMessage());
        }
        filterChain.doFilter(request, response);

    }

}
