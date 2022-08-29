package com.conjifs.devsi.domain.model;

import java.math.BigInteger;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Grupo {

  private Long id;
  private String nome;
  private BigInteger resultadosGrupo;
  
}
