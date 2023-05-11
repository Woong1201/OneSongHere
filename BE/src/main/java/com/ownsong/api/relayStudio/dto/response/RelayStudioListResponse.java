package com.ownsong.api.relayStudio.dto.response;


import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.relayStudio.entity.RelayStudioTag;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class RelayStudioListResponse {

    @Schema(description = "relayStudioID", example = "1")
    private long relayStudioID;

    @Schema(description = "제목", example = "제목입니다.")
    private String relayStudioTitle;

    @Schema(description = "종료일", example = "2023-04-28T16:41:33.6369331")
    private LocalDateTime endDate;

    @Schema(description = "태그", example = "[\"락\", \"발라드\", \"십덕\"]")
    private List<String> tags = new ArrayList<>();

    public RelayStudioListResponse(RelayStudio relayStudio) {
        this.relayStudioID = relayStudio.getRelayStudioID();
        this.relayStudioTitle = relayStudio.getRelayStudioTitle();
        this.endDate = relayStudio.getEndDate();
        for (RelayStudioTag relayStudioTag : relayStudio.getRelayStudioTags()) {
            this.tags.add(relayStudioTag.getRelayStudioTagContent());
        }
    }
}
