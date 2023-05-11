package com.ownsong.api.relayStudio.entity;


import com.ownsong.api.notification.entity.Notification;
import com.ownsong.api.relayStudio.dto.request.RelayStudioComposeRequest;
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

    @OneToMany(mappedBy = "relayStudio", cascade = CascadeType.ALL)
    private List<RelayStudioTag> relayStudioTags = new ArrayList<>();

    @Builder
    public RelayStudio(long relayStudioID, String relayStudioTitle, LocalDateTime endDate, String relayStudioSheet, int numberOfVotes, int numberOfUsers, int agree, int limitOfUsers, int numberOfBars, int status, User user, List<RelayStudioTag> relayStudioTags) {
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
        this.relayStudioTags = relayStudioTags;
    }

    public RelayStudio(RelayStudioCreateRequest relayStudioCreateRequest, User user) {
        this.relayStudioTitle = relayStudioCreateRequest.getRelayStudioTitle();
        this.relayStudioSheet = "";
        this.limitOfUsers = relayStudioCreateRequest.getLimitOfUsers();
        this.numberOfBars = relayStudioCreateRequest.getNumberOfBars();
        this.numberOfUsers = 0;
        this.status = 2;
        this.endDate = LocalDateTime.now().plusWeeks(1);
        this.user = user;
    }

    public void participate(User user) {
        this.status = 2;
        this.user = user;
    }

    public void update(RelayStudioComposeRequest relayStudioComposeRequest) {
        this.relayStudioSheet = relayStudioComposeRequest.getRelayStudioSheet();
        // 해당 유저의 relay 완료시 status 업데이트, 투표 초기화, noti 생성
        if (relayStudioComposeRequest.isComplete()) {
            this.status = 3;
            this.agree = 0;
            this.numberOfVotes = 0;
            this.getNotifications().clear();
            for (RelayTeam relayTeam : this.relayTeams) {
                relayTeam.initializeVoteFlag();
                this.notifications.add(
                        Notification.builder()
                                .user(relayTeam.getUser())
                                .type("voteStart")
                                .relayStudio(this)
                                .build()
                );
            }
        }
    }

    public void leader(RelayStudioComposeRequest relayStudioComposeRequest) {
        this.relayStudioSheet = relayStudioComposeRequest.getRelayStudioSheet();
        this.status = 1;
        this.numberOfUsers = 1;
    }

    public void vote(boolean vote) {
        this.numberOfVotes += 1;
        if (vote == true)
            this.agree += 1;
    }

    public void completeVote() {
        this.status = 1;
        if (agree >= this.numberOfUsers/2) {
            this.numberOfUsers += 1;
        }
        String notiType = "voteEnd";
        if (this.numberOfUsers == this.limitOfUsers)
            notiType = "compositionComplete";
        this.getNotifications().clear();
        for (RelayTeam relayTeam : this.relayTeams) {
            relayTeam.initializeVoteFlag();
            this.notifications.add(
                    Notification.builder()
                            .user(relayTeam.getUser())
                            .type(notiType)
                            .relayStudio(this)
                            .build()
            );
        }
    }
}
