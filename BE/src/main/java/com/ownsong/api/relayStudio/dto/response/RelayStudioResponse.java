package com.ownsong.api.relayStudio.dto.response;


import com.ownsong.api.relayStudio.entity.RelayStudio;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RelayStudioResponse {

    @Schema(description = "relayStudioID", example = "1")
    private long relayStudioID;

    @Schema(description = "제목", example = "제목입니다.")
    private String relayStudioTitle;

    @Schema(description = "최대 인원 수", example = "6")
    private int limitOfUsers;

    @Schema(description = "각 인원의 담당 마디 수", example = "4")
    private int numberOfBars;

    @Schema(description = "릴레이 스튜디오 악보", example = "[[1, 0, 2, 2], [2, 0, 2, 1], [0, 0, 1, 0]]")
    private String relayStudioSheet;

    @Schema(description = "참여중인 인원 수", example = "4")
    private long numberOfUsers;

    @Schema(description = "종료일", example = "2023-04-28T16:41:33.6369331")
    private LocalDateTime endDate;

    @Schema(description = "투표 완료 인원 수", example = "4")
    private int numberOfVotes;
    @Schema(description = "동의 수", example = "4")
    private int agree;
    @Schema(description = "릴레이 스튜디오 상태(1:대기중, 2:작곡중, 3:투표중)", example = "4")
    private int status;
    @Schema(description = "현재 작곡중인 userId", example = "1")
    @NotNull
    private long userId;

    @Schema(description = "참여중인 유저인지 여부", example = "true")
    private boolean participate;

    public RelayStudioResponse(RelayStudio relayStudio, boolean participate) {
        this.relayStudioID = relayStudio.getRelayStudioID();
        this.relayStudioTitle = relayStudio.getRelayStudioTitle();
        this.endDate = relayStudio.getEndDate();
        this.relayStudioSheet = relayStudio.getRelayStudioSheet();
        this.numberOfVotes = relayStudio.getNumberOfVotes();
        this.numberOfUsers = relayStudio.getNumberOfUsers();
        this.agree = relayStudio.getAgree();
        this.limitOfUsers = relayStudio.getLimitOfUsers();
        this.numberOfBars = relayStudio.getNumberOfBars();
        this.status = relayStudio.getStatus();
        this.userId = relayStudio.getUser().getUserID();
        this.participate = participate;
    }

}
