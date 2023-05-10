package com.ownsong.api.user.entity;

import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.entity.Likes;
import com.ownsong.api.board.entity.Board;
import com.ownsong.api.board.entity.Comment;
import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.relayStudio.entity.RelayTeam;
import com.ownsong.api.sheet.entity.Sheet;
import com.ownsong.api.studio.entity.Studio;
import com.ownsong.api.studio.entity.StudioTeam;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @Column(name = "EMAIL", length = 30)
    private String email;

//    영속성 컨텍스트 종료 방지를 위해 EAGER로 설정
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Studio> studios = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Sheet> sheets = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Album> albums = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Likes> likesList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<RelayStudio> relayStudios = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<RelayTeam> relayTeams = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<StudioTeam> studioTeams = new ArrayList<>();

    @Builder
    public User(long userID, String UID, String nickname, String profileUrl) {
        this.userID = userID;
        this.UID = UID;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
    }

    public User(ResponseEntity<Map> googleResponse) {
        this.UID = (String)googleResponse.getBody().get("id");
        this.nickname = (String)googleResponse.getBody().get("name");
        this.profileUrl = (String)googleResponse.getBody().get("picture");
        this.email = (String)googleResponse.getBody().get("email");
    }
}
