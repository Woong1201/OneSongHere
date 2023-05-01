package com.ownsong.api.album.controller;


import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.entity.Album;
import com.ownsong.api.album.service.AlbumService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Tag(name = "AlbumController", description = "앨범 API")
@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;
    private final UserService userService;
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






//    @Operation(summary = "앨범 좋아요/취소", description = "앨범 좋아요/취소")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = AlbumResponse.class))),
//    })
//    @PostMapping(value = "likes/{albumId}")
//    public void updateUserLike(@NotNull @PathVariable Long albumId){
//        User user = userService.getLoginUser();
//        if(user != null){
//            userId = user.getUserID();
//            albumService.updateAlbumArticleLike(albumId, userId);
//        }
//    }

}
