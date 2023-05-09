package com.ownsong.api.relayStudio.dto.response;


import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.relayStudio.entity.RelayStudioTag;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class RelayStudioListResponse {

    @Schema(description = "relayStudioID", example = "1")
    private long relayStudioID;

    @Schema(description = "제목", example = "제목입니다.")
    private String relayStudioTitle;

    @Schema(description = "태그", example = "[\"락\", \"발라드\", \"십덕\"]")
    private List<String> tags = new ArrayList<>();

    public RelayStudioListResponse(RelayStudio relayStudio) {
        this.relayStudioID = relayStudio.getRelayStudioID();
        this.relayStudioTitle = relayStudio.getRelayStudioTitle();
        for (RelayStudioTag relayStudioTag : relayStudio.getRelayStudioTags()) {
            this.tags.add(relayStudioTag.getRelayStudioTagContent());
        }
    }
}
