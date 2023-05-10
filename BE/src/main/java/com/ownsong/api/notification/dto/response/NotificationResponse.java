package com.ownsong.api.notification.dto.response;

import com.ownsong.api.notification.entity.Notification;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotificationResponse {

    @Schema(description = "notiId", example = "1")
    private long notiId;

    @Schema(description = "relayStudioID", example = "1")
    private long relayStudioID;

    @Schema(description = "relayStudio 제목", example = "relayStudio 제목입니다.")
    private String relayStudioTitle;

    @Schema(description = "notificationType", example = "투표시작, 투표완료, 작곡완료")
    private String type;

    public NotificationResponse(Notification notification) {
        this.notiId = notification.getNotiId();
        this.relayStudioID = notification.getRelayStudio().getRelayStudioID();
        this.relayStudioTitle = notification.getRelayStudio().getRelayStudioTitle();
        this.type = notification.getType();
    }
}
