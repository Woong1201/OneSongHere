package com.ownsong.api.board.dto.response;

import com.ownsong.api.board.entity.Board;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class BoardResponse {
    @Schema(description = "게시글 번호", example = "1", required = true)
    @NotNull
    private long boardId;

    @Schema(description = "작성자 번호", example = "1", required = true)
    @NotNull
    private long userId;

    @Schema(description = "제목", example = "제목입니다.")
    @NotNull
    private String boardTitle;

    @Schema(description = "헤더", example = "헤더입니다.")
    @NotNull
    private String header;

    @Schema(description = "내용", example = "내용입니다.")
    @NotNull
    private String boardContent;

    @Schema(description = "작성일", example = "2023-04-28T16:41:33.6369331")
    @NotNull
    private LocalDateTime boardDate;

    public BoardResponse(Board board) {
        this.boardId = board.getBoardId();
        this.boardTitle = board.getBoardTitle();
        this.header = board.getHeader();
        this.boardContent = board.getBoardContent();
        this.boardDate = board.getBoardDate();
        this.userId = board.getUser().getUserID();
    }
}
