package com.ownsong.api.album.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ALBUM_TAG")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumTag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ALBUM_TAG_ID", columnDefinition = "INT UNSIGNED")
    private long albumTagID;

    @Column(name = "ALBUM_TAG_CONTENT", columnDefinition = "TEXT")
    private String albumTagContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ALBUM_ID")
    private Album album;

    public AlbumTag(Album album, String albumTagContent) {
        this.album = album;
        this.albumTagContent = albumTagContent;
    }
}
