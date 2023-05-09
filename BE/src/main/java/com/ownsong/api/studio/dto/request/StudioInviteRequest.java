package com.ownsong.api.studio.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class StudioInviteRequest {
    @Schema(description = "스튜디오 아이디", example = "3")
    @NotNull
    private long studioId;

    @Schema(description = "초대할 유저 email", example = "doohyun123@gmail.com")
    @NotNull
    private String email;
}
