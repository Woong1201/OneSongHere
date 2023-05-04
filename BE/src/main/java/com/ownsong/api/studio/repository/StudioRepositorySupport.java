package com.ownsong.api.studio.repository;

import com.ownsong.api.studio.dto.responese.StudioEntranceResponse;
import com.ownsong.api.studio.dto.responese.StudioResponse;
import com.ownsong.api.user.entity.User;

import java.util.List;

public interface StudioRepositorySupport {
    List<StudioResponse> getParticipatedStudios(User user);
    StudioEntranceResponse getParticipatedStudioInfo(long studioId);
}
