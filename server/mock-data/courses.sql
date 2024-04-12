-- SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
--
-- SPDX-License-Identifier: MIT

INSERT INTO public.course (course_code, min_credits, max_credits, grading_scale, language_of_instruction, created_at, updated_at) VALUES
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- O1
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- Y1
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- Example average
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- Example sum

('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- [Test] Normal | Average
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- [Test] No models | Average (teacher not in charge)
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- [Test] Edit course
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- [Test] Final grades
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()), -- [Test] Final grades 2 (teacher not in charge, no final grades)
('CS-A????', 5, 5, 'NUMERICAL', 'EN', NOW(), NOW()); -- [Test] Final grades add