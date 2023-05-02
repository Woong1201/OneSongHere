package com.ownsong.api.album.entity;

import com.ownsong.api.user.entity.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class LikesId implements Serializable {
    private static final long serialVersionUID = 1201L;

    @EqualsAndHashCode.Include
    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @EqualsAndHashCode.Include
    @ManyToOne
    @JoinColumn(name = "ALBUM_ID")
    private Album album;

    public LikesId(User user, Album album) {
        this.user = user;
        this.album = album;
    }
}

