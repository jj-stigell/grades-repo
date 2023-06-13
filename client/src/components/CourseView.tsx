// SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import FileLoadDialog from './course-view/FileLoadDialog';
import InstanceDetails from './course-view/InstanceDetails';
import Attainments from './course-view/Attainments';
import InstancesTable from './course-view/InstancesTable';
import courseService from '../services/courses';
import instancesService from '../services/instances';
import sortingServices from '../services/sorting';
import useAuth from '../hooks/useAuth';
import mockAttainmentsClient from '../mock-data/mockAttainmentsClient';
import { SystemRole } from 'aalto-grades-common/types/general';

// REPLACE SOME DAY? currently this info can't be fetched from database
const mockInstitution: string = 'Aalto University';

const CourseView = (): JSX.Element => {
  let navigate = useNavigate();
  let { courseId }: any = useParams();
  const { auth } = useAuth();

  const [courseDetails, setCourseDetails] = useState(null);
  const [currentInstance, setCurrentInstance] = useState(null);
  const [instances, setInstances] = useState([]);

  const [animation, setAnimation] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    courseService.getCourse(courseId)
      .then((data) => {
        setCourseDetails(data.course);
      })
      .catch((e) => console.log(e.message));

    instancesService.getInstances(courseId)
      .then((data) => {
        const sortedInstances = data.courseInstances.sort((a, b) => sortingServices.sortByDate(a.startDate, b.startDate));
        setInstances(sortedInstances);
        setCurrentInstance(sortedInstances[0]);
      })
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    setAnimation(true);
  }, [currentInstance]);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const onChangeInstance = (instance): void => {
    if(instance.id !== currentInstance.id) {
      setAnimation(false);
      setCurrentInstance(instance);
    }
  };

  return(
    <Box sx={{ mx: -2.5 }}>
      {
        courseDetails &&
        <>
          <Typography variant='h1' align='left'>{courseDetails.courseCode}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 4, columnGap: 6 }}>
            <Typography variant='h2' align='left'>{courseDetails.name.en}</Typography>
            { /* Only admins and teachers are allowed to create a new instance */
              auth.role == SystemRole.Admin &&
            <Button
              id='ag_new_instance_btn'
              size='large'
              variant='contained'
              onClick={() => {
                navigate(`/${courseId}/fetch-instances/${courseDetails.courseCode}`);
              }}
            >  {/* TODO: Check path */}
              New instance
            </Button>
            }
          </Box>
          {
            currentInstance && instances &&
            <>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Grow in={animation} style={{ transformOrigin: '50% 0 0' }} {...(animation ? { timeout: 500 } : { timeout: 0 })}>
                  <div>
                    <InstanceDetails info={{ ...currentInstance, department: courseDetails.department, institution: mockInstitution }} />
                  </div>
                </Grow>
                { /* a different attainment component will be created for students */
                  auth.role == SystemRole.Admin &&
                  <Grow in={animation} style={{ transformOrigin: '0 0 0' }} {...(animation ? { timeout: 1000 } : { timeout: 0 })}>
                    <div style={{ width: '100%' }}>
                      <Attainments
                        attainments={mockAttainmentsClient}
                        courseId={courseId}
                        formula={'Weighted Average'}
                        instance={currentInstance}
                        handleAddPoints={handleClickOpen}
                      /> {/* TODO: Retrieve real formula */}
                    </div>
                  </Grow>
                }
              </Box>
              <Typography variant='h2' align='left' sx={{ mt: 6, mb: 3 }}>All Instances</Typography>
              <InstancesTable data={instances} current={currentInstance.id} onClick={onChangeInstance} />
              <FileLoadDialog instanceId={currentInstance.id} open={open} handleClose={handleClose} />
            </>
            ||
            <Typography variant='h3'>
              This course has no instances. <a href={
                `/${courseId}/fetch-instances/${courseDetails.courseCode}`
              }>
                Add a new instance.
              </a>
            </Typography>
          }
        </>
      }
    </Box>
  );
};

export default CourseView;