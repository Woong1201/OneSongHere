package com.ownsong.api.album.entity;


import com.ownsong.api.album.dto.request.AlbumArticleCreateRequest;
import com.ownsong.api.album.dto.request.AlbumArticleModifyRequest;
import com.ownsong.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Column(name = "ALBUM_TITLE", length = 30)
    private String albumTitle;

    @Column(name = "ALBUM_CONTENT", columnDefinition = "TEXT")
    private String albumContent;

    @Column(name = "NUMBER_OF_LIKES", columnDefinition = "INT UNSIGNED")
    private long numberOfLikes;

    @Column(name = "MP3_URL", columnDefinition = "TEXT")
    private String mp3Url;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private List<Likes> likesList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private List<AlbumTag> albumTags = new ArrayList<>();

    @Builder
    public Album(long albumId, String albumUrl, String albumTitle, String albumContent, long numberOfLikes, User user, String mp3Url) {
        this.albumId = albumId;
        this.albumUrl = albumUrl;
        this.albumTitle = albumTitle;
        this.albumContent = albumContent;
        this.numberOfLikes = numberOfLikes;
        this.user = user;
        this.mp3Url = mp3Url;
    }

    public Album(AlbumArticleCreateRequest albumArticleCreateRequest, User user) {
        this.albumUrl = albumArticleCreateRequest.getAlbumUrl();
        this.albumTitle = albumArticleCreateRequest.getAlbumTitle();
        this.albumContent = albumArticleCreateRequest.getAlbumContent();
        this.numberOfLikes = 0;
        this.user = user;
        this.mp3Url = albumArticleCreateRequest.getAlbumSheet();
    }

    public void updateNumberOfLikes(boolean isLike){
        if(isLike){
            this.numberOfLikes += 1;
        }else{
            this.numberOfLikes -= 1;
        }
    }
    public void updateAlbumArticle(AlbumArticleModifyRequest albumArticleModifyRequest){
        this.albumTitle = albumArticleModifyRequest.getAlbumTitle();
        this.albumContent = albumArticleModifyRequest.getAlbumContent();
        this.albumUrl = albumArticleModifyRequest.getAlbumUrl();
    }


}
