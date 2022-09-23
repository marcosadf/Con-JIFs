CREATE TABLE bracket (
  id BIGINT NOT NULL,
  stage_id BIGINT NOT NULL,
  name VARCHAR(45) NOT NULL,
  parent_bracket_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_championship_key_stage1
    FOREIGN KEY (stage_id)
    REFERENCES stage (id),
  CONSTRAINT fk_bracket_bracket1
    FOREIGN KEY (parent_bracket_id)
    REFERENCES bracket (`id`)
);