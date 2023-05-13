package com.ownsong.api.album.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
public class AlbumArticleModifyRequest {
    @Schema(description = "album_id(DB의 PK로서의 )", example = "412")
    @NotNull
    private long albumId;

    @Schema(description = "앨범제목", example = "마작맨")
    @NotNull
    private String albumTitle;

    @Schema(description = "앨범 게시물 내용", example = "마작을 하고 싶은 영웅이의 마음을 담은 노래")
    @NotNull
    private String albumContent;

//    @Schema(description = "악보", example = "[[1, 2], [0, 1]]")
//    private String albumSheet;
//
//    @Schema(description = "태그", example = "[\"락\", \"발라드\", \"십덕\"]")
//    private List<String> tags;

    @Schema(description = "앨범 사진", example = "https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_org.jpg?61e575e8653e5920470a38d1482d7312/melon/optimize/90")
    private String albumUrl;

}
