package com.ownsong.api.studio.repository;

import com.ownsong.api.studio.dto.responese.StudioCreateResponse;
import com.ownsong.api.user.entity.User;

import java.util.List;

public interface StudioRepositorySupport {
    List<StudioCreateResponse> getParticipatedStudios(User user);
}
