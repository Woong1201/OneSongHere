package com.ownsong.api.board.entity;

import com.ownsong.api.board.dto.request.BoardCreateRequest;
import com.ownsong.api.board.dto.request.BoardModifyRequest;
import com.ownsong.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "BOARD")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "BOARD_ID", columnDefinition = "INT UNSIGNED")
    private long boardId;

    @Column(name = "BOARD_TITLE", length = 30)
    private String boardTitle;

    @Column(name = "HEADER", length = 10)
    private String header;

    @Column(name = "BOARD_CONTENT", columnDefinition = "TEXT")
    private String boardContent;

    @Column(name = "BOARD_DATE")
    private LocalDateTime boardDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    public Board(long boardId, String boardTitle, String header, String boardContent, LocalDateTime boardDate, User user) {
        this.boardId = boardId;
        this.boardTitle = boardTitle;
        this.header = header;
        this.boardContent = boardContent;
        this.boardDate = boardDate;
        this.user = user;
    }

    public Board(BoardCreateRequest boardCreateRequest, User user) {
        this.boardTitle = boardCreateRequest.getBoardTitle();
        this.header = boardCreateRequest.getHeader();
        this.user = user;
        this.boardContent = boardCreateRequest.getBoardContent();
        this.boardDate = LocalDateTime.now();
    }

    public void updateBoard(BoardModifyRequest boardModifyRequest) {
        this.boardTitle = boardModifyRequest.getBoardTitle();
        this.header = boardModifyRequest.getHeader();
        this.boardContent = boardModifyRequest.getBoardContent();
    }
}
