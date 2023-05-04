package com.ownsong.api.studio.repository;

import com.ownsong.api.studio.dto.request.StudioCreateRequest;
import com.ownsong.api.studio.dto.responese.StudioEntranceResponse;
import com.ownsong.api.studio.dto.responese.StudioParticipatedUserResponse;
import com.ownsong.api.studio.dto.responese.StudioResponse;
import com.ownsong.api.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import static com.ownsong.api.studio.entity.QStudio.studio;
import static com.ownsong.api.studio.entity.QStudioTeam.studioTeam;
import static com.ownsong.api.user.entity.QUser.user;

@RequiredArgsConstructor
@Slf4j
public class StudioRepositoryImpl implements StudioRepositorySupport{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<StudioResponse> getParticipatedStudios(User user){

        List<StudioResponse> studios = new ArrayList<>();

        List<Long> studioIds = queryFactory
                .select(studioTeam.studio.studioID)
                .from(studioTeam)
                .where(studioTeam.user.userID.eq(user.getUserID()))
                .fetch();

        for(Long studioId : studioIds){
            StudioResponse result = queryFactory
                    .select(Projections.constructor(StudioResponse.class,
                            studio.studioID,
                            studio.studioTitle,
                            studio.genre,
                            studio.user.userID,
                            studio.endDate))
                    .from(studio)
                    .where(studio.studioID.eq(studioId))
                    .fetchOne();
            studios.add(result);
        }
        return  studios;
    }

    @Override
    public StudioEntranceResponse getParticipatedStudioInfo(long studioId) {
        List<StudioParticipatedUserResponse> studioUsers = new ArrayList<>();
        List<Long> userIds = queryFactory
                .select(studioTeam.studio.studioID)
                .from(studioTeam)
                .where(studioTeam.studio.studioID.eq(studioId))
                .fetch();

        for(Long userId : userIds){
            StudioParticipatedUserResponse result = queryFactory
                    .select(Projections.constructor(StudioParticipatedUserResponse.class,
                            user.userID,
                            user.nickname,
                            user.profileUrl))
                    .from(user)
                    .where(user.userID.eq(userId))
                    .fetchOne();
            studioUsers.add(result);
        }

        StudioEntranceResponse result = queryFactory
                .select(Projections.constructor(StudioEntranceResponse.class,
                        studio.studioTitle,
                        studio.genre,
                        studio.studioSheet))
                .from(studio)
                .where(studio.studioID.eq(studioId))
                .fetchOne();

        result.setUsers(studioUsers);
        return result;
    }


}
