package com.backend.remo.core.config;

import com.backend.remo.core.config.JwtAuthenticationFilter;
import com.backend.remo.models.constants.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import static com.backend.remo.models.constants.Role.ADMIN;
import static com.backend.remo.models.constants.Role.MANAGER;
import static com.backend.remo.models.constants.Permission.ADMIN_CREATE;
import static com.backend.remo.models.constants.Permission.ADMIN_DELETE;
import static com.backend.remo.models.constants.Permission.ADMIN_READ;
import static com.backend.remo.models.constants.Permission.ADMIN_UPDATE;
import static com.backend.remo.models.constants.Permission.MANAGER_CREATE;
import static com.backend.remo.models.constants.Permission.MANAGER_DELETE;
import static com.backend.remo.models.constants.Permission.MANAGER_READ;
import static com.backend.remo.models.constants.Permission.MANAGER_UPDATE;
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig  {
    private final JwtAuthenticationFilter securityFilter;
    private AuthenticationProvider authenticationProvider;
    private LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return  httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/comunidade/**").hasAnyRole(ADMIN_DELETE.name(), MANAGER_DELETE.name())
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
