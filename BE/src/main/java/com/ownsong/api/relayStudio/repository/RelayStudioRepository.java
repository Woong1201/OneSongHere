package com.ownsong.api.relayStudio.repository;


import com.ownsong.api.relayStudio.entity.RelayStudio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RelayStudioRepository extends JpaRepository<RelayStudio, Long> {
    List<RelayStudio> findByRelayStudioTitleContaining(String search);
}
