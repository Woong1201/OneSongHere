package com.ownsong.api.notification.entity;


import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "NOTIFICATION")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "NOTI_ID", columnDefinition = "INT UNSIGNED")
    private long notiId;

    @Column(name = "TYPE", length = 20)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RELAY_STUDIO_ID")
    private RelayStudio relayStudio;

    @Builder
    public Notification(long notiId, String type, User user, RelayStudio relayStudio) {
        this.notiId = notiId;
        this.type = type;
        this.user = user;
        this.relayStudio = relayStudio;
    }
}
