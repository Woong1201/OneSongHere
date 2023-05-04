package com.ownsong.api.relayStudio.controller;

import com.ownsong.api.relayStudio.dto.request.RelayStudioCreateRequest;
import com.ownsong.api.relayStudio.dto.response.RelayStudioResponse;
import com.ownsong.api.relayStudio.service.RelayStudioService;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/relayStudios")
@Validated
@Tag(name = "RelayStudio-Api", description = "RelayStudio-Api 입니다.")
public class RelayStudioController {
    private final UserService userService;
    private final RelayStudioService relayStudioService;

    @Operation(summary = "relayStudio 등록", description = "relayStudio 등록 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayStudio 등록 성공", content = @Content(schema = @Schema(implementation = RelayStudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @PostMapping()
    public ResponseEntity<?> relayStudioAdd(@RequestBody RelayStudioCreateRequest relayStudioCreateRequest) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        // 입력받은 relayStudio 를 db에 add
        RelayStudioResponse relayStudioResponse = relayStudioService.createRelayStudio(relayStudioCreateRequest, user);

        return ResponseEntity.status(200).body(relayStudioResponse);
    }

    @Operation(summary = "relayStudio 참여", description = "relayStudio 참여 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayStudio 참여 성공", content = @Content(schema = @Schema(implementation = RelayStudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @PatchMapping("/participate/{relayStudioId}")
    public ResponseEntity<?> relayStudioParticipate(@PathVariable Long relayStudioId) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        // 입력받은 relayStudio 에 참여 가능한지 확인 후 db에 add
        RelayStudioResponse relayStudioResponse = relayStudioService.participateRelayStudio(relayStudioId, user);
        if (relayStudioResponse == null)
            return ResponseEntity.status(400).body("잘못된 접근");

        return ResponseEntity.status(200).body(relayStudioResponse);
    }

}
