package com.ownsong.api.studio.repository;

import com.ownsong.api.studio.dto.responese.StudioCreateResponse;
import com.ownsong.api.user.entity.QUser;
import com.ownsong.api.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import static com.ownsong.api.studio.entity.QStudio.studio;
import static com.ownsong.api.studio.entity.QStudioTeam.studioTeam;

@RequiredArgsConstructor
@Slf4j
public class StudioRepositoryImpl implements StudioRepositorySupport{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<StudioCreateResponse> getParticipatedStudios(User user){

        List<StudioCreateResponse> studios = new ArrayList<>();

        List<Long> studioIds = queryFactory
                .select(studioTeam.studio.studioID)
                .from(studioTeam)
                .where(studioTeam.user.userID.eq(user.getUserID()))
                .fetch();

        for(Long studioId : studioIds){
            StudioCreateResponse result = queryFactory
                    .select(Projections.constructor(StudioCreateResponse.class,
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
}
