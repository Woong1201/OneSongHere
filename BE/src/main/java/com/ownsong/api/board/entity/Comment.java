package com.ownsong.api.board.entity;

import com.ownsong.api.board.dto.request.CommentCreateRequest;
import com.ownsong.api.board.dto.request.CommentModifyRequest;
import com.ownsong.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "COMMENT")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "COMMENT_ID", columnDefinition = "INT UNSIGNED")
    private long commentId;

    @Column(name = "COMMENT_CONTENT", length = 50)
    private String commentContent;

    @Column(name = "COMMENT_DATE")
    private LocalDateTime commentDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @Builder
    public Comment(long commentId, String commentContent, LocalDateTime commentDate, User user, Board board) {
        this.commentId = commentId;
        this.commentContent = commentContent;
        this.commentDate = commentDate;
        this.user = user;
        this.board = board;
    }

    public Comment(CommentCreateRequest commentCreateRequest, User user, Board board) {
        this.commentContent = commentCreateRequest.getCommentContent();
        this.commentDate = LocalDateTime.now();
        this.user = user;
        this.board = board;
    }

    public void modifyComment(CommentModifyRequest commentModifyRequest) {
        this.commentContent = commentModifyRequest.getCommentContent();
    }
}
