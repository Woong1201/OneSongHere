package com.ownsong.api.studio.service;


import com.ownsong.api.studio.dto.responese.StudioCreateResponse;
import com.ownsong.api.studio.entity.Studio;
import com.ownsong.api.studio.entity.StudioTeam;
import com.ownsong.api.studio.entity.StudioTeamId;
import com.ownsong.api.studio.repository.StudioRepository;
import com.ownsong.api.studio.repository.StudioTeamRepository;
import com.ownsong.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class StudioService {
    private final StudioRepository studioRepository;
    private final StudioTeamRepository studioTeamRepository;

    public List<StudioCreateResponse> getParticipatedStudios(User user){
        List<StudioCreateResponse> studios = studioRepository.getParticipatedStudios(user);

        return studios;
    }
}
