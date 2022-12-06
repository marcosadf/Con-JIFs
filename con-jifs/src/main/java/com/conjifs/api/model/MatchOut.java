package com.conjifs.api.model;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MatchOut {
	private String locale;
	private Date dateTime;
	private List<DisputeOut> dispute; 
}
