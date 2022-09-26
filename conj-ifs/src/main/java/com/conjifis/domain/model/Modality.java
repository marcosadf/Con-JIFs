package com.conjifis.domain.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
public class Modality {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonIgnore
	@ManyToOne
	@NotNull
	private Championship championship;
	
	@NotBlank
	@Size(max = 100)
	private String name;
	
	@NotNull
	@Column(name = "type_competition")
	private TypeCompetition typeCompetition;
	
	@Column(name = "group_approved_number")
	private Integer groupApprovedNumber;
	
	@OneToMany(mappedBy = "modality", cascade = CascadeType.ALL)
	private Set<Stage> stages;
	
	@OneToMany(mappedBy = "modality", cascade = CascadeType.ALL)
	private Set<Team> teams;
}