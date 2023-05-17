package com.ownsong.common;

import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.repository.UserRepository;
import com.ownsong.exception.ErrorCode;
import com.ownsong.exception.customException.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class LoginInterceptor implements HandlerInterceptor {
    private final UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 어떤 요청이 들어왔는지 확인
        String url = request.getRequestURI();
        log.info("입력 url : {}", url);

        // header 에서 token 조회
        String accessToken = request.getHeader("accessToken");
        // swagger header 토큰 형식에 맞게 받기
        if (accessToken == null) {
            String swaggerOAuth = request.getHeader("Authorization");
            // non-login 상태
            if (swaggerOAuth == null) {
                log.info("non-login user interceptor quit");
                return true;
            }
            accessToken = swaggerOAuth.replaceAll("Bearer ", "");
            if (accessToken.equals("null")) {
                log.info("non-login user interceptor quit");
                return true;
            }
        }

        // accessToken 적절한지 확인
        String UID;
        try {
            String googleUrl = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + accessToken;
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<MultiValueMap<String, String>> googleRequest = new HttpEntity(headers);
            ResponseEntity<Map> googleResponse = new RestTemplate().exchange(googleUrl, HttpMethod.GET, googleRequest, Map.class);
            UID = (String) googleResponse.getBody().get("id");
        } catch (Exception e) {
            log.error("부적절한 토큰", e);
            throw new UserException(ErrorCode.USER_UNAUTHORIZED);
        }

        // db 에서 유저 조회
        List<User> users = userRepository.findByUID(UID);
        User user = users.get(0);

        if (user == null)
            return false;

        request.setAttribute("user", user);
        log.info("login user interceptor quit");
        return true;
    }
}