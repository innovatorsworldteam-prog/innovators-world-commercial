-- Innovators World Career Discovery v1.0 content
-- Migration 0008: canonical age-banded question bank and scoring signals
-- Additive content migration. Does not alter 0007 or existing IWDA data.

PRAGMA foreign_keys = ON;

-- 24 canonical questions: one per dimension per developmental band.
-- The cognitive task changes by band: concrete choice -> comparison -> trade-off -> realistic future-work context.
INSERT OR IGNORE INTO assessment_questions
(id, assessment_version_id, code, age_min, age_max, question_type, prompt, helper_text, required, display_order, scoring_config_json, created_at, updated_at)
VALUES
('cd-q-001','assessment-career-discovery-v1','CD_EXP_INT_01',8,10,'single_choice','What would you most like to discover on a new adventure?',NULL,1,1,'{"dimension":"INT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-002','assessment-career-discovery-v1','CD_EXP_ACT_01',8,10,'single_choice','If you had a free afternoon to make something happen, what would you choose to do?',NULL,1,2,'{"dimension":"ACT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-003','assessment-career-discovery-v1','CD_EXP_VAL_01',8,10,'single_choice','When people work together on something, what feels most important to you?',NULL,1,3,'{"dimension":"VAL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-004','assessment-career-discovery-v1','CD_EXP_ENV_01',8,10,'single_choice','Where would you most enjoy spending time while solving a puzzle?',NULL,1,4,'{"dimension":"ENV","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-005','assessment-career-discovery-v1','CD_EXP_SKL_01',8,10,'single_choice','If a mentor could teach you one skill, which would you choose?',NULL,1,5,'{"dimension":"SKL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-006','assessment-career-discovery-v1','CD_EXP_FUT_01',8,10,'single_choice','Which future possibility sounds most exciting to imagine?',NULL,1,6,'{"dimension":"FUT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-007','assessment-career-discovery-v1','CD_DIS_INT_01',11,13,'single_choice','Which kind of challenge would you most want to spend an afternoon exploring?',NULL,1,7,'{"dimension":"INT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-008','assessment-career-discovery-v1','CD_DIS_ACT_01',11,13,'single_choice','Which activity would you most enjoy choosing for a project?',NULL,1,8,'{"dimension":"ACT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-009','assessment-career-discovery-v1','CD_DIS_VAL_01',11,13,'single_choice','When choosing between two projects, what would matter most to you?',NULL,1,9,'{"dimension":"VAL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-010','assessment-career-discovery-v1','CD_DIS_ENV_01',11,13,'single_choice','Which setting would you prefer for a challenging project?',NULL,1,10,'{"dimension":"ENV","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-011','assessment-career-discovery-v1','CD_DIS_SKL_01',11,13,'single_choice','Which ability would you most like to strengthen through a project?',NULL,1,11,'{"dimension":"SKL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-012','assessment-career-discovery-v1','CD_DIS_FUT_01',11,13,'single_choice','Which future development would you most want to learn about?',NULL,1,12,'{"dimension":"FUT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-013','assessment-career-discovery-v1','CD_PAT_INT_01',14,16,'single_choice','Which kind of problem would you willingly spend extra time understanding?',NULL,1,13,'{"dimension":"INT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-014','assessment-career-discovery-v1','CD_PAT_ACT_01',14,16,'single_choice','Which kind of activity would you choose when you have meaningful free time?',NULL,1,14,'{"dimension":"ACT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-015','assessment-career-discovery-v1','CD_PAT_VAL_01',14,16,'single_choice','If two opportunities were equally interesting, what would help you choose?',NULL,1,15,'{"dimension":"VAL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-016','assessment-career-discovery-v1','CD_PAT_ENV_01',14,16,'single_choice','Which working environment would you choose for a demanding project?',NULL,1,16,'{"dimension":"ENV","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-017','assessment-career-discovery-v1','CD_PAT_SKL_01',14,16,'single_choice','Which capability would you most willingly develop through repeated practice?',NULL,1,17,'{"dimension":"SKL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-018','assessment-career-discovery-v1','CD_PAT_FUT_01',14,16,'single_choice','Which emerging field would you most like to understand before it becomes familiar?',NULL,1,18,'{"dimension":"FUT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-019','assessment-career-discovery-v1','CD_LAU_INT_01',17,19,'single_choice','Which kind of work problem would you most willingly investigate in depth?',NULL,1,19,'{"dimension":"INT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-020','assessment-career-discovery-v1','CD_LAU_ACT_01',17,19,'single_choice','Which kind of activity would you most want included in a real project?',NULL,1,20,'{"dimension":"ACT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-021','assessment-career-discovery-v1','CD_LAU_VAL_01',17,19,'single_choice','When evaluating a possible field of work, which consideration matters most to you?',NULL,1,21,'{"dimension":"VAL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-022','assessment-career-discovery-v1','CD_LAU_ENV_01',17,19,'single_choice','Which environment would you prefer for sustained project work?',NULL,1,22,'{"dimension":"ENV","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-023','assessment-career-discovery-v1','CD_LAU_SKL_01',17,19,'single_choice','Which capability would you most want to develop for future work?',NULL,1,23,'{"dimension":"SKL","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now')),
('cd-q-024','assessment-career-discovery-v1','CD_LAU_FUT_01',17,19,'single_choice','Which emerging field would you most willingly explore as a possible direction?',NULL,1,24,'{"dimension":"FUT","scale":"1-4","algorithm_version":"CD_SCORING_1.0"}',datetime('now'),datetime('now'));

-- Four response levels. The primary score is 1-4. Career-world signals are deliberately broad;
-- they are exploration signals, not deterministic career assignments.
WITH levels(level, label) AS (
  VALUES
    (1,'I would probably skip it.'),
    (2,'I might try it briefly.'),
    (3,'I would want to explore it.'),
    (4,'I would keep exploring it and ask more questions.')
),
signals(dimension, level, s1, s2) AS (
  VALUES
    ('INT',1,'CULTURE','MEDIA'),('INT',2,'SCI','LIFE'),('INT',3,'TECH','SPACE'),('INT',4,'DESIGN','FOOD'),
    ('ACT',1,'TRADES','ENG'),('ACT',2,'DESIGN','CULTURE'),('ACT',3,'TECH','SCI'),('ACT',4,'BUS','EDUC'),
    ('VAL',1,'HEALTH','SOCIETY'),('VAL',2,'LIFE','ENV'),('VAL',3,'BUS','FIN'),('VAL',4,'EDUC','CULTURE'),
    ('ENV',1,'TECH','FIN'),('ENV',2,'SCI','ENG'),('ENV',3,'HEALTH','EDUC'),('ENV',4,'MEDIA','CULTURE'),
    ('SKL',1,'TECH','SCI'),('SKL',2,'ENG','TRADES'),('SKL',3,'DESIGN','MEDIA'),('SKL',4,'BUS','SOCIETY'),
    ('FUT',1,'TECH','SPACE'),('FUT',2,'LIFE','ENV'),('FUT',3,'HEALTH','SCI'),('FUT',4,'BUS','FIN')
)
INSERT OR IGNORE INTO assessment_options
(id, question_id, code, label, display_order, scoring_json, metadata_json, created_at, updated_at)
SELECT
  q.id || '-o' || levels.level,
  q.id,
  'O' || levels.level,
  CASE q.code
    WHEN 'CD_EXP_ACT_01' THEN CASE levels.level WHEN 1 THEN 'I would rather watch or help.' WHEN 2 THEN 'I would try part of it.' WHEN 3 THEN 'I would happily do it.' ELSE 'I would choose to do it and keep improving it.' END
    WHEN 'CD_EXP_VAL_01' THEN CASE levels.level WHEN 1 THEN 'It would matter a little.' WHEN 2 THEN 'It would matter somewhat.' WHEN 3 THEN 'It would matter a lot.' ELSE 'It would be one of my strongest reasons for choosing.' END
    WHEN 'CD_EXP_ENV_01' THEN CASE levels.level WHEN 1 THEN 'I could work there if needed.' WHEN 2 THEN 'I could enjoy it sometimes.' WHEN 3 THEN 'I would prefer it.' ELSE 'I would actively choose that setting.' END
    WHEN 'CD_EXP_SKL_01' THEN CASE levels.level WHEN 1 THEN 'I am not very drawn to developing this.' WHEN 2 THEN 'I would be willing to practise it.' WHEN 3 THEN 'I would like to become good at it.' ELSE 'I would actively want to develop this strength.' END
    WHEN 'CD_EXP_FUT_01' THEN CASE levels.level WHEN 1 THEN 'Not very curious.' WHEN 2 THEN 'Somewhat curious.' WHEN 3 THEN 'Very curious.' ELSE 'I would actively investigate it.' END
    ELSE levels.label
  END,
  levels.level,
  json_object(json_extract(q.scoring_config_json,'$.dimension'),levels.level),
  json_object('career_world_signals',json_array(signals.s1,signals.s2)),
  datetime('now'),datetime('now')
FROM assessment_questions q
JOIN levels
JOIN signals ON signals.dimension=json_extract(q.scoring_config_json,'$.dimension') AND signals.level=levels.level
WHERE q.assessment_version_id='assessment-career-discovery-v1';

-- Activate only after the complete v1.0 question and option seed has been inserted.
UPDATE assessment_versions
SET status='active',
    published_at=COALESCE(published_at,datetime('now')),
    updated_at=datetime('now')
WHERE id='assessment-career-discovery-v1';

UPDATE assessments
SET status='active', updated_at=datetime('now')
WHERE id='assessment-career-discovery';
