package com.ownsong.api.relayStudio.service;

import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.relayStudio.entity.RelayTeam;
import com.ownsong.api.relayStudio.repository.RelayStudioRepository;
import com.ownsong.api.relayStudio.dto.request.RelayStudioCreateRequest;
import com.ownsong.api.relayStudio.dto.response.RelayStudioResponse;
import com.ownsong.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RelayStudioService {
    private final RelayStudioRepository relayStudioRepository;
    public RelayStudioResponse createRelayStudio(RelayStudioCreateRequest relayStudioCreateRequest, User user) {
        RelayStudio relayStudio = relayStudioRepository.save(new RelayStudio(relayStudioCreateRequest, user));
        return new RelayStudioResponse(relayStudio, false);
    }

    public RelayStudioResponse participateRelayStudio(Long relayStudioId, User user) {
        RelayStudio relayStudio;
        // 해당 relayStudio 존재 여부 확인
        try {
            relayStudio = relayStudioRepository.findById(relayStudioId).get();
        }catch (Exception e) {
            return null;
        }

        // 해당 relayStudio 에 참여 가능한지 확인 (이미 작곡중인 유저가 존재하는지)
        if (relayStudio.getStatus() != 1)
            return null;

        // 해당 relayStudio 에 참여 가능한지 확인 (현재 유저가 이미 해당 relay 에 참여중인지)
        for (RelayTeam relayTeam : relayStudio.getRelayTeams()) {
            if (relayTeam.getUser().getUserID() == user.getUserID())
                return null;
        }

        // relayStudio 업데이트 후 return
        relayStudio.participate(user);
        relayStudioRepository.save(relayStudio);
        return new RelayStudioResponse(relayStudio, false);
    }
}
