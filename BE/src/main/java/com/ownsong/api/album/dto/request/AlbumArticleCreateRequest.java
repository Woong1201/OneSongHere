package com.ownsong.api.album.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class AlbumArticleCreateRequest {
    @Schema(description = "앨범제목", example = "마작맨")
    @NotNull
    private String albumTitle;

    @Schema(description = "앨범 게시물 내용", example = "마작을 하고 싶은 영웅이의 마음을 담은 노래")
    @NotNull
    private String albumContent;


    @Schema(description = "공개/비공개 여부", example = "true(공개)")
    @NotNull
    private boolean privates;

    @Schema(description = "장르(태그)", example = "힙합")
    @NotNull
    private String genre;

    public AlbumArticleCreateRequest(String albumTitle, String albumContent, boolean privates, String genre) {
        this.albumTitle = albumTitle;
        this.albumContent = albumContent;
        this.privates = privates;
        this.genre = genre;
    }
}
