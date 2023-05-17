package com.ownsong.api.studio.controller;


import com.ownsong.api.album.dto.request.AlbumArticleCreateRequest;
import com.ownsong.api.relayStudio.dto.response.RelayStudioResponse;
import com.ownsong.api.studio.dto.request.StudioCreateRequest;
import com.ownsong.api.studio.dto.request.StudioSheetRequest;
import com.ownsong.api.studio.dto.responese.StudioEntranceResponse;
import com.ownsong.api.studio.dto.responese.StudioResponse;
import com.ownsong.api.studio.entity.StudioTeamId;
import com.ownsong.api.studio.repository.StudioRepository;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final StudioRepository studioRepository;

    @Operation(summary = "참여중인 Studio 전체 조회", description = "참여중인 스튜디오 조회 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "전체 스튜디오 조회 성공", content = @Content(schema = @Schema(implementation = StudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping()
    public ResponseEntity<?> getStudios() throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        // 참여 중인 스튜디오 조회
        List<StudioResponse> studios = studioService.getParticipatedStudios(user);

        return ResponseEntity.status(200).body(studios);
    }

    @Operation(summary = "스튜디오 생성", description = "스튜디오 생성 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "스튜디오 생성 성공", content = @Content(schema = @Schema(implementation = StudioResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @PostMapping()
    public ResponseEntity<?> createStudio(@RequestBody StudioCreateRequest studioCreateRequest) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        StudioResponse studio = studioService.createStudio(studioCreateRequest, user);
        return ResponseEntity.status(200).body(studio);
    }

    @Operation(summary = "스튜디오 입장", description = "스튜디오 입장 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "스튜디오 입장", content = @Content(schema = @Schema(implementation = StudioEntranceResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping(value = "{studioId}")
    public ResponseEntity<?> enterStudio(@PathVariable long studioId) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");
        if(studioRepository.findById(studioId) == null){
            return ResponseEntity.status(400).body("해당 스튜디오가 없슴");
        }
        if(!studioService.isInStudio(user, studioId)){
            return ResponseEntity.status(400).body("해당 스튜디오에 참여하고있지 않습니다.");
        }

        // 참여 중인 스튜디오 조회
        StudioEntranceResponse studio = studioService.getParticipatedStudioInfo(studioId);

        return ResponseEntity.status(200).body(studio);
    }

    @Operation(summary = "일반 스튜디오 실시간 작곡 저장", description = "일반 스튜디오 실시간 작곡 저장")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = StudioSheetRequest.class))),
    })
    @PatchMapping(value = "/sheet")
    public ResponseEntity<?> saveStudioSheet(@RequestBody StudioSheetRequest studioSheetRequest){
        User user = userService.getLoginUser();
        if(user == null){
            return ResponseEntity.status(400).body("로그인이 되지 않았어요~!");
        }
        if(!studioService.saveStudioSheet(studioSheetRequest, user)){
            return ResponseEntity.status(400).body("해당 스튜디오에 참여하고있지 않습니다.");
        }

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "일반 스튜디오 작곡 저장(개인 악보저장)", description = "개인 악보저장")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = StudioSheetRequest.class))),
    })
    @PatchMapping(value = "/save")
    public ResponseEntity<?> saveSheet(@RequestBody StudioSheetRequest studioSheetRequest){
        User user = userService.getLoginUser();
        if(user == null){
            return ResponseEntity.status(400).body("로그인이 되지 않았어요~!");
        }
        if(!studioService.saveSheet(studioSheetRequest, user)){
            return ResponseEntity.status(400).body("해당 스튜디오에 참여하고있지 않습니다.");
        }
        return ResponseEntity.ok().build();
    }

}
