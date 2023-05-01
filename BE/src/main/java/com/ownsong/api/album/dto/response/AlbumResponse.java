package com.ownsong.api.album.dto.response;

import com.ownsong.api.album.entity.Likes;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class AlbumResponse {

    @Schema(description = "앨범제목", example = "영웅이의 2집 앨범")
    @NotNull
    private String albumTitle;

    @Schema(description = "앨범 내용", example = "영웅이의 화난 마음을 담은 힙합노래")
    @NotNull
    private String albumContent;

    @Schema(description = "좋아요 수", example = "777")
    @NotNull
    private long likes;

    @Schema(description = "앨범 s3 주소", example = "https://s3어쩌구저쩌구")
    @NotNull
    private String albumUrl;

    @Schema(description = "user_id(DB의 PK로서의 )", example = "412")
    @NotNull
    private long userId;

    @Schema(description = "유저 닉네임", example = "zi존i히i어i로iz")
    @NotNull
    private String nickName;

    @Schema(description = "유저의 좋아요 여부", example = "true")
    @NotNull
    private boolean userLike = false;

    private long albumId;

    @Builder
    public AlbumResponse(String albumTitle, String albumContent, long likes, String albumUrl, long userId, String nickName, long albumId) {
        this.albumTitle = albumTitle;
        this.albumContent = albumContent;
        this.likes = likes;
        this.albumUrl = albumUrl;
        this.userId = userId;
        this.nickName = nickName;
        this.albumId = albumId;
    }


    public void setUserLike(Likes userLike){
        if(userLike != null){
            this.userLike = true;
        }
    }


}
