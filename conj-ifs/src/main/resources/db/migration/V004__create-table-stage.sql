CREATE TABLE stage (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modality_id BIGINT NOT NULL,
  name_stage ENUM('GROUP', 'FINAL', 'SEMIFINALS', 'QUARTERFINALS', 'ROUNDOF16') NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_stage_modality1
    FOREIGN KEY (modality_id)
    REFERENCES modality (id)
);