package com.ownsong.api.studio.entity;

import com.ownsong.api.user.entity.User;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class StudioTeamId implements Serializable{
    private static final long serialVersionUID = 1201L;

    @EqualsAndHashCode.Include
    private User user;

    @EqualsAndHashCode.Include
    private Studio studio;
    @Builder

    public StudioTeamId(User user, Studio studio) {
        this.user = user;
        this.studio = studio;
    }
}
