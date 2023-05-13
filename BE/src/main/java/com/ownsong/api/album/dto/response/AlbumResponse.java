package com.ownsong.api.album.dto.response;

import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.entity.AlbumTag;
import com.ownsong.api.album.entity.Likes;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class AlbumResponse {

    @Schema(description = "앨범제목", example = "창현이의 2집 앨범")
    @NotNull
    private String albumTitle;

    @Schema(description = "앨범 내용", example = "창현이의 화난 마음을 담은 힙합노래")
    @NotNull
    private String albumContent;

    @Schema(description = "좋아요 수", example = "777")
    @NotNull
    private long likes;

    @Schema(description = "앨범 커버 s3 주소", example = "https://s3어쩌구저쩌구")
    @NotNull
    private String albumUrl;

    @Schema(description = "user_id(DB의 PK로서의 )", example = "412")
    @NotNull
    private long userId;

    @Schema(description = "유저 닉네임", example = "zi존i창1현1iz")
    @NotNull
    private String nickName;

    @Schema(description = "유저의 좋아요 여부", example = "true")
    @NotNull
    private boolean userLike = false;

    @Schema(description = "앨범 mp3 s3 주소", example = "https://s3, 현재는 albumSheet")
    private String mp3Url;

    @Schema(description = "album_id(DB의 PK로서의 )", example = "412")
    private long albumId;

    @Schema(description = "tags", example = "['힙합', '발라드']")
    private List<String> tags = new ArrayList<>();

    @Builder
    public AlbumResponse(String albumTitle, String albumContent, long likes, String albumUrl, long userId, String nickName, long albumId, String mp3Url) {
        this.albumTitle = albumTitle;
        this.albumContent = albumContent;
        this.likes = likes;
        this.albumUrl = albumUrl;
        this.userId = userId;
        this.nickName = nickName;
        this.albumId = albumId;
        this.mp3Url = mp3Url;
    }

    public AlbumResponse(Album album) {
        this.albumTitle = album.getAlbumTitle();
        this.albumContent = album.getAlbumContent();
        this.likes = album.getNumberOfLikes();
        this.albumUrl = album.getAlbumUrl();
        this.userId = album.getUser().getUserID();
        this.nickName = album.getUser().getNickname();
        this.albumId = album.getAlbumId();
        this.mp3Url = album.getMp3Url();
        for (AlbumTag albumTag : album.getAlbumTags()) {
            this.tags.add(albumTag.getAlbumTagContent());
        }
    }

    public void setUserLike(Likes userLike){
        if(userLike != null){
            this.userLike = true;
        }
    }


}
