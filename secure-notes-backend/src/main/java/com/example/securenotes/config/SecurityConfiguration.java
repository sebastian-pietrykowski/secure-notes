package com.example.securenotes.config;

import com.example.securenotes.service.UserService;
import lombok.RequiredArgsConstructor;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final CustomAuthProvider customAuthProvider;
    private final UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .cors((cors) -> cors.configurationSource(corsConfigurationSource()))
                .authenticationProvider(customAuthProvider)
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
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID")
                                .permitAll()
                )
                .authorizeHttpRequests((request) -> {
                    request
                            .requestMatchers("/api/v1/notes/**").authenticated()
                            .requestMatchers("/api/v1/notes/encrypted/**").authenticated()
                            .requestMatchers("/api/v1/auth/register").permitAll()
                            .requestMatchers(HttpMethod.POST).authenticated()
                            .requestMatchers(HttpMethod.GET).authenticated()
                            .requestMatchers(HttpMethod.DELETE).authenticated()
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

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(List.of("GET", "POST", "DELETE"));
        configuration.setAllowedHeaders(List.of("content-type", "authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    private AuthenticationSuccessHandler loginSuccessHandler() {
        return (httpServletRequest, httpServletResponse, authentication) -> {
            System.out.println("Login successful");
            userService.resetFailedLoginAttempts(authentication.getName());
            httpServletResponse.setStatus(HttpStatus.OK.value());
        };
    }

    private AuthenticationFailureHandler loginFailureHandler() {
        return (httpServletRequest, httpServletResponse, e) -> {
            System.out.println("Login failed");
            userService.incrementFailedLoginAttempts(httpServletRequest.getParameter("email"));
            try {
                Thread.sleep(2000);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
            httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        };
    }

    private LogoutSuccessHandler logoutSuccessHandler() {
        return (httpServletRequest, httpServletResponse, authentication) -> {
            httpServletResponse.setStatus(HttpStatus.OK.value());
        };
    }
}
