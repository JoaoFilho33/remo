package com.backend.remo.models.constants;

public enum Role {
    ADMIN("admin"),
    USER("user"),
    ADMIN_COMUNIDADE("admin_comunidade");

    private String role;

    Role(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
