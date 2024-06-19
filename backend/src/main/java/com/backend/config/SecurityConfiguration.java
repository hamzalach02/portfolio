package com.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/me").permitAll()
                        .requestMatchers(HttpMethod.POST,"/createJob").permitAll()
                        .requestMatchers(HttpMethod.GET,"/allJobs").permitAll()
                        .requestMatchers(HttpMethod.GET,"/myOffers").permitAll()
                        .requestMatchers(HttpMethod.POST,"/addInterest").permitAll()
                        .requestMatchers(HttpMethod.GET,"/myProfile").permitAll()
                        .requestMatchers(HttpMethod.POST,"/addJobInterested").permitAll()
                        .requestMatchers(HttpMethod.GET,"/me").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/update").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/updatePassword").permitAll()
                        .requestMatchers(HttpMethod.GET,"/user/{userId}").permitAll()
                        .requestMatchers(HttpMethod.GET,"/createdJobOffers/{userId}").permitAll()
                        .requestMatchers(HttpMethod.GET,"/InterestedJobOffers/{userId}").permitAll()
                        .requestMatchers(HttpMethod.GET,"/verify").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost/");
        configuration.addAllowedOrigin("http://127.0.0.1/"); // Allow requests from all ports on localhost
        configuration.addAllowedMethod(HttpMethod.GET);
        configuration.addAllowedMethod(HttpMethod.POST);
        configuration.addAllowedMethod(HttpMethod.DELETE);
        configuration.addAllowedMethod(HttpMethod.PUT);
        configuration.addAllowedHeader("Authorization");
        configuration.addAllowedHeader("Content-Type");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }





}
