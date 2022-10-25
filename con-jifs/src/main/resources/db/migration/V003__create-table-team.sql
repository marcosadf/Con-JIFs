CREATE TABLE team (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modality_id BIGINT NOT NULL,
  campus VARCHAR(100) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_team_modality1
    FOREIGN KEY (modality_id)
    REFERENCES modality (id)
);
