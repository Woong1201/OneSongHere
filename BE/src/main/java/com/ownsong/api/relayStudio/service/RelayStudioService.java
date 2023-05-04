package com.ownsong.api.relayStudio.service;

import com.ownsong.api.relayStudio.dto.request.RelayStudioComposeRequest;
import com.ownsong.api.relayStudio.dto.request.RelayStudioVoteRequest;
import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.relayStudio.entity.RelayStudioTag;
import com.ownsong.api.relayStudio.entity.RelayTeam;
import com.ownsong.api.relayStudio.entity.RelayTeamId;
import com.ownsong.api.relayStudio.repository.RelayStudioRepository;
import com.ownsong.api.relayStudio.dto.request.RelayStudioCreateRequest;
import com.ownsong.api.relayStudio.dto.response.RelayStudioResponse;
import com.ownsong.api.relayStudio.repository.RelayTeamRepository;
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
    private final RelayTeamRepository relayTeamRepository;

    public RelayStudioResponse createRelayStudio(RelayStudioCreateRequest relayStudioCreateRequest, User user) {
        RelayStudio relayStudio = new RelayStudio(relayStudioCreateRequest, user);
        for (String relayStudioTagContent : relayStudioCreateRequest.getTags()) {
            relayStudio.getRelayStudioTags().add(new RelayStudioTag(relayStudio, relayStudioTagContent));
        }
        return new RelayStudioResponse(relayStudioRepository.save(relayStudio), false, false);
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
        return new RelayStudioResponse(relayStudio, false, false);
    }

    public RelayStudioResponse composeRelayStudio(RelayStudioComposeRequest relayStudioComposeRequest, User user) {
        RelayStudio relayStudio;
        // 해당 relayStudio 존재 여부 확인
        try {
            relayStudio = relayStudioRepository.findById(relayStudioComposeRequest.getRelayStudioID()).get();
        }catch (Exception e) {
            return null;
        }

        // 해당 relayStudio 에 접근 가능한지 확인
        if (relayStudio.getStatus() != 2 || relayStudio.getUser().getUserID() != user.getUserID())
            return null;

        // 릴레이 작곡 시작 유저인 경우
        if (relayStudio.getNumberOfUsers() == 0) {
            relayStudio.leader(relayStudioComposeRequest);
            RelayTeam relayTeam = new RelayTeam(relayStudio);
            relayStudio.getRelayTeams().add(relayTeam);
            relayStudioRepository.save(relayStudio);
            return new RelayStudioResponse(relayStudio, true, false);
        }

        // relayStudio 업데이트 및 투표 초기화 후 return (추후 알림 필요)
        relayStudio.update(relayStudioComposeRequest);
        relayStudioRepository.save(relayStudio);
        return new RelayStudioResponse(relayStudio, false, false);
    }

    public boolean deleteTeam(Long relayStudioId, User user) {
        RelayStudio relayStudio;
        // 해당 relayStudio 존재 여부 확인
        try {
            relayStudio = relayStudioRepository.findById(relayStudioId).get();
        }catch (Exception e) {
            return false;
        }

        // 입력한 relayStudio 와 login 된 user 로 이루어진 relayTeam 확인 후 삭제
        try {
            for (RelayTeam relayTeam : relayStudio.getRelayTeams()) {
                if (relayTeam.getUser().getUserID() == user.getUserID()) {
                    // 부모 entity 에서 연결을 끊어준 후 삭제
                    relayStudio.getRelayTeams().remove(relayTeam);
                    relayTeamRepository.deleteRelayTeamByUserAndRelayStudio(user, relayStudio);
                    return true;
                }
            }
        }catch (Exception e) {
            return false;
        }
        return false;
    }

    public RelayStudioResponse voteRelayStudio(RelayStudioVoteRequest relayStudioVoteRequest, User user) {
        RelayStudio relayStudio;
        // 해당 relayStudio 존재 여부 확인
        try {
            relayStudio = relayStudioRepository.findById(relayStudioVoteRequest.getRelayStudioId()).get();
        }catch (Exception e) {
            return null;
        }
        // 해당 relayStudio status 를 통해 투표중인지 확인
        if (relayStudio.getStatus() != 3)
            return null;

        // 투표권한이 있는지 확인 후 db 업데이트
        try {
            for (RelayTeam relayTeam : relayStudio.getRelayTeams()) {
                if (relayTeam.getUser().getUserID() == user.getUserID()) {
                    if (relayTeam.isVoteFlag())
                        return null;
                    relayTeam.vote();
                    relayStudio.vote(relayStudioVoteRequest.isVote());

                    // 만약 모두 투표한 경우 studio 대기 상태로 update (추후 알림 필요)
                    if (relayStudio.getNumberOfUsers() == relayStudio.getNumberOfVotes()) {
                        if (relayStudio.getAgree() >= relayStudio.getNumberOfUsers()/2) {
                            relayStudio.getRelayTeams().add(new RelayTeam(relayStudio));
                        }
                        relayStudio.completeVote();
                    }
                    return new RelayStudioResponse(relayStudioRepository.save(relayStudio), true, true);
                }
            }
        }catch (Exception e) {
            System.out.println(e);
            return null;
        }
        return null;
    }
}
