package com.ownsong.api.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RedirectUrl {
    @Schema(description = "redirectUrl", example = "google.com")
    private String url;

    public RedirectUrl(String url) {
        this.url = url;
    }

}