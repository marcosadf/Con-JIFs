CREATE TABLE stage (
  id BIGINT NOT NULL,
  modality_id BIGINT NOT NULL,
  type ENUM('GROUP', 'FINAL', 'SEMIFINALS', 'QUARTERFINALS', 'ROUNDOF16') NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_stage_modality1
    FOREIGN KEY (modality_id)
    REFERENCES modality (id)
);