package com.ownsong.api.album.repository;

import com.ownsong.api.album.dto.response.AlbumResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static com.ownsong.api.album.entity.QAlbum.album;
import static com.ownsong.api.user.entity.QUser.user;

@Slf4j
@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositorySupport{
    private final JPAQueryFactory queryFactory;

    @Override
    public AlbumResponse getAlbum(long albumId){
        AlbumResponse response = queryFactory
                .select(Projections.constructor(AlbumResponse.class,
                                album.albumTitle,
                                album.albumContent,
                                album.likes,
                                album.albumUrl,
                                album.user.userID,
                                album.user.nickname))
                .from(album)
                .where(album.albumId.eq(albumId))
                .fetchOne();
        return response;
    }

}
