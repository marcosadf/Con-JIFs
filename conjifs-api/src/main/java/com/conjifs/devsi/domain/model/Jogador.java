package com.conjifs.devsi.domain.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Jogador extends Pessoa{

  private Long id;
  private Time time;
  private Sexo sexo;
  
}
