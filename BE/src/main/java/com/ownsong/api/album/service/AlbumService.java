package com.ownsong.api.album.service;

import com.ownsong.api.album.dto.request.AlbumArticleCreateRequest;
import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.entity.Likes;
import com.ownsong.api.album.entity.LikesId;
import com.ownsong.api.album.repository.AlbumRepository;
import com.ownsong.api.album.repository.LikesRepository;
import com.ownsong.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final LikesRepository likesRepository;
    private final S3Service s3Service;
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

    public List<AlbumResponse> findAlbumArticles(long userId, String search){
        List<AlbumResponse> albums = albumRepository.findAlbumArticles(search);
        for(AlbumResponse albumResponse : albums){
            long albumId = albumResponse.getAlbumId();
            Likes userLike = albumRepository.findUserLike(albumId, userId);
            albumResponse.setUserLike(userLike);
        }
        return albums;
    }

    // 앨범커버에 대해서는 프론트 생성페이지 나오고 작업해야함
    @Transactional
    public AlbumResponse creatAlbumArticle(AlbumArticleCreateRequest albumArticleCreateRequest, MultipartFile file, User user){
        String filePath = s3Service.uploadFile(file);
        Album album = Album.builder()
                .albumTitle(albumArticleCreateRequest.getAlbumTitle())
                .albumContent(albumArticleCreateRequest.getAlbumContent())
                .numberOfLikes(0)
                .mp3Url(filePath)
                .user(user)
                .genre(albumArticleCreateRequest.getGenre())
                .build();
        album = albumRepository.save(album);

        AlbumResponse albumResponse = AlbumResponse.builder()
                .albumTitle(album.getAlbumTitle())
                .albumContent(album.getAlbumContent())
                .likes(0)
                .mp3Url(filePath)
                .albumId(album.getAlbumId())
                .nickName(user.getNickname())
                .userId(user.getUserID())
                .genre(album.getGenre())
                .build();

        return albumResponse;
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
    public boolean editAlbumArticle(AlbumArticleCreateRequest albumArticleCreateRequest, MultipartFile file, User user){
        Album album;
        String filePath;
        try{
            album = albumRepository.findById(albumArticleCreateRequest.getAlbumId()).get();
            filePath = s3Service.uploadFile(file);
        }catch (Exception e){
            return false;
        }
        if(album.getUser().getUserID() != user.getUserID()){
            return false;
        }
        album.updateAlbumArticle(albumArticleCreateRequest, filePath);
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
