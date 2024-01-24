package com.example.securenotes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .formLogin((formLogin) -> formLogin
                        .loginProcessingUrl("/api/v1/auth/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .successHandler(loginSuccessHandler())
                        .failureHandler(loginFailureHandler())
                        .permitAll()
                )
                .logout((logout) ->
                        logout
                            .logoutUrl("/api/v1/auth/logout")
                            .logoutSuccessHandler(logoutSuccessHandler())
                                .deleteCookies("JSESSIONID")
                                .permitAll()
                )
                .authorizeHttpRequests((request) -> {
                    request
                            .requestMatchers("/api/v1/notes/**").authenticated()
                            .requestMatchers("/api/v1/auth/register").permitAll()
                            .requestMatchers(HttpMethod.POST).authenticated()
                            .anyRequest().denyAll();
                })
                .exceptionHandling((exceptionHandling) -> exceptionHandling
                        .authenticationEntryPoint(
                                (request, response, authException) ->
                                        response.setStatus(HttpStatus.UNAUTHORIZED.value())
                        )
                );
        return http.build();
    }

    private AuthenticationSuccessHandler loginSuccessHandler() {
        return (httpServletRequest, httpServletResponse, authentication) -> {
            httpServletResponse.setStatus(HttpStatus.OK.value());
        };
    }

    private AuthenticationFailureHandler loginFailureHandler() {
        return (httpServletRequest, httpServletResponse, e) ->
                httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
    }

    private LogoutSuccessHandler logoutSuccessHandler() {
        return (httpServletRequest, httpServletResponse, authentication) -> {
            httpServletResponse.setStatus(HttpStatus.OK.value());
        };
    }
}
