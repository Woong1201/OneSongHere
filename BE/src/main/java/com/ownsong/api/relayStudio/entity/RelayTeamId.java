package com.ownsong.api.relayStudio.entity;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class RelayTeamId implements Serializable{
    private static final long serialVersionUID = 1201L;

    @EqualsAndHashCode.Include
    public int userId;

    @EqualsAndHashCode.Include
    public int relayStudioId;
}
