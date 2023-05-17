package com.ownsong.api.album.controller;


import com.ownsong.api.album.dto.request.AlbumArticleCreateRequest;
import com.ownsong.api.album.dto.request.AlbumArticleModifyRequest;
import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.service.AlbumService;
import com.ownsong.api.album.service.S3Service;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.service.UserService;
import com.ownsong.api.user.social.Constant;
import com.ownsong.exception.BusinessException;
import com.ownsong.exception.ErrorCode;
import com.ownsong.exception.customException.AlbumException;
import com.ownsong.exception.customException.UserException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@Slf4j
@Tag(name = "AlbumController", description = "앨범 API")
@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;
    private final UserService userService;
    private final S3Service s3Service;
    static long userId;
    @Operation(summary = "앨범 단건 조회", description = "앨범 id로 앨범 내용 단건 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = AlbumResponse.class))),
    })
    @GetMapping(value = "{albumId}")
    public ResponseEntity<?> getAlbum(@NotNull @PathVariable Long albumId){
        User user = userService.getLoginUser();
        // 유저의 게시물 좋아요 여부 확인을 위해 userId 여부 분리
        if(user == null){
            userId = -1;
        }else{
            userId = user.getUserID();
        }
        // 해당되는 앨범이 없으면 에러
        AlbumResponse album = albumService.findAlbumArticle(albumId, userId);
        if(album == null){
            throw new BusinessException(ErrorCode.PAGE_NOT_FOUND);
        }

        return ResponseEntity.ok().body(album);
    }

    @Operation(summary = "앨범 전체 조회", description = "앨범 전체 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AlbumResponse.class)))),
    })
    @GetMapping
    public ResponseEntity<?> getAlbums(){
        User user = userService.getLoginUser();
        // 유저의 게시물 좋아요 여부 확인을 위해 userId 여부 분리
        if(user == null){
            userId = -1;
        }else{
            userId = user.getUserID();
        }
        List<AlbumResponse> albums = albumService.getAlbumArticles(userId);
        return ResponseEntity.ok().body(albums);
    }

    @Operation(summary = "앨범 검색어 조회", description = "앨범 검색어 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AlbumResponse.class)))),
    })
    @GetMapping(value = "/search/{type}/{search}")
    public ResponseEntity<?> findAlbums(@PathVariable String type, @PathVariable String search){
        User user = userService.getLoginUser();
        // 유저의 게시물 좋아요 여부 확인을 위해 userId 여부 분리
        if(user == null){
            userId = -1;
        }else{
            userId = user.getUserID();
        }
        // 검색 기준 (nickName, title)
        Constant.SearchType searchType = Constant.SearchType.valueOf(type.toUpperCase());
        List<AlbumResponse> albums = albumService.findAlbumArticles(userId, searchType, search);

        return ResponseEntity.ok().body(albums);
    }

//    mp3 파일로 저장하는 api
//    @Operation(summary = "앨범 게시물 등록", description = "앨범 게시물 등록")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "success", content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)),
//    })
//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> createAlbumArticle(AlbumArticleCreateRequest albumArticleCreateRequest, @RequestPart MultipartFile file){
//        User user = userService.getLoginUser();
//
//        // 비 로그인시 앨범 게시물 등록 불가
//        if(user == null){
//            throw new UserException(ErrorCode.USER_UNAUTHORIZED);
//        }
//        AlbumResponse album = albumService.creatAlbumArticle(albumArticleCreateRequest, file, user);
//
//        // 잘못된 request 전송시 에러
//        if(album == null){
//            throw new AlbumException(ErrorCode.INVALID_ALBUM_INPUT_VALUE);
//        }
//
//        return ResponseEntity.ok().body(album);
//    }

    @Operation(summary = "앨범 게시물 등록", description = "앨범 게시물 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = AlbumResponse.class))),
    })
    @PostMapping()
    public ResponseEntity<?> createAlbumArticle(@RequestBody AlbumArticleCreateRequest albumArticleCreateRequest){
        User user = userService.getLoginUser();

        // 비 로그인시 앨범 게시물 등록 불가
        if(user == null){
            throw new UserException(ErrorCode.USER_UNAUTHORIZED);
        }
        AlbumResponse album = albumService.creatAlbumArticle(albumArticleCreateRequest, user);

        // 잘못된 request 전송시 에러
        if(album == null){
            throw new AlbumException(ErrorCode.INVALID_ALBUM_INPUT_VALUE);
        }

        return ResponseEntity.ok().body(album);
    }

    @Operation(summary = "앨범 게시물 삭제", description = "앨범 게시물 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success"),
    })
    @DeleteMapping(value = "{albumId}")
    public ResponseEntity<?> deleteAlbumArticle(@PathVariable long albumId){
        User user = userService.getLoginUser();
        // 로그인 하지 않을 시 게시물 삭제 불가
        if(user == null){
            throw new UserException(ErrorCode.ACCESS_UNAUTHORIZED);
        }

        // 권한 없음 (남의 게시물을 지우지 말라구욧!
        if(!albumService.deleteAlbumArticle(albumId, user)){
            throw new UserException(ErrorCode.USER_FORBIDDEN);
        }
        return ResponseEntity.ok().build();
    }

//    mp3 파일로 수정하는 api
//    @Operation(summary = "앨범 게시물 수정", description = "앨범 게시물 수정")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "success", content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)),
//    })
//    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> editAlbumArticle(AlbumArticleCreateRequest albumArticleCreateRequest, @RequestPart MultipartFile file){
//        User user = userService.getLoginUser();
//        if(user == null){
//            throw new UserException(ErrorCode.USER_UNAUTHORIZED);
//        }
//
//        // 다른 사람의 게시물 지우는경우 접근 제한
//        if(!albumService.editAlbumArticle(albumArticleCreateRequest, file, user)){
//            throw new UserException(ErrorCode.USER_FORBIDDEN);
//        }
//        return ResponseEntity.ok().build();
//    }

    @Operation(summary = "앨범 게시물 수정", description = "앨범 게시물 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = AlbumResponse.class))),
    })
    @PatchMapping()
    public ResponseEntity<?> editAlbumArticle(AlbumArticleModifyRequest albumArticleModifyRequest){
        User user = userService.getLoginUser();
        if(user == null){
            throw new UserException(ErrorCode.USER_UNAUTHORIZED);
        }

        // 다른 사람의 게시물 수정하려는 경우 접근 제한
        if(!albumService.editAlbumArticle(albumArticleModifyRequest, user)){
            throw new UserException(ErrorCode.USER_FORBIDDEN);
        }
        return ResponseEntity.ok().build();
    }



    @Operation(summary = "앨범 좋아요/취소", description = "앨범 좋아요/취소")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = AlbumResponse.class))),
    })
    @PostMapping(value = "likes/{albumId}")
    public void updateUserLike(@NotNull @PathVariable Long albumId){
        User user = userService.getLoginUser();
        if(user != null){
            albumService.updateAlbumArticleLike(albumId, user);
        }
    }

}
