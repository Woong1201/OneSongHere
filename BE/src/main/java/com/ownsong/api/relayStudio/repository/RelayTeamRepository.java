package com.ownsong.api.relayStudio.repository;


import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.relayStudio.entity.RelayTeam;
import com.ownsong.api.relayStudio.entity.RelayTeamId;
import com.ownsong.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelayTeamRepository extends JpaRepository<RelayTeam, RelayTeamId> {
    void deleteRelayTeamByUserAndRelayStudio(User user, RelayStudio relayStudio);

}