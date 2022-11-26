package com.conjifs.security;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.conjifs.config.LocaleConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class JWTValidateFilter extends BasicAuthenticationFilter{
	public static String HEADER_ATTRIBUTE = "Authorization";
	public static String ATTRIBUTE_PREFIX = "Bearer ";
	private static MessageSource messageSource = new LocaleConfig().messageSource();
	
	public JWTValidateFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		String attribute = request.getHeader(HEADER_ATTRIBUTE);
		
		if(attribute == null) {
			chain.doFilter(request, response);
			return;
		}
		
		if(!attribute.startsWith(ATTRIBUTE_PREFIX)) {
			chain.doFilter(request, response);
			return;
		}
		
		String token = attribute.replace(ATTRIBUTE_PREFIX, "");
		if(validateToken(token, response, request)) {
			UsernamePasswordAuthenticationToken authenticationToken = getAuthenticationToken(token);
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			chain.doFilter(request, response);
		}
	}
	
	public boolean validateToken(String token,HttpServletResponse response, HttpServletRequest request){
	    	DecodedJWT jwt = JWT.decode(token);
	    	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	    	if( jwt.getExpiresAt().before(new Date())) {
	    		response.setStatus(401);
	    		response.setHeader("Content-Type", "application/json");
	    		try {
					response.getOutputStream().print(ow.writeValueAsString(new ExpiredTokenResponse()));
				} catch (IOException e) {
					e.printStackTrace();
				}
	    		return false;
	    	}
	    	return true;
	}
	public static class ExpiredTokenResponse{
		public int status = 401;
		public String dateTime = LocalDateTime.now().toString();         
		public String title = messageSource.getMessage("expired.token", null, LocaleContextHolder.getLocale());
	}
	
	private UsernamePasswordAuthenticationToken getAuthenticationToken(String token) {
		String manager = JWT.require(Algorithm.HMAC512(JWTAuthenticationFilter.TOKEN_PASSWORD))
				.build()
				.verify(token)
				.getSubject();
		
		if(manager == null) {
			return null;
		}
		
		return new UsernamePasswordAuthenticationToken(manager, null, new ArrayList<>());
	}
	

}
