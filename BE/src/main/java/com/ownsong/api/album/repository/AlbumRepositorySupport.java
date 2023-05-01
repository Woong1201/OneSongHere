package com.ownsong.api.album.repository;

import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.entity.Likes;

import java.util.List;

public interface AlbumRepositorySupport {

    AlbumResponse findAlbumArticle(long albumId);
    List<AlbumResponse> getAlbumArticles();
    Likes findUserLike(long albumId, long userId);
}
