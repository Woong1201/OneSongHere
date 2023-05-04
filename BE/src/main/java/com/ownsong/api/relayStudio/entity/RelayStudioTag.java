package com.ownsong.api.relayStudio.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "RELAY_STUDIO_TAG")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RelayStudioTag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "RELAY_STUDIO_TAG_ID", columnDefinition = "INT UNSIGNED")
    private long relayStudioTagID;

    @Column(name = "RELAY_STUDIO_TAG_CONTENT", columnDefinition = "TEXT")
    private String relayStudioTagContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RELAY_STUDIO_ID")
    private RelayStudio relayStudio;

    public RelayStudioTag(RelayStudio relayStudio, String relayStudioTagContent) {
        this.relayStudio = relayStudio;
        this.relayStudioTagContent = relayStudioTagContent;
    }
}
