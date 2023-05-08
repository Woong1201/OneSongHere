package com.ownsong.api.studio.service;


import com.ownsong.api.album.dto.request.AlbumArticleCreateRequest;
import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.repository.AlbumRepository;
import com.ownsong.api.studio.dto.request.StudioCreateRequest;
import com.ownsong.api.studio.dto.request.StudioSheetRequest;
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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class StudioService {
    private final StudioRepository studioRepository;
    private final StudioTeamRepository studioTeamRepository;
    private final AlbumRepository albumRepository;

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


//   유저가 해당 스튜디오에 참여하고 있는지 아닌지를 판별
    public boolean isInStudio(User user, long studioId){
        List<Studio> studios = user.getStudios();
        for(Studio studio : studios){
            if(studio.getStudioID() == studioId){
                return true;
            }
        }
        return false;
    }


    @Transactional
    public boolean saveStudioSheet(StudioSheetRequest studioSheetRequest, User user){
        Studio studio;
        try{
            studio = studioRepository.findById(studioSheetRequest.getStudioId()).get();
        }catch (Exception e){
            log.info("saveStudioSheet error : {}", e.getMessage());
            return false;
        }
        if(!isInStudio(user, studio.getStudioID())){
            return false;
        }
        studio.updateStudioSheet(studioSheetRequest.getStudioSheet());
        log.info("user : {}, studioSheet : {}",user, studioSheetRequest.getStudioSheet());
        studioRepository.save(studio);
        return true;
    }
}
