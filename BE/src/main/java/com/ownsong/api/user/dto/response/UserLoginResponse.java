package com.ownsong.api.user.dto.response;

import com.ownsong.api.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginResponse {
    @Schema(description = "userId", example = "1")
    private long userID;
    @Schema(description = "nickName", example = "Zi존두현")
    private String nickName;
    @Schema(description = "picture", example = "profile.jpg")
    private String picture;
    @Schema(description = "accessToken", example = "ya29.a0Ael9sCPo1lWNn")
    private String accessToken;

    public UserLoginResponse(User user, String accessToken) {
        this.userID = user.getUserID();
        this.nickName = user.getNickname();
        this.picture = user.getProfileUrl();
        this.accessToken = accessToken;
    }

}