package com.ownsong.api.user.social;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.repository.UserRepository;
import com.ownsong.api.user.response.UserLoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GoogleOAuth implements SocialOAuth {

    // application-db.yml 에서 value annotation 을 통해서 값을 받아온다.
    @Value("${spring.OAuth2.google.url}")
    private String GOOGLE_SNS_LOGIN_URL;

    @Value("${spring.OAuth2.google.client-id}")
    private String GOOGLE_SNS_CLIENT_ID;

    @Value("${spring.OAuth2.google.callback-url}")
    private String GOOGLE_SNS_CALLBACK_URL;

    @Value("${spring.OAuth2.google.client-secret}")
    private String GOOGLE_SNS_CLIENT_SECRET;

    @Value("${spring.OAuth2.google.scope}")
    private String GOOGLE_DATA_ACCESS_SCOPE;

    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    @Override
    public String getOAuthRedirectURL() {

        Map<String, Object> params = new HashMap<>();
        params.put("scope", GOOGLE_DATA_ACCESS_SCOPE);
        params.put("response_type", "code");
        params.put("client_id", GOOGLE_SNS_CLIENT_ID);
        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);

        // parameter 를 형식에 맞춰 구성해주는 함수
        String parameterString = params.entrySet().stream()
                .map(x -> x.getKey() + "=" + x.getValue())
                .collect(Collectors.joining("&"));
        String redirectURL = GOOGLE_SNS_LOGIN_URL + "?" + parameterString;

        return redirectURL;
    }

    public ResponseEntity<String> requestAccessToken(String code) {
        String GOOGLE_TOKEN_REQUEST_URL="https://oauth2.googleapis.com/token";
        RestTemplate restTemplate=new RestTemplate();
        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("client_id", GOOGLE_SNS_CLIENT_ID);
        params.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity=restTemplate.postForEntity(GOOGLE_TOKEN_REQUEST_URL,
                params,String.class);

        if(responseEntity.getStatusCode() == HttpStatus.OK){
            return responseEntity;
        }
        return null;
    }

    public String getAccessToken(ResponseEntity<String> response) throws JsonProcessingException {
        String accessToken = objectMapper.readValue(response.getBody(),GoogleOAuthToken.class).getAccess_token();
        return accessToken;
    }

    public UserLoginResponse requestUserInfo(String accessToken) {
        // accessToken 을 통해 유저 정보 받기
        String googleUrl = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + accessToken;
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<MultiValueMap<String, String>> googleRequest = new HttpEntity(headers);
        ResponseEntity<Map> googleResponse = new RestTemplate().exchange(googleUrl, HttpMethod.GET, googleRequest, Map.class);
        String UID = (String) googleResponse.getBody().get("id");

        // db 에서 유저 조회 후 없으면 db에 입력
        List<User> users = userRepository.findByUID(UID);
        User user;
        if (users.size() == 0) {
            user = userRepository.save(new User(googleResponse));
        }
        else {
            user = users.get(0);
        }
        return new UserLoginResponse(user, accessToken);
    }
}