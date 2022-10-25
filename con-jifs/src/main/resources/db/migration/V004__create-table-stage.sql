CREATE TABLE stage (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modality_id BIGINT NOT NULL,
  name_stage ENUM('FINAL', 'SEMIFINALS', 'QUARTERFINALS', 'ROUNDOF16', 'GROUP') NOT NULL,
  concluded TINYINT NOT NULL DEFAULT 0,
  parent_stage_id BIGINT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_stage_modality1
    FOREIGN KEY (modality_id)
    REFERENCES modality (id),
   CONSTRAINT fk_stage_stage1
    FOREIGN KEY (parent_stage_id)
    REFERENCES stage (id)
);