package com.backend.remo.security;

import org.keycloak.adapters.authorization.integration.jakarta.ServletPolicyEnforcerFilter;
import org.keycloak.adapters.authorization.spi.ConfigurationResolver;
import org.keycloak.adapters.authorization.spi.HttpRequest;
import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.representations.adapters.config.PolicyEnforcerConfig;
import org.keycloak.util.JsonSerialization;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

import java.io.IOException;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    String jwkSetUri = "http://localhost:8090/realms/remo/protocol/openid-connect/certs";
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception{
       /* http
                .oauth2Client(Customizer.withDefaults())
                .oauth2Login(Customizer.withDefaults())
                .logout( lo -> lo.logoutSuccessUrl("http://localhost:8090/realms/remo/protocol/openid-connect/logout"));*/
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers( "/oauth2/**", "/login/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
                .addFilterAfter(createPolicyEnforcerFilter(), BearerTokenAuthenticationFilter.class);
        return http.build();
    }

    public ServletPolicyEnforcerFilter createPolicyEnforcerFilter(){
        return new ServletPolicyEnforcerFilter(new ConfigurationResolver() {
            @Override
            public PolicyEnforcerConfig resolve(HttpRequest httpRequest) {
                try{
                    return JsonSerialization.readValue(getClass().getResourceAsStream("/policy-enforcer.json"), PolicyEnforcerConfig.class);
                }catch (IOException e){
                    throw new RuntimeException(e);
                }
            }
        });
    }

    @Bean
    JwtDecoder jwtDecoder(){
        return NimbusJwtDecoder.withJwkSetUri(this.jwkSetUri).build();
    }

}
