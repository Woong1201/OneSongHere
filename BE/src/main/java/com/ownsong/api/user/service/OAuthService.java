package com.ownsong.api.user.service;

import com.ownsong.api.user.response.UserLoginResponse;
import com.ownsong.api.user.social.Constant;
import com.ownsong.api.user.social.GoogleOAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class OAuthService {
    private final GoogleOAuth googleOAuth;
    private final HttpServletResponse response;

    public void request(Constant.SocialLoginType socialLoginType) throws IOException {
        String redirectURL;
        switch (socialLoginType){
            case GOOGLE:
                //각 소셜 로그인을 요청하면 소셜로그인 페이지로 리다이렉트 해주는 프로세스이다.
                redirectURL= googleOAuth.getOAuthRedirectURL();
                break;
            default:
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
        }

        response.sendRedirect(redirectURL);
    }

    public UserLoginResponse oAuthLogin(Constant.SocialLoginType socialLoginType, String code) throws IOException {

        switch (socialLoginType) {
            case GOOGLE:
                //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
                ResponseEntity<String> accessTokenResponse = googleOAuth.requestAccessToken(code);

                //응답 객체가 JSON 형식으로 되어 있으므로, 이를 deserialization 해서 자바 객체에 담을 것이다.
                String accessToken = googleOAuth.getAccessToken(accessTokenResponse);

                //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
                UserLoginResponse userLoginResponse = googleOAuth.requestUserInfo(accessToken);
                return userLoginResponse;
            default:
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
        }
    }
}