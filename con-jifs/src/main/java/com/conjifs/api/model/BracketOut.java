package com.conjifs.api.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BracketOut {
	private String name;
	
	private BracketOut parentBracket;

	private List<MatchOut> matchs = new ArrayList<>();

	private List<CompeteOut> competes = new ArrayList<>();
}
