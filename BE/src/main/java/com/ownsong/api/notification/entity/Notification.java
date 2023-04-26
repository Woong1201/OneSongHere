package com.ownsong.api.notification.entity;


import lombok.AccessLevel;
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

    @Column(name = "TYPE", length = 10)
    private String type;

    public Notification(long notiId, String type) {
        this.notiId = notiId;
        this.type = type;
    }
}
