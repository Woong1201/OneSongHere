package com.ownsong.api.studio.service;


import com.ownsong.api.studio.dto.request.StudioCreateRequest;
import com.ownsong.api.studio.dto.responese.StudioEntranceResponse;
import com.ownsong.api.studio.dto.responese.StudioResponse;
import com.ownsong.api.studio.entity.Studio;
import com.ownsong.api.studio.repository.StudioRepository;
import com.ownsong.api.studio.repository.StudioTeamRepository;
import com.ownsong.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class StudioService {
    private final StudioRepository studioRepository;
    private final StudioTeamRepository studioTeamRepository;

    public List<StudioResponse> getParticipatedStudios(User user){
        List<StudioResponse> studios = studioRepository.getParticipatedStudios(user);

        return studios;
    }

    @Transactional
    public StudioResponse createStudio(StudioCreateRequest studioCreateRequest, User user){
        LocalDateTime endDate = LocalDateTime.now().plusDays(7);

        Studio studio = Studio.builder()
                .studioTitle(studioCreateRequest.getStudioTitle())
                .user(user)
                .genre(studioCreateRequest.getGenre())
                .endDate(endDate)
                .build();

        StudioResponse studioResponse = StudioResponse.builder()
                .studioTitle(studioCreateRequest.getStudioTitle())
                .hostId(user.getNickname())
                .genre(studioCreateRequest.getGenre())
                .endDate(endDate)
                .build();

        studioRepository.save(studio);
        return studioResponse;
    }

    public StudioEntranceResponse getParticipatedStudioInfo(long studioId){

        StudioEntranceResponse studioInfo = studioRepository.getParticipatedStudioInfo(studioId);

        return studioInfo;
    }

}
