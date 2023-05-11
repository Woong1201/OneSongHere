package com.ownsong.api.relayStudio.controller;

import com.ownsong.api.relayStudio.dto.request.RelayStudioComposeRequest;
import com.ownsong.api.relayStudio.dto.request.RelayStudioCreateRequest;
import com.ownsong.api.relayStudio.dto.request.RelayStudioVoteRequest;
import com.ownsong.api.relayStudio.dto.response.RelayStudioListResponse;
import com.ownsong.api.relayStudio.dto.response.RelayStudioResponse;
import com.ownsong.api.relayStudio.service.RelayStudioService;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.service.UserService;
import com.ownsong.api.user.social.Constant;
import com.ownsong.exception.BusinessException;
import com.ownsong.exception.ErrorCode;
import com.ownsong.exception.ErrorResponse;
import com.ownsong.exception.customException.RelayStudioException;
import com.ownsong.exception.customException.UserException;
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
import java.rmi.RemoteException;
import java.util.ArrayList;

import static com.ownsong.exception.ErrorCode.*;

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
        if (user == null){
//            return ResponseEntity.status(USER_UNAUTHORIZED.getStatus()).body(ErrorResponse.of(USER_UNAUTHORIZED));
            throw new UserException(ErrorCode.USER_UNAUTHORIZED);
        }

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
            throw new UserException(ErrorCode.USER_UNAUTHORIZED);

        // 입력받은 relayStudio 에 참여 가능한지 확인 후 db에 add
        RelayStudioResponse relayStudioResponse = relayStudioService.participateRelayStudio(relayStudioId, user);
        if (relayStudioResponse == null){
            throw new UserException(ErrorCode.USER_FORBIDDEN);
        }

        return ResponseEntity.status(200).body(relayStudioResponse);
    }

    @Operation(summary = "relayStudio 작곡", description = "relayStudio 작곡 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayStudio 작곡 성공", content = @Content(schema = @Schema(implementation = RelayStudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @PatchMapping()
    public ResponseEntity<?> relayStudioCompose(@RequestBody RelayStudioComposeRequest relayStudioComposeRequest) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null){
            throw new UserException(USER_UNAUTHORIZED);
        }

        // 입력받은 relayStudio 작곡 가능한지 확인 후 db update
        RelayStudioResponse relayStudioResponse = relayStudioService.composeRelayStudio(relayStudioComposeRequest, user);
        if (relayStudioResponse == null)
            throw new RelayStudioException(INVALID_RELAY_STUDIO_INPUT_VALUE);

        return ResponseEntity.status(200).body(relayStudioResponse);
    }

    @Operation(summary = "delete 예시", description = "relayTeam 삭제 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayTeam 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @DeleteMapping("/team/{relayStudioId}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long relayStudioId) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null){
            throw new UserException(USER_UNAUTHORIZED);
        }

        // 입력받은 relayStudio team 제거
        if (relayStudioService.deleteTeam(relayStudioId, user) == false){
            throw new UserException(USER_FORBIDDEN);
        }

        return ResponseEntity.status(200).body(null);
    }

    @Operation(summary = "relayStudio 투표", description = "relayStudio 투표 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayStudio 투표 성공", content = @Content(schema = @Schema(implementation = RelayStudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @PatchMapping("/vote")
    public ResponseEntity<?> relayStudioCompose(@RequestBody RelayStudioVoteRequest relayStudioVoteRequest) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null){
            throw new UserException(USER_UNAUTHORIZED);
        }

        // 입력받은 relayStudio 투표 가능한지 확인 후 db update
        RelayStudioResponse relayStudioResponse = relayStudioService.voteRelayStudio(relayStudioVoteRequest, user);
        if (relayStudioResponse == null){
            throw new UserException(USER_FORBIDDEN);
        }

        return ResponseEntity.status(200).body(relayStudioResponse);
    }

    @Operation(summary = "relayStudio 상세 조회", description = "relayStudio 상세 조회 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayStudio 상세 조회 성공", content = @Content(schema = @Schema(implementation = RelayStudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping("/{relayStudioId}")
    public ResponseEntity<?> relayStudioGet(@PathVariable Long relayStudioId) throws IOException {
        User user = userService.getLoginUser();

        // 입력받은 relayStudioId 에 해당하는 relayStudio 를 조회
        RelayStudioResponse relayStudioResponse = relayStudioService.getRelayStudio(relayStudioId, user);
        if (relayStudioResponse == null){
            throw new UserException(USER_FORBIDDEN);
        }

        return ResponseEntity.status(200).body(relayStudioResponse);
    }

    @Operation(summary = "relayStudio 전체 조회", description = "relayStudio 를 참여중인 것과 참여가능한 것 나누어 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayStudios 조회 성공", content = @Content(array = @ArraySchema(schema = @Schema(implementation = RelayStudioListResponse.class)))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping()
    public ResponseEntity<?> relayStudiosGet() throws IOException {
        User user = userService.getLoginUser();
        return ResponseEntity.status(200).body(relayStudioService.getRelayStudios(user));
    }

    @Operation(summary = "relayStudio 검색", description = "relayStudios 검색 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "relayStudios 검색 성공", content = @Content(array = @ArraySchema(schema = @Schema(implementation = RelayStudioListResponse.class)))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping("/search/{type}/{search}")
    public ResponseEntity<?> relayStudiosSearch(@PathVariable String type, @PathVariable String search) throws IOException {
        User user = userService.getLoginUser();
        Constant.SearchType searchType = Constant.SearchType.valueOf(type.toUpperCase());
        return ResponseEntity.status(200).body(relayStudioService.searchRelayStudios(user, searchType, search));
    }

//    @Operation(summary = "relayStudio 전체 조회", description = "relayStudio 전체 조회 메서드입니다.")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = "relayStudio 전체 조회 성공", content = @Content(array = @ArraySchema(schema = @Schema(implementation = RelayStudioResponse.class)))),
//            @ApiResponse(responseCode = "400", description = "bad request operation")
//    })
//    @GetMapping("/all")
//    public ResponseEntity<?> relayStudiosAllGet() throws IOException {
//        User user = userService.getLoginUser();
//        return ResponseEntity.status(200).body(relayStudioService.getAllRelayStudios(user));
//    }
//
//    @Operation(summary = "참여중인 relayStudio 조회", description = "참여중인 relayStudio 조회 메서드입니다.")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = "참여중인 relayStudio 조회 성공", content = @Content(array = @ArraySchema(schema = @Schema(implementation = RelayStudioResponse.class)))),
//            @ApiResponse(responseCode = "400", description = "bad request operation")
//    })
//    @GetMapping("/participate")
//    public ResponseEntity<?> participateRelayStudiosGet() throws IOException {
//        User user = userService.getLoginUser();
//        if (user == null) {
//            return ResponseEntity.status(200).body(new ArrayList<>());
//        }
//        return ResponseEntity.status(200).body(relayStudioService.getParticipateRelayStudios(user));
//    }


}
