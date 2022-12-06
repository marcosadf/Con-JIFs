package com.conjifs.api.assembler;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.conjifs.api.model.StageOut;
import com.conjifs.domain.model.Stage;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class StageAssembler {
	private ModelMapper modelMapper;
	
	public StageOut toOut(Stage stage) {
		return modelMapper.map(stage, StageOut.class);
	}

	public List<StageOut> toCollectionOut(Set<Stage> listStage) {
		return listStage.stream().map(this::toOut).collect(Collectors.toList());
	}
}
