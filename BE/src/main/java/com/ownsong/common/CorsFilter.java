package com.ownsong.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.HttpClientErrorException;
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
public class CorsFilter extends OncePerRequestFilter {
    private static final List<String> ALLOWED_ORIGINS = new ArrayList<>(
            Arrays.asList(
                    "http://localhost:3000"
            )
    );

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        try{
            String origin = request.getHeader("Origin");
            response.addHeader("Access-Control-Allow-Origin", origin);
            response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
            response.addHeader("Access-Control-Allow-Headers", "Authorization");
            response.setIntHeader("Access-Control-Max-Age", 3600);
        }catch(Exception e){
            log.info("Cors Error : {}",e.getMessage());
        }
        filterChain.doFilter(request, response);

    }

}
