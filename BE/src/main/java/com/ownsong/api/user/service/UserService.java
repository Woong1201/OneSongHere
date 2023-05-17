package com.ownsong.api.user.service;

import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getLoginUser(){
        HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.
                getRequestAttributes()).
                getRequest();
        User user = (User) httpServletRequest.getAttribute("user");
        return user;
    }

}