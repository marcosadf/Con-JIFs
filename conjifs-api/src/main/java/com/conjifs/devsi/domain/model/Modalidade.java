package com.conjifs.devsi.domain.model;

import java.math.BigInteger;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Modalidade {

  private Long id;
  private String nome;
  private BigInteger quantidadeTimes;
  private Sexo sexo;
  private int quantidadeJogadoresTime;
  private boolean modalidadeGrupo;
  private BigInteger quantidadeTimesGrupo;
  private BigInteger quantidadeTimesGrupoClassificados;

}
