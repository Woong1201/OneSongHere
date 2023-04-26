package com.ownsong.api.album.entity;

import com.ownsong.api.user.entity.User;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class LikesId implements Serializable {
    private static final long serialVersionUID = 1201L;

    @EqualsAndHashCode.Include
    private User user;

    @EqualsAndHashCode.Include
    private Album album;
}

