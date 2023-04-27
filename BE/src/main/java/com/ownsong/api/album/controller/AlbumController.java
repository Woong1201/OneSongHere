package com.ownsong.api.album.controller;


import com.ownsong.api.album.dto.response.AlbumResponse;
import com.ownsong.api.album.service.AlbumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

@Tag(name = "AlbumController", description = "앨범 API")
@RestController
@RequestMapping("/api/v1/album")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    @Operation(summary = "앨범 단건 조회", description = "앨범 id로 앨범 내용 단건 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = @Content(schema = @Schema(implementation = AlbumResponse.class))),
    })
    @GetMapping(value = "{albumId}")
    public ResponseEntity<?> getAlbums(@NotNull @PathVariable Long albumId){
        AlbumResponse album = albumService.getAlbum(albumId);
        return ResponseEntity.ok().body(album);
    }

}
