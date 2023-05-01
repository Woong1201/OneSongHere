package com.ownsong.api.album.entity;


import com.ownsong.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ALBUM")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ALBUM_ID", columnDefinition = "INT UNSIGNED")
    private long albumId;

    @Column(name = "ALBUM_URL")
    private String albumUrl;

    @Column(name = " ALBUM_TITLE", length = 30)
    private String albumTitle;

    @Column(name = " ALBUM_CONTENT", length = 30)
    private String albumContent;

    @Column(name = "NUMBER_OF_LIKES", columnDefinition = "INT UNSIGNED")
    private long numberOfLikes;

    @Column(name = "PRIVATES")
    private boolean privates;

    @Column(name = "GENRE", length = 10)
    private String genre;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private List<Likes> likesList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public Album(long albumId, String albumUrl, String albumTitle, String albumContent, long numberOfLikes, boolean privates, User user) {
        this.albumId = albumId;
        this.albumUrl = albumUrl;
        this.albumTitle = albumTitle;
        this.albumContent = albumContent;
        this.numberOfLikes = numberOfLikes;
        this.privates = privates;
        this.user = user;
    }

    public void updateNumberOfLikes(boolean isLike){
        if(isLike){
            this.numberOfLikes -= 1;
        }else{
            this.numberOfLikes += 1;
        }
    }


}
