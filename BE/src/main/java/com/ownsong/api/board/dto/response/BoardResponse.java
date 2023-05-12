package com.ownsong.api.board.dto.response;

import com.ownsong.api.board.entity.Board;
import com.ownsong.api.board.entity.Comment;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
public class BoardResponse {
    @Schema(description = "게시글 번호", example = "1", required = true)
    @NotNull
    private long boardId;

    @Schema(description = "작성자 번호", example = "1", required = true)
    @NotNull
    private long userId;

    @Schema(description = "picture", example = "profile.jpg")
    @NotNull
    private String picture;

    @Schema(description = "작성자 닉네임 입니다.", example = "Zi존두현")
    @NotNull
    private String nickName;

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

    @Schema(description = "댓글 리스트", example = "comment List")
    @NotNull
    private List<CommentResponse> commentResponses = new ArrayList<>();

    public BoardResponse(Board board) {
        this.boardId = board.getBoardId();
        this.boardTitle = board.getBoardTitle();
        this.header = board.getHeader();
        this.boardContent = board.getBoardContent();
        this.boardDate = board.getBoardDate();
        this.userId = board.getUser().getUserID();
        this.picture = board.getUser().getProfileUrl();
        this.nickName = board.getUser().getNickname();
        for (Comment comment : board.getComments()) {
            commentResponses.add(new CommentResponse(comment));
        }
    }
}
