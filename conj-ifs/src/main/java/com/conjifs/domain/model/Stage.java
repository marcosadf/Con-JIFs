package com.conjifs.domain.model;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.groups.ConvertGroup;
import javax.validation.groups.Default;

import com.conjifs.domain.ValidationGroups;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
public class Stage {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Valid
	@ConvertGroup(from = Default.class, to = ValidationGroups.ModalityId.class)
	@ManyToOne
	@NotNull
	private Modality modality;
	
	@NotNull
	@Column(name = "name_stage")
	@Enumerated(EnumType.STRING)
	private NameStage nameStage;
	
	@NotNull
	private Boolean concluded = false;
	
	@Valid
	@OneToOne
	@JoinColumn(name = "parent_stage_id")
	@ConvertGroup(from = Default.class, to = ValidationGroups.StageId.class)
	@JsonIgnore
	private Stage parentStage;
	
	@JsonIgnore
	@OneToMany(mappedBy = "stage", cascade = CascadeType.ALL)
	private Set<Bracket> brackets = new LinkedHashSet<>(); 
	
}