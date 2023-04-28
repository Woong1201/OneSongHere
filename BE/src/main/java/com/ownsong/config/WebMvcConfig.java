package com.ownsong.config;

import com.ownsong.api.user.repository.UserRepository;
import com.ownsong.common.LoginInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final UserRepository userRepository;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        LoginInterceptor loginInterceptor = new LoginInterceptor(userRepository);
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/**");
    }
}