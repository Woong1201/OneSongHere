package com.ownsong.api.album.service;

import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;

    public AlbumResponse getAlbum(long albumId){
        AlbumResponse album = albumRepository.getAlbum(albumId);
        return album;
    }
}
