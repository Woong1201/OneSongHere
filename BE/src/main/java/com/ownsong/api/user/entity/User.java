package com.ownsong.api.user.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "USER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_ID", columnDefinition = "INT UNSIGNED")
    private long userID;

    @Column(name = "UID")
    private String UID;

    @Column(name = "NICKNAME", length = 30)
    private String nickname;

    @Column(name = "PROFILE_URL")
    private String profileUrl;

    @Builder
    public User(long userID, String UID, String nickname, String profileUrl) {
        this.userID = userID;
        this.UID = UID;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
    }
}
