package com.ownsong.api.user.controller;

import com.ownsong.api.user.dto.response.RedirectUrl;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.dto.response.UserLoginResponse;
import com.ownsong.api.user.service.OAuthService;
import com.ownsong.api.user.social.Constant;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Validated
@Tag(name = "User-Api", description = "User-Api 입니다.")
public class UserController {
    private final OAuthService oAuthService;

    @ResponseBody
    @GetMapping(value = "/auth/callback/{socialLoginType}")
    public ResponseEntity<?> callback (
            @PathVariable(name = "socialLoginType") String socialLoginPath,
            @RequestParam(name = "code") String code)throws IOException {

        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(socialLoginPath.toUpperCase());
        // 일회성 code 를 통해 access-token 을 발급 받고 이를 통해 유저 정보를 받아옴.
        UserLoginResponse userLoginResponse = oAuthService.oAuthLogin(socialLoginType,code);
        return ResponseEntity.status(200).body(userLoginResponse);
    }

    @GetMapping("/loginUrl/{socialLoginType}") //GOOGLE, KAKAO, NAVER 등이 들어올 것이다.
    public void socialLoginRedirect(@PathVariable(name="socialLoginType") String SocialLoginPath) throws IOException {
        // socialLoginType 의 enum class
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        // socialLogin 주소를 redirect 해주는 method
        oAuthService.request(socialLoginType);
    }

    @GetMapping("/loginUrlGet/{socialLoginType}") //GOOGLE, KAKAO, NAVER 등이 들어올 것이다.
    public ResponseEntity<?> socialLoginRedirectGey(@PathVariable(name="socialLoginType") String SocialLoginPath) throws IOException {
        // socialLoginType 의 enum class
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        // socialLogin 주소를 return 해주는 method
        String redirectURL = oAuthService.getRequest(socialLoginType);
        return ResponseEntity.status(200).body(new RedirectUrl(redirectURL));
    }

    // user login 에 따른 interceptor 처리에 대한 예시
    @GetMapping("/test")
    public ResponseEntity<?> socialLoginRedirect() throws IOException {
        // login 시 user 객체에 db 에서 조회한 entity 가 들어있음.
        HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        User user = (User) httpServletRequest.getAttribute("user");

        // non-login 상태면 user = null
        if (user == null) {
            return ResponseEntity.status(200).body("로그인 안한 상태");
        }

        return ResponseEntity.status(200).body("로그인 한 상태");
    }
}
