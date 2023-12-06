package com.backend.remo.models.usuario;


import com.backend.remo.models.Prateleira;
import com.backend.remo.models.Segue;
import com.backend.remo.models.constants.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "data_nasc")
    private Timestamp dataNasc;

    @Column(name = "biografia")
    private String biografia;

    @Column(name = "foto")
    private String foto;

    @Column(name = "role")
    private Role role;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
    private List<Prateleira> prateleiras;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "seguidor")
    private List<Segue> seguidor;


    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "seguido")
    private List<Segue> seguido;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == Role.ADMIN.ADMIN) {
            return List.of(new SimpleGrantedAuthority(
                    "ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER"),
            new SimpleGrantedAuthority("ROLE_ADMIN_COMUNIDADE"));
        }else if(this.role == Role.ADMIN_COMUNIDADE){
            return List.of(new SimpleGrantedAuthority(
                            "ROLE_ADMIN_COMUNIDADE"),
                    new SimpleGrantedAuthority("ROLE_USER"));
        }
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
