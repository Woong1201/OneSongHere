package com.ownsong.api.studio.controller;


import com.ownsong.api.relayStudio.dto.request.RelayStudioCreateRequest;
import com.ownsong.api.relayStudio.dto.response.RelayStudioResponse;
import com.ownsong.api.studio.dto.responese.StudioCreateResponse;
import com.ownsong.api.studio.service.StudioService;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/studios")
@Validated
@Tag(name = "Studios-Api", description = "Studio-Api 입니다.")
public class StudioController {
    private final UserService userService;
    private final StudioService studioService;

    @Operation(summary = "참여중인 Studio 전체 조회", description = "참여중인 스튜디오 조회 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "전체 스튜디오 조회 성공", content = @Content(schema = @Schema(implementation = RelayStudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping()
    public ResponseEntity<?> getStudios() throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        // 참여 중인 스튜디오 조회
        List<StudioCreateResponse> studios = studioService.getParticipatedStudios(user);

        return ResponseEntity.status(200).body(studios);
    }
}
