package com.ownsong.api.relayStudio.entity;


import com.ownsong.api.user.entity.User;
import lombok.Builder;
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
    private boolean voteFlag;

    @Column(name = "RELAY_ORDER", columnDefinition = "INT UNSIGNED")
    private int relayOrder;

    @Builder
    public RelayTeam(User user, RelayStudio relayStudio, Boolean voteFlag, int relayOrder) {
        this.user = user;
        this.relayStudio = relayStudio;
        this.voteFlag = voteFlag;
        this.relayOrder = relayOrder;
    }

    public RelayTeam(RelayStudio relayStudio) {
        this.user = relayStudio.getUser();
        this.relayStudio = relayStudio;
        this.relayOrder = relayStudio.getNumberOfUsers();
        this.voteFlag = false;
    }

    public RelayTeam(User user, int relayOrder) {
        this.user = user;
        this.relayOrder = relayOrder;
    }

    public void initializeVoteFlag() {
        this.voteFlag = false;
    }
    public void vote() {
        this.voteFlag = true;
    }
}
