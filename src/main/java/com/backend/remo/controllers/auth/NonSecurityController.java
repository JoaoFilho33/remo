package com.backend.remo.controllers.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/non-security")
public class NonSecurityController {

    @GetMapping
    public ResponseEntity<Void> nonSecurity() {
        return ResponseEntity.ok().build();
    }
}