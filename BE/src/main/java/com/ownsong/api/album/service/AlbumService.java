package com.ownsong.api.album.service;

import com.ownsong.api.album.dto.request.AlbumArticleCreateRequest;
import com.ownsong.api.album.dto.request.AlbumArticleModifyRequest;
import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.entity.AlbumTag;
import com.ownsong.api.album.entity.Likes;
import com.ownsong.api.album.entity.LikesId;
import com.ownsong.api.album.repository.AlbumRepository;
import com.ownsong.api.album.repository.LikesRepository;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.social.Constant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final LikesRepository likesRepository;
//    private final S3Service s3Service;
    public AlbumResponse findAlbumArticle(long albumId, long userId){
        AlbumResponse albumArticle = albumRepository.findAlbumArticle(albumId);
        Likes userLike = albumRepository.findUserLike(albumId, userId);
        albumArticle.setUserLike(userLike);
        return albumArticle;
    }

    public List<AlbumResponse> getAlbumArticles(long userId){
        List<AlbumResponse> albums = albumRepository.getAlbumArticles();
        for(AlbumResponse albumResponse : albums){
            long albumId = albumResponse.getAlbumId();

            Likes userLike = albumRepository.findUserLike(albumId, userId);
            albumResponse.setUserLike(userLike);
        }
        return albums;
    }

    public List<AlbumResponse> findAlbumArticles(long userId, Constant.SearchType searchType, String search){
        List<Album> albums = albumRepository.findAllByAlbumTitleContaining(search);
        List<AlbumResponse> albumResponses = new ArrayList<>();
        for(Album album : albums){
            AlbumResponse albumResponse = new AlbumResponse(album);
            long albumId = album.getAlbumId();
            Likes userLike = albumRepository.findUserLike(albumId, userId);
            albumResponse.setUserLike(userLike);
            albumResponses.add(albumResponse);
        }
        return albumResponses;
    }

    @Transactional
    public AlbumResponse creatAlbumArticle(AlbumArticleCreateRequest albumArticleCreateRequest, User user){
        Album album = new Album(albumArticleCreateRequest, user);
        for (String tag : albumArticleCreateRequest.getTags()) {
            album.getAlbumTags().add(new AlbumTag(album, tag));
        }
        return new AlbumResponse(albumRepository.save(album));
    }

    @Transactional
    public boolean deleteAlbumArticle(long albumId, User user){
        Album album;
        try{
            album = albumRepository.findById(albumId).get();
        }catch (Exception e){
            return false;
        }
        if(album.getUser().getUserID() != user.getUserID()){
            return false;
        }
        albumRepository.delete(album);
        return true;
    }

    @Transactional
    public boolean editAlbumArticle(AlbumArticleModifyRequest albumArticleModifyRequest, User user){
        Album album;
        try{
            album = albumRepository.findById(albumArticleModifyRequest.getAlbumId()).get();
        }catch (Exception e){
            return false;
        }
        if(album.getUser().getUserID() != user.getUserID()){
            return false;
        }
        album.updateAlbumArticle(albumArticleModifyRequest);
        albumRepository.save(album);

        return true;
    }




    @Transactional
    public void updateAlbumArticleLike(long albumId, User user){
        Album album = albumRepository.findById(albumId).orElse(null);
//        좋아요 가져온다음에 좋아요인지 싫어요인지에 따라 바꾸고 총 좋아요 수 업뎃
        LikesId key = new LikesId(user, album);

        if(likesRepository.findById(key).isPresent()){
            // likes를 앨범과의 관계에서 끊고 likes 삭제 후 저장
            Likes likes = likesRepository.findById(key).get();
            album.getLikesList().remove(likes);
            likesRepository.deleteLikesByAlbumAndUser(album, user);
            album.updateNumberOfLikes(false);
        }
        else{
            Likes likes = Likes.builder()
                    .user(user)
                    .album(album)
                    .build();
            album.getLikesList().add(likes);
            album.updateNumberOfLikes(true);
        }
//        총 좋아요 수 업데이트 & else 에서 관계 맺은 앨범 업데이트
        albumRepository.save(album);
    }




}
