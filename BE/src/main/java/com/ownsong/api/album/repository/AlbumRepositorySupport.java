package com.ownsong.api.album.repository;

import com.ownsong.api.album.dto.response.AlbumResponse;

public interface AlbumRepositorySupport {

    AlbumResponse getAlbum(long albumId);
}
