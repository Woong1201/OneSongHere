package com.ownsong.api.album.entity;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class LikesId implements Serializable {
    private static final long serialVersionUID = 1201L;

    @EqualsAndHashCode.Include
    public long userId;

    @EqualsAndHashCode.Include
    public long albumId;
}
