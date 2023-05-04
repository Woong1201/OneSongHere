package com.ownsong.api.album.controller;


import com.ownsong.api.album.dto.request.AlbumArticleCreateRequest;
import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.entity.QAlbum;
import com.ownsong.api.album.service.AlbumService;
import com.ownsong.api.album.service.S3Service;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        if(user == null){
            userId = -1;
        }else{
            userId = user.getUserID();
        }

        AlbumResponse album = albumService.findAlbumArticle(albumId, userId);
        if(album == null){
            return ResponseEntity.status(400).body("잘못된 접근");
        }

        return ResponseEntity.ok().body(album);
    }

    @Operation(summary = "앨범 전체 조회", description = "앨범 전체 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = AlbumResponse.class))),
    })
    @GetMapping
    public ResponseEntity<?> getAlbums(){
        User user = userService.getLoginUser();
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
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = QAlbum.class))),
    })
    @GetMapping(value = "/search/{search}")
    public ResponseEntity<?> findAlbums(@PathVariable String search){
        User user = userService.getLoginUser();
        if(user == null){
            userId = -1;
        }else{
            userId = user.getUserID();
        }
        List<AlbumResponse> albums = albumService.findAlbumArticles(userId, search);
        if(albums == null){
            return ResponseEntity.status(400).body("잘못된 접근");
        }
        return ResponseEntity.ok().body(albums);
    }

    @Operation(summary = "앨범 게시물 등록", description = "앨범 게시물 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)),
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAlbumArticle(AlbumArticleCreateRequest albumArticleCreateRequest, @RequestPart MultipartFile file){
        User user = userService.getLoginUser();
        if(user == null){
            return ResponseEntity.status(400).body("로그인이 되지 않았어요~!");
        }
        AlbumResponse album = albumService.creatAlbumArticle(albumArticleCreateRequest, file, user);
        return ResponseEntity.ok().body(album);
    }

    @Operation(summary = "앨범 게시물 삭제", description = "앨범 게시물 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success"),
    })
    @DeleteMapping(value = "{albumId}")
    public ResponseEntity<?> deleteAlbumArticle(@PathVariable long albumId){
        User user = userService.getLoginUser();
        if(user == null){
            return ResponseEntity.status(400).body("로그인이 되지 않았어요~!");
        }
        if(!albumService.deleteAlbumArticle(albumId, user)){
            return ResponseEntity.status(400).body("wrong access");
        }
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "앨범 게시물 수정", description = "앨범 게시물 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)),
    })
    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editAlbumArticle(AlbumArticleCreateRequest albumArticleCreateRequest, @RequestPart MultipartFile file){
        User user = userService.getLoginUser();
        if(user == null){
            return ResponseEntity.status(400).body("로그인이 되지 않았어요~!");
        }
        if(!albumService.editAlbumArticle(albumArticleCreateRequest, file, user)){
            return ResponseEntity.status(400).body("wrong access");
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
