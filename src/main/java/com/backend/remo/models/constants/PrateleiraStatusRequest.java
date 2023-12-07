package com.backend.remo.models.constants;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class PrateleiraStatusRequest {
    @JsonProperty("status_filme")
    String statusFilme;
}
