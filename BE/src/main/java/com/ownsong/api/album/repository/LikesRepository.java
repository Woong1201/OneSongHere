package com.ownsong.api.album.repository;

import com.ownsong.api.album.entity.Likes;
import com.ownsong.api.album.entity.LikesId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, LikesId>{
}
