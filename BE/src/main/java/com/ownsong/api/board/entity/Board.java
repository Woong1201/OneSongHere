package com.ownsong.api.board.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Builder
    public Board(long boardId, String boardTitle, String header, String boardContent, LocalDateTime boardDate) {
        this.boardId = boardId;
        this.boardTitle = boardTitle;
        this.header = header;
        this.boardContent = boardContent;
        this.boardDate = boardDate;
    }
}
