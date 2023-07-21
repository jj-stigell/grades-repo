-- SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
--
-- SPDX-License-Identifier: MIT

INSERT INTO public.attainment (assessment_model_id, parent_id, name, tag, days_valid, created_at, updated_at, formula, formula_params) VALUES
(1, null, 'test assignment 1.1', 'tag1', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag5", { "weight": 2 }], ["tag9", { "weight": 2 }], ["tag16", { "weight": 2 }], ["tag17", { "weight": 2 }], ["tag18", { "weight": 2 }]] }'),
(2, null, 'test assignment tree', 'tag2', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag6", { "weight": 2 }], ["tag10", { "weight": 2 }]] }'),
(3, null, 'test assignment 3.1', 'tag3', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag7", { "weight": 2 }], ["tag11", { "weight": 2 }]] }'),
(5, null, 'test assignment 4.1', 'tag4', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag8", { "weight": 2 }], ["tag12", { "weight": 2 }]] }'),
(1, 1, 'test assignment 1.2', 'tag5', 365, NOW(), NOW(), 'MANUAL', NULL),
(2, 2, 'test assignment 1st level child 1', 'tag6', 365, NOW(), NOW(), 'MANUAL', NULL),
(3, 3, 'test assignment 3.2', 'tag7', 365, NOW(), NOW(), 'MANUAL', NULL),
(5, 4, 'test assignment 4.2', 'tag8', 365, NOW(), NOW(), 'MANUAL', NULL),
(1, 1, 'test assignment 1.3', 'tag9', 365, NOW(), NOW(), 'MANUAL', NULL),
(2, 2, 'test assignment 1st level child 2', 'tag10', 365, NOW(), NOW(), 'MANUAL', NULL),
(3, 3, 'test assignment 3.3', 'tag11', 365, NOW(), NOW(), 'MANUAL', NULL),
(5, 4, 'test assignment 4.3', 'tag12', 365, NOW(), NOW(), 'MANUAL', NULL),
(8, null, 'test assignment tree', 'tag13', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag14", { "weight": 2 }], ["tag15", { "weight": 1 }]] }'),
(8, 13, 'test assignment 1st level child 1', 'tag14', 365, NOW(), NOW(), 'MANUAL', NULL),
(8, 13, 'test assignment 1st level child 2', 'tag15', 365, NOW(), NOW(), 'MANUAL', NULL),
(1, 1, 'test assignment 1.4', 'tag16', 365, NOW(), NOW(), 'MANUAL', NULL),
(1, 1, 'test assignment 1.5', 'tag17', 365, NOW(), NOW(), 'MANUAL', NULL),
(1, 1, 'test assignment 1.6', 'tag18', 365, NOW(), NOW(), 'MANUAL', NULL),
-- The following list of weights would be stupidly long and it's not necessary,
-- so it's better left empty
(9, null, 'test assignment model 9', 'tag19', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [] }'),
(9, 19, 'test assignment model 9', 'tag20', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag21', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag22', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag23', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag24', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag25', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag26', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag27', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag28', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag29', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag30', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag31', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag32', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag33', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag34', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag35', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag36', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag37', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag38', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag39', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag40', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag41', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag42', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag43', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag44', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag45', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag46', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag47', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag48', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag49', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag50', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag51', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag52', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag53', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag54', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag55', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag56', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag57', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag58', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag59', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag60', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag61', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag62', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag63', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag64', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag65', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag66', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag67', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag68', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag69', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag70', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag71', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag72', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag73', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag74', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag75', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag76', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag77', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag78', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag79', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag80', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag81', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag82', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag83', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag84', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag85', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag86', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag87', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag88', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag89', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag90', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag91', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag92', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag93', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag94', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag95', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag96', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag97', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag98', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag99', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag100', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag101', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag102', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag103', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag104', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag105', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag106', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag107', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag108', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag109', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag110', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag111', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag112', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag113', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag114', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag115', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag116', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag117', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag118', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag119', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag120', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag121', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag122', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag123', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag124', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag125', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag126', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag127', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag128', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag129', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag130', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag131', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag132', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag133', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag134', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag135', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag136', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag137', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag138', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag139', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag140', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag141', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag142', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag143', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag144', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag145', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag146', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag147', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag148', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag149', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag150', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag151', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag152', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag153', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag154', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag155', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag156', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag157', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag158', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag159', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag160', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag161', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag162', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag163', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag164', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag165', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag166', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag167', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag168', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag169', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag170', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag171', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag172', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag173', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag174', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag175', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag176', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag177', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag178', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag179', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag180', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag181', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag182', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag183', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag184', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag185', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag186', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag187', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag188', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag189', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag190', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag191', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag192', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag193', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag194', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag195', 365, NOW(), NOW(), 'MANUAL', NULL),
(9, 19, 'test assignment model 9', 'tag196', 365, NOW(), NOW(), 'MANUAL', NULL),
(7, null, 'test assignment tree m:7', 'tag197', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag198", { "weight": 0.4 }], ["tag199", { "weight": 0.6 }]] }'),
(7, 197, 'test assignment tree m:7', 'tag198', 365, NOW(), NOW(), 'MANUAL', NULL),
(7, 197, 'test assignment tree m:7', 'tag199', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag200", { "weight": 0.1 }], ["tag201", { "weight": 0.1 }], ["tag202", { "weight": 0.8 }]] }'),
(7, 199, 'test assignment tree m:7', 'tag200', 365, NOW(), NOW(), 'MANUAL', NULL),
(7, 199, 'test assignment tree m:7', 'tag201', 365, NOW(), NOW(), 'MANUAL', NULL),
(7, 199, 'test assignment tree m:7', 'tag202', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag203", { "weight": 0.5 }], ["tag204", { "weight": 0.5 }]] }'),
(7, 202, 'test assignment tree m:7', 'tag203', 365, NOW(), NOW(), 'MANUAL', NULL),
(7, 202, 'test assignment tree m:7', 'tag204', 365, NOW(), NOW(), 'MANUAL', NULL),
(4, null, 'test assignment tree m:4', 'tag205', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag206", { "weight": 0.5 }], ["tag207", { "weight": 0.5 }]] }'),
(4, 205, 'test assignment tree m:4, sub', 'tag206', 365, NOW(), NOW(), 'MANUAL', NULL),
(4, 205, 'test assignment tree m:4, sub', 'tag207', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [] }'),
(6, null, 'test assignment tree m:6', 'tag208', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag209", { "weight": 0.75 }], ["tag210", { "weight": 0.25 }]] }'),
(6, 208, 'test assignment tree m:6, sub', 'tag209', 365, NOW(), NOW(), 'MANUAL', NULL),
(6, 208, 'test assignment tree m:6, sub', 'tag210', 365, NOW(), NOW(), 'MANUAL', NULL),
(10, null, 'test assignment tree m:10', 'tag211', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag212", { "weight": 0.75 }], ["tag213", { "weight": 0.25 }]] }'),
(10, 211, 'test assignment tree m:10, sub', 'tag212', 365, NOW(), NOW(), 'MANUAL', NULL),
(10, 211, 'test assignment tree m:10, sub', 'tag213', 365, NOW(), NOW(), 'MANUAL', NULL),
(2, 6, 'test assignment 2nd level child 1', 'tag214', 365, NOW(), NOW(), 'MANUAL', NULL),
(2, 214, 'test assignment 3rd level child 1', 'tag215', 365, NOW(), NOW(), 'MANUAL', NULL),
(15, null, 'test csv template', 'tag216', 365, NOW(), NOW(), 'MANUAL', NULL),
(15, 216, 'test csv template', 'tag217', 365, NOW(), NOW(), 'MANUAL', NULL),
(15, 216, 'test csv template', 'tag218', 365, NOW(), NOW(), 'MANUAL', NULL),
(15, 217, 'test csv template', 'tag219', 365, NOW(), NOW(), 'MANUAL', NULL),
(15, 218, 'test csv template', 'tag220', 365, NOW(), NOW(), 'MANUAL', NULL),
(22, null, 'test csv template no students', 'tag221', 365, NOW(), NOW(), 'MANUAL', NULL),
(22, 221, 'test csv template no students', 'tag222', 365, NOW(), NOW(), 'MANUAL', NULL),
(22, 221, 'test csv template no students', 'tag223', 365, NOW(), NOW(), 'MANUAL', NULL),
(14, null, 'test csv upload manual', 'tag224', 365, NOW(), NOW(), 'MANUAL', NULL),
(14, null, 'test csv upload grader', 'tag225', 365, NOW(), NOW(), 'MANUAL', NULL),
(24, null, 'test final grades', 'tag226', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag227", { "weight": 0.25 }]] }'),
(24, 226, 'test final grades', 'tag227', 365, NOW(), NOW(), 'MANUAL', NULL),
(25, null, 'calculate correct', 'tag228', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag229", { "weight": 0.75 }], ["tag230", { "weight": 0.25 }]] }'),
(25, 228, 'calculate correct', 'tag229', 365, NOW(), NOW(), 'MANUAL', NULL),
(25, 228, 'calculate correct', 'tag230', 365, NOW(), NOW(), 'MANUAL', NULL),
(26, null, 'calculate multiple', 'tag231', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag232", { "weight": 0.75 }], ["tag233", { "weight": 0.25 }]] }'),
(26, 231, 'calculate multiple', 'tag232', 365, NOW(), NOW(), 'MANUAL', NULL),
(26, 231, 'calculate multiple', 'tag233', 365, NOW(), NOW(), 'MANUAL', NULL),
(27, null, 'calculate depth', 'tag234', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag235", { "weight": 0.4 }], ["tag236", { "weight": 0.6 }]] }'),
(27, 234, 'calculate depth', 'tag235', 365, NOW(), NOW(), 'MANUAL', NULL),
(27, 234, 'calculate depth', 'tag236', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag237", { "weight": 0.1 }], ["tag238", { "weight": 0.1 }], ["tag239", { "weight": 0.8 }]] }'),
(27, 236, 'calculate depth', 'tag237', 365, NOW(), NOW(), 'MANUAL', NULL),
(27, 236, 'calculate depth', 'tag238', 365, NOW(), NOW(), 'MANUAL', NULL),
(27, 236, 'calculate depth', 'tag239', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag240", { "weight": 0.5 }], ["tag241", { "weight": 0.5 }]] }'),
(27, 239, 'calculate depth', 'tag240', 365, NOW(), NOW(), 'MANUAL', NULL),
(27, 239, 'calculate depth', 'tag241', 365, NOW(), NOW(), 'MANUAL', NULL),
(28, null, 'calculate override', 'tag242', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["tag243", { "weight": 0.5 }], ["tag244", { "weight": 0.5 }]] }'),
(28, 242, 'calculate override', 'tag243', 365, NOW(), NOW(), 'MANUAL', NULL),
(28, 242, 'calculate override', 'tag244', 365, NOW(), NOW(), 'MANUAL', NULL),
(29, null, 'Grade', 'grade', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["exercise", { "weight": 0.4 }], ["project", { "weight": 0.2 }], ["exam", { "weight": 0.4 }]] }'),
(29, 245, 'Exercises', 'exercise', 365, NOW(), NOW(), 'MANUAL', NULL),
(29, 245, 'Project', 'project', 365, NOW(), NOW(), 'MANUAL', NULL),
(29, 245, 'Exam', 'exam', 365, NOW(), NOW(), 'MANUAL', NULL),
(30, null, 'Grade', 'grade', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["project", { "weight": 0.6 }], ["exam", { "weight": 0.4 }]] }'),
(30, 249, 'Project', 'project', 365, NOW(), NOW(), 'MANUAL', NULL),
(30, 249, 'Exam', 'exam', 365, NOW(), NOW(), 'MANUAL', NULL),
(34, null, 'multiple roots', 'root 252', 365, NOW(), NOW(), 'MANUAL', NULL),
(34, null, 'multiple roots', 'root 253', 365, NOW(), NOW(), 'MANUAL', NULL),
(41, null, 'for grading test', 'assesment model 41, root id 254', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["exam", { "weight": 1.0 }]] }'),
(41, 254, 'for grading test - assesment model 41, child id 255', 'exam', 365, NOW(), NOW(), 'MANUAL', NULL),
(42, null, 'for grading test', 'assesment model 42, root id 256', 365, NOW(), NOW(), 'WEIGHTED_AVERAGE', '{ "children": [["exam", { "weight": 1.0 }]] }'),
(42, 256, 'for grading test - assesment model 42, child id 257', 'exam', 365, NOW(), NOW(), 'MANUAL', NULL);