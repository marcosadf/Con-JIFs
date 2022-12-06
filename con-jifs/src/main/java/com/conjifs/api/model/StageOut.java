package com.conjifs.api.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StageOut {	
	private String nameModality;

	private String nameStage;
	
	private Boolean concluded = false;
	
	private StageOut parentStage;

	private List<BracketOut> brackets = new ArrayList<>(); 
	
}
