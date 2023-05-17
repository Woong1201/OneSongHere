package com.ownsong.api.studio.dto.responese;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudioParticipatedUserResponse {
    @Schema(description = "유저 아이디", example = "1")
    private long userId;

    @Schema(description = "닉네임", example = "hero1123")
    private String nickName;

    @Schema(description = "프로필 url", example = "http://s3~~#!23")
    private String profileUrl;

    @Builder
    public StudioParticipatedUserResponse(long userId, String nickName, String profileUrl) {
        this.userId = userId;
        this.nickName = nickName;
        this.profileUrl = profileUrl;
    }
}
