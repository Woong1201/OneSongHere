package com.ownsong.api.studio.entity;


import com.ownsong.api.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@IdClass(StudioTeamId.class)
@Table(name = "STUDIO_TEAM")
public class StudioTeam {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDIO_ID")
    private Studio studio;

}
