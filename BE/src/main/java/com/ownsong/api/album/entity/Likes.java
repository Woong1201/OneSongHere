package com.ownsong.api.album.entity;

import com.ownsong.api.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "LIKES")
@NoArgsConstructor
@IdClass(LikesId.class)
public class Likes {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ALBUM_ID")
    private Album album;

    @Builder
    public Likes(User user, Album album) {
        this.user = user;
        this.album = album;
    }
}
