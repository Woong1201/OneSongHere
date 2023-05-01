package com.ownsong.api.board.controller;

import com.ownsong.api.board.dto.request.BoardCreateRequest;
import com.ownsong.api.board.dto.request.BoardModifyRequest;
import com.ownsong.api.board.dto.response.BoardResponse;
import com.ownsong.api.board.service.BoardService;
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
@RequestMapping("/api/v1/board")
@Validated
@Tag(name = "Board-Api", description = "Board-Api 입니다.")
public class BoardController {

    private final UserService userService;
    private final BoardService boardService;

    @Operation(summary = "게시글 등록", description = "게시글 등록 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "게시글 등록 성공", content = @Content(schema = @Schema(implementation = BoardResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @PostMapping()
    public ResponseEntity<?> boardAdd(@RequestBody BoardCreateRequest boardCreateRequest) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null) {
            return ResponseEntity.status(400).body("로그인 안한 상태");
        }
        // 입력받은 board 를 db에 add
        BoardResponse boardResponse = boardService.createBoard(boardCreateRequest, user);

        return ResponseEntity.status(200).body(boardResponse);
    }

    @Operation(summary = "게시글 수정", description = "게시글 수정 메서드입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "게시글 수정 성공", content = @Content(schema = @Schema(implementation = BoardResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @PutMapping()
    public ResponseEntity<?> boardModify(@RequestBody BoardModifyRequest boardModifyRequest) throws IOException {
        User user = userService.getLoginUser();

        // non-login 상태면 user = null
        if (user == null)
            return ResponseEntity.status(400).body("로그인 안한 상태");

        // 입력받은 board 로 수정
        BoardResponse boardResponse = boardService.ModifyBoard(boardModifyRequest, user);
        if (boardResponse == null)
            return ResponseEntity.status(400).body("잘못된 접근");

        return ResponseEntity.status(200).body(boardResponse);
    }
}
