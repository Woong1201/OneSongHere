package com.ownsong.api.sheet.entity;

import com.ownsong.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "SHEET")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sheet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "SHEET", columnDefinition = "INT UNSIGNED")
    private Long sheetID;

    @Column(name = "SHEET_MATRIX", columnDefinition = "TEXT")
    private String sheetMatrix;

    @Column(name = "SHEET_TITLE", length = 30)
    private String sheetTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;


    public Sheet(Long sheetID, String sheetMatrix, String sheetTitle) {
        this.sheetID = sheetID;
        this.sheetMatrix = sheetMatrix;
        this.sheetTitle = sheetTitle;
    }
}
