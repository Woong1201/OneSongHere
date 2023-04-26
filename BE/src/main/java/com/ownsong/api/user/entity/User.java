package com.ownsong.api.user.entity;

import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.entity.Likes;
import com.ownsong.api.sheet.entity.Sheet;
import com.ownsong.api.studio.entity.Studio;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Studio> studios = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Sheet> sheets = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Album> albums = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Likes> likesList = new ArrayList<>();

    @Builder
    public User(long userID, String UID, String nickname, String profileUrl) {
        this.userID = userID;
        this.UID = UID;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
    }
}
