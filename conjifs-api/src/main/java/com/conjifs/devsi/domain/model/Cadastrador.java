package com.conjifs.devsi.domain.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Cadastrador extends Pessoa{

  private Long id;
  private String cargo;
  private Privilegio privilegio;
  
}
