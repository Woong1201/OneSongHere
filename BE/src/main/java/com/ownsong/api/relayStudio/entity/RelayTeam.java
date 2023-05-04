package com.ownsong.api.relayStudio.entity;


import com.ownsong.api.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@IdClass(RelayTeamId.class)
@Table(name = "RELAY_TEAM")
public class RelayTeam {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RELAY_STUDIO_ID")
    private RelayStudio relayStudio;

    @Column(name = "VOTE_FLAG")
    private Boolean voteFlag;

    @Column(name = "RELAY_ORDER", columnDefinition = "INT UNSIGNED")
    private int relayOrder;
}
