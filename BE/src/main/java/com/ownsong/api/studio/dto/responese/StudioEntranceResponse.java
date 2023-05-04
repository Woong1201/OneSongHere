package com.ownsong.api.studio.dto.responese;

import com.ownsong.api.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class StudioEntranceResponse {
    @Schema(description = "스튜디오 제목", example = "힙합 만드실분@@@")
    private String studioTitle;

    @Schema(description = "음악 장르", example = "힙합")
    private String genre;

    @Schema(description = "실시간 악보", example = "[[1,0,2,2],[2,0,2,1],[0,0,1,0]]")
    private String studioSheet;

    @Schema(description = "참여 중인 유저", example = "영웅이, 창현이")
    private List<StudioParticipatedUserResponse> users;

    public StudioEntranceResponse(String studioTitle, String genre, String studioSheet) {
        this.studioTitle = studioTitle;
        this.genre = genre;
        this.studioSheet = studioSheet;
    }
}
