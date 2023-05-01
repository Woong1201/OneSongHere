package com.ownsong.api.album.repository;

import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.entity.Likes;

import java.util.List;

public interface AlbumRepositorySupport {

    AlbumResponse findAlbumArticle(long albumId);
    List<AlbumResponse> getAlbumArticles();
    List<AlbumResponse> findAlbumArticles(String search);
    Likes findUserLike(long albumId, long userId);
}
