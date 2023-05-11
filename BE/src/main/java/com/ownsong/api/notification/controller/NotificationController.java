package com.ownsong.api.notification.controller;

import com.ownsong.api.notification.dto.response.NotificationResponse;
import com.ownsong.api.notification.service.NotificationService;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
@Validated
@Tag(name = "Notification-Api", description = "Notification-Api 입니다.")
public class NotificationController {
    private final UserService userService;
    private final NotificationService notificationService;

    @Operation(summary = "notification 삭제", description = "notification 삭제 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "notification 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @DeleteMapping("/{notiId}")
    public ResponseEntity<?> relayStudioAdd(@PathVariable Long notiId) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        // 입력받은 notification 제거
        if (!notificationService.deleteNotification(notiId, user))
            return ResponseEntity.status(400).body("잘못된 접근");

        return ResponseEntity.status(200).body(null);
    }

    @Operation(summary = "notification 조회", description = "notification 조회 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "notification 조회 성공", content = @Content(array = @ArraySchema(schema = @Schema(implementation = NotificationResponse.class)))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping("/")
    public ResponseEntity<?> notificationsGet() throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        // notifications 조회
        List<NotificationResponse> notificationResponses = notificationService.getNotifications(user);
        if (notificationResponses == null)
            return ResponseEntity.status(400).body("잘못된 접근");

        return ResponseEntity.status(200).body(notificationResponses);
    }
}
