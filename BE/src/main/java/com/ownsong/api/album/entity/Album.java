package com.ownsong.api.album.entity;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ALBUM")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ALBUM_ID", columnDefinition = "INT UNSIGNED")
    private Long albumId;

    @Column(name = "ALBUM_URL")
    private String albumUrl;

    @Column(name = " ALBUM_TITLE", length = 30)
    private String albumTitle;

    @Column(name = " ALBUM_CONTENT", length = 30)
    private String albumContent;

    @Column(name = "LIKES", columnDefinition = "INT UNSIGNED")
    private long likes;

    @Column(name = "PRIVATES")
    private boolean privates;

    public Album(Long albumId, String albumUrl, String albumTitle, String albumContent, long likes, boolean privates) {
        this.albumId = albumId;
        this.albumUrl = albumUrl;
        this.albumTitle = albumTitle;
        this.albumContent = albumContent;
        this.likes = likes;
        this.privates = privates;
    }
}
