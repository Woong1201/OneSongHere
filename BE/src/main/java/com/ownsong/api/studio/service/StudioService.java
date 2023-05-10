package com.ownsong.api.studio.service;


import com.ownsong.api.sheet.entity.Sheet;
import com.ownsong.api.sheet.repository.SheetRepository;
import com.ownsong.api.studio.dto.request.StudioCreateRequest;
import com.ownsong.api.studio.dto.request.StudioInviteRequest;
import com.ownsong.api.studio.dto.request.StudioSheetRequest;
import com.ownsong.api.studio.dto.responese.StudioEntranceResponse;
import com.ownsong.api.studio.dto.responese.StudioResponse;
import com.ownsong.api.studio.entity.Studio;
import com.ownsong.api.studio.entity.StudioTeam;
import com.ownsong.api.studio.repository.StudioRepository;
import com.ownsong.api.studio.repository.StudioTeamRepository;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.repository.UserRepository;
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
    private final SheetRepository sheetRepository;
    private final UserRepository userRepository;
    private final StudioTeamRepository studioTeamRepository;

    public List<StudioResponse> getParticipatedStudios(User user){
        List<StudioResponse> studios = studioRepository.getParticipatedStudios(user);

        return studios;
    }

    @Transactional
    public StudioResponse createStudio(StudioCreateRequest studioCreateRequest, User user){
        LocalDateTime endDate = LocalDateTime.now().plusDays(7);

        Studio studio = studioRepository.save(Studio.builder()
                .studioTitle(studioCreateRequest.getStudioTitle())
                .user(user)
                .genre(studioCreateRequest.getGenre())
                .endDate(endDate)
                .build());

        studio.getStudioTeams().add(new StudioTeam(user, studio));
        studioRepository.save(studio);
        StudioResponse studioResponse = StudioResponse.builder()
                .studioId(studio.getStudioID())
                .studioTitle(studioCreateRequest.getStudioTitle())
                .hostId(user.getUserID())
                .genre(studioCreateRequest.getGenre())
                .endDate(endDate)
                .build();

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

//    스튜디오에 악보 저장
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

//    개인 악보 저장
    @Transactional
    public boolean saveSheet(StudioSheetRequest studioSheetRequest, User user){
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
        Sheet sheet = Sheet.builder()
                .sheetTitle(studioSheetRequest.getSheetTitle())
                .sheetMatrix(studioSheetRequest.getStudioSheet())
                .user(user)
                .build();
        sheetRepository.save(sheet);

        return true;
    }

    @Transactional
    public boolean invite(User user, StudioInviteRequest studioInviteRequest) {
        Studio studio;
        // studio 조회
        try {
            studio = studioRepository.findById(studioInviteRequest.getStudioId()).get();
        } catch (Exception e) {
            return false;
        }
        // studio 초대 권한 확인
        try {
            StudioTeam studioTeam = studioTeamRepository.findByStudioAndUser(studio, user);
            if (studioTeam == null)
                return false;
        } catch (Exception e) {
            return false;
        }
        // 초대하려는 유저 조회
        User inviteUser;
        try {
            inviteUser = userRepository.findByEmail(studioInviteRequest.getEmail());
            if (inviteUser == null)
                return false;
        } catch (Exception e) {
            return false;
        }
        // 유저 초대
        studio.getStudioTeams().add(new StudioTeam(inviteUser, studio));
        studioRepository.save(studio);
        return true;
    }
}
