package com.ownsong.api.studio.entity;


import com.ownsong.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "studio")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Studio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "STUDIO_ID", columnDefinition = "INT UNSIGNED")
    private long studioID;

    @Column(name = "STUDIO_TITLE", length = 30)
    private String studioTitle;

    @Column(name = "END_DATE")
    private LocalDateTime endDate;

    @Column(name = "STUDIO_SHEET", columnDefinition = "TEXT")
    private String studioSheet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;


    @Builder
    public Studio(long studioID, String studioTitle, LocalDateTime endDate, String studioSheet) {
        this.studioID = studioID;
        this.studioTitle = studioTitle;
        this.endDate = endDate;
        this.studioSheet = studioSheet;
    }
}
