-- SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
--
-- SPDX-License-Identifier: MIT

INSERT INTO public.assessment_model (course_id, name, created_at, updated_at) VALUES
(1, 'model 1', NOW(), NOW()),
(2, 'model 2', NOW(), NOW()),
(3, 'model 3', NOW(), NOW()),
(3, 'model 4', NOW(), NOW()),
(4, 'model 5', NOW(), NOW()),
(4, 'model 6', NOW(), NOW()),
(4, 'model 7', NOW(), NOW()),
(5, 'model 8', NOW(), NOW()),
(6, 'model 9', NOW(), NOW()),
(1, 'model 10', NOW(), NOW()),
(2, 'model 11', NOW(), NOW()),
(1, 'model 12', NOW(), NOW()),
(4, 'model 13', NOW(), NOW()),
(5, 'model 14', NOW(), NOW()),
(6, 'model 15', NOW(), NOW()),
(4, 'model 16', NOW(), NOW()),
(1, 'model 17', NOW(), NOW()),
(6, 'model 18', NOW(), NOW()),
(1, 'model 19', NOW(), NOW()),
(5, 'model 20', NOW(), NOW()),
(1, 'model 21', NOW(), NOW()),
(6, 'model 22', NOW(), NOW()),
(6, 'model 23', NOW(), NOW()),
(6, 'model 24 - test final grades', NOW(), NOW()),
(1, 'model 25 - test calculate correct', NOW(), NOW()),
(1, 'model 26 - test calculate multiple', NOW(), NOW()),
(1, 'model 27 - test calculate depth', NOW(), NOW()),
(1, 'model 28 - test calculate override', NOW(), NOW()),
(8, 'Year 2021 - 2023', NOW(), NOW()),
(8, 'Special project', NOW(), NOW()),
(1, 'model 31', NOW(), NOW()),
(1, 'model 32', NOW(), NOW()),
(1, 'model 33', NOW(), NOW()),
(2, 'multiple roots 34', NOW(), NOW()),
(2, 'ID 35 - no root attainment assigned 1', NOW(), NOW()),
(2, 'ID 36 - no root attainment assigned 2', NOW(), NOW()),
(8, 'ID 37 - no root attainment assigned 1', NOW(), NOW()),
(8, 'ID 38 - no root attainment assigned 2', NOW(), NOW()),
(8, 'ID 39 - no root attainment assigned 3', NOW(), NOW()),
(8, 'ID 40 - no root attainment assigned 3', NOW(), NOW()),
(8, 'ID 41 - has graded and not graded students', NOW(), NOW()),
(8, 'ID 42 - graded students on 2 instances, not graded on 1 instance', NOW(), NOW()),
(2, 'ID 43 - update attainment tag in params of parent attainment', NOW(), NOW()),
(2, 'ID 44 - remove attainment tag from the params of old parent attainment', NOW(), NOW());
