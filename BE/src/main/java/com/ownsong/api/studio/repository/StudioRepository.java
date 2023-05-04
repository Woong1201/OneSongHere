package com.ownsong.api.studio.repository;

import com.ownsong.api.studio.entity.Studio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudioRepository extends JpaRepository<Studio, Long>, StudioRepositorySupport {
}
