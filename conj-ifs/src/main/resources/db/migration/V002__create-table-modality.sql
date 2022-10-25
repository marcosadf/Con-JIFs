CREATE TABLE modality (
  id BIGINT NOT NULL AUTO_INCREMENT,
  championship_id BIGINT NOT NULL,
  name VARCHAR(100) NOT NULL,
  type_competition ENUM('GROUP', 'BRACKET', 'MIXED') NOT NULL,
  group_teams_number INT NULL,
  group_approved_number INT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_modality_championship1
    FOREIGN KEY (championship_id)
    REFERENCES championship (id)
);