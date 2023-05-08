package com.ownsong.api.studio.entity;


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
@Table(name = "STUDIO")
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

    @Column(name ="GENRE", length = 10)
    private String genre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "studio", cascade = CascadeType.ALL)
    private List<StudioTeam> studioTeams = new ArrayList<>();

    @Builder
    public Studio(long studioID, String studioTitle, LocalDateTime endDate, String studioSheet, User user, String genre) {
        this.studioID = studioID;
        this.studioTitle = studioTitle;
        this.endDate = endDate;
        this.studioSheet = studioSheet;
        this.user = user;
        this.genre = genre;
    }

    public void updateStudioSheet(String sheet){
        this.studioSheet = sheet;
    }

}
