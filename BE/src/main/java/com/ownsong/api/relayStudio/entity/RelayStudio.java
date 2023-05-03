package com.ownsong.api.relayStudio.entity;


import com.ownsong.api.notification.entity.Notification;
import com.ownsong.api.relayStudio.dto.request.RelayStudioCreateRequest;
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
@Table(name = "RELAY_STUDIO")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RelayStudio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "RELAY_STUDIO_ID", columnDefinition = "INT UNSIGNED")
    private long relayStudioID;

    @Column(name = "RELAY_STUDIO_TITLE", length = 30)
    private String relayStudioTitle;

    @Column(name = "END_DATE")
    private LocalDateTime endDate;

    @Column(name = "RELAY_STUDIO_SHEET", columnDefinition = "TEXT")
    private String relayStudioSheet;

    @Column(name = "NUMBER_OF_VOTES", columnDefinition = "INT UNSIGNED")
    private int numberOfVotes;

    @Column(name = "NUMBER_OF_USERS", columnDefinition = "INT UNSIGNED")
    private int numberOfUsers;

    @Column(name = "AGREE", columnDefinition = "INT UNSIGNED")
    private int agree;

    @Column(name = "LIMIT_OF_USERS", columnDefinition = "INT UNSIGNED")
    private int limitOfUsers;

    @Column(name = "NUMBER_OF_BARS", columnDefinition = "INT UNSIGNED")
    private int numberOfBars;

    @Column(name = "STATUS", columnDefinition = "INT UNSIGNED")
    private int status;

    @OneToMany(mappedBy = "relayStudio", cascade = CascadeType.ALL)
    private List<Notification> notifications = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "relayStudio", cascade = CascadeType.ALL)
    private List<RelayTeam> relayTeams = new ArrayList<>();

    @Builder
    public RelayStudio(long relayStudioID, String relayStudioTitle, LocalDateTime endDate, String relayStudioSheet, int numberOfVotes, int numberOfUsers, int agree, int limitOfUsers, int numberOfBars, int status, User user) {
        this.relayStudioID = relayStudioID;
        this.relayStudioTitle = relayStudioTitle;
        this.endDate = endDate;
        this.relayStudioSheet = relayStudioSheet;
        this.numberOfVotes = numberOfVotes;
        this.numberOfUsers = numberOfUsers;
        this.agree = agree;
        this.limitOfUsers = limitOfUsers;
        this.numberOfBars = numberOfBars;
        this.status = status;
        this.user = user;
    }

    public RelayStudio(RelayStudioCreateRequest relayStudioCreateRequest, User user) {
        this.relayStudioTitle = relayStudioCreateRequest.getRelayStudioTitle();
        this.relayStudioSheet = "";
        this.limitOfUsers = relayStudioCreateRequest.getLimitOfUsers();
        this.numberOfBars = relayStudioCreateRequest.getNumberOfBars();
        this.numberOfUsers = 0;
        this.status = 2;
        this.user = user;
    }

    public void participate(User user) {
        this.status = 2;
        this.user = user;
    }
}
