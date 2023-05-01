package com.ownsong.api.album.repository;

import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.entity.Likes;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import static com.ownsong.api.album.entity.QAlbum.album;
import static com.ownsong.api.album.entity.QLikes.likes;
import static com.ownsong.api.user.entity.QUser.user;

@Slf4j
@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositorySupport{
    private final JPAQueryFactory queryFactory;

    @Override
    public AlbumResponse findAlbumArticle(long albumId){
        AlbumResponse response = queryFactory
                .select(Projections.constructor(AlbumResponse.class,
                                album.albumTitle,
                                album.albumContent,
                                album.numberOfLikes,
                                album.albumUrl,
                                album.user.userID,
                                album.user.nickname,
                                album.albumId))
                .from(album)
                .where(album.albumId.eq(albumId))
                .fetchOne();
        return response;
    }

    @Override
    public List<AlbumResponse> getAlbumArticles() {
        List<AlbumResponse> albumArticles =queryFactory
                .select(Projections.constructor(AlbumResponse.class,
                        album.albumTitle,
                        album.albumContent,
                        album.numberOfLikes,
                        album.albumUrl,
                        album.user.userID,
                        album.user.nickname,
                        album.albumId))
                .from(album)
                .fetch();
        return albumArticles;
    }

    @Override
    public List<AlbumResponse> findAlbumArticles(String search) {
        List<AlbumResponse> albumArticles =queryFactory
                .select(Projections.constructor(AlbumResponse.class,
                        album.albumTitle,
                        album.albumContent,
                        album.numberOfLikes,
                        album.albumUrl,
                        album.user.userID,
                        album.user.nickname,
                        album.albumId))
                .from(album)
                .where(album.albumTitle.contains(search))
                .fetch();
        return albumArticles;
    }

    @Override
    public Likes findUserLike(long albumId, long userId) {
        Likes userLike = queryFactory
                .select(likes)
                .from(likes)
                .where(likes.album.albumId.eq(albumId), likes.user.userID.eq(userId))
                .fetchOne();

        log.info("------userLike : {}--------", userLike);
        return userLike;
    }


}
