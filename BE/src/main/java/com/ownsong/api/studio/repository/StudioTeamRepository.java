package com.ownsong.api.studio.repository;

import com.ownsong.api.studio.entity.Studio;
import com.ownsong.api.studio.entity.StudioTeam;
import com.ownsong.api.studio.entity.StudioTeamId;
import com.ownsong.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudioTeamRepository extends JpaRepository<StudioTeam, StudioTeamId> {
    StudioTeam findByStudioAndUser(Studio studio, User user);
}
