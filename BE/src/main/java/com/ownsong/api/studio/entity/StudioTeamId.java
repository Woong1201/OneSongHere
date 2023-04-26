package com.ownsong.api.studio.entity;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class StudioTeamId implements Serializable{
    private static final long serialVersionUID = 1201L;

    @EqualsAndHashCode.Include
    public int userId;

    @EqualsAndHashCode.Include
    public int studioId;
}
