package com.ownsong.api.album.repository;

import com.ownsong.api.album.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long>, AlbumRepositorySupport {
    List<Album> findAllByAlbumTitleContaining(String search);
}
