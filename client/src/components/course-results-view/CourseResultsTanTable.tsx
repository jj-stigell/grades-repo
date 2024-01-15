// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {ArrowUpward, ExpandLess, ExpandMore, Sort} from '@mui/icons-material';
import {Badge, Checkbox, IconButton, Link, Tooltip} from '@mui/material';
import '@tanstack/react-table';
import {
  ExpandedState,
  GroupingState,
  RowData,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  AttainmentData,
  AttainmentGradeData,
  FinalGrade,
  GradeOption,
  StudentGradesTree,
} from 'aalto-grades-common/types';
import * as React from 'react';
import {findBestGradeOption} from '../../utils';
import PrettyChip from '../shared/PrettyChip';
import GradeCell from './GradeCell';
import StudentGradesDialog from './StudentGradesDialog';
// This module is used to create meta data for colums cells
declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    PrettyChipPosition: 'first' | 'middle' | 'last' | 'alone';
  }
}

type StudentRow = {
  attainmentId: number;
  studentNumber: string;
  credits: number;
  grades: Array<GradeOption>;
  flatAttainments: Array<AttainmentGradeData>;
  subAttainments?: Array<AttainmentGradeData>;
  // [attainmentId: string]: string | boolean | number;
};
type GroupedStudentRow = {
  grouping: string;
} & StudentRow;

type PropsType = {
  data: StudentGradesTree[];
  attainmentList: Array<AttainmentData>;
  attainmentTree?: AttainmentData;
  selectedStudents: FinalGrade[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<FinalGrade[]>>;
};

function toggleString(arr: string[], str: string): string[] {
  const index = arr.indexOf(str);
  if (index > -1) {
    arr.splice(index, 1);
  } else {
    arr.push(str);
  }
  return arr;
}

// Find the attainment grade from the tree
function getAttainmentGrade(
  gradeTree: AttainmentGradeData,
  attainmentId: number
): AttainmentGradeData | null {
  if (!gradeTree.grades) return null;

  function traverseTree(
    grade: AttainmentGradeData
  ): AttainmentGradeData | null {
    if (grade.attainmentId === attainmentId) {
      return grade;
    }

    if (grade.subAttainments) {
      for (const subGrade of grade.subAttainments) {
        const maybeFound: AttainmentGradeData | null = traverseTree(subGrade);
        if (maybeFound) return maybeFound;
      }
    }
    return null;
  }

  return traverseTree(gradeTree);
}

// Flatten the tree into a list of rows
function flattenTree(studentTree: StudentGradesTree) {
  const result: StudentRow = {...studentTree, flatAttainments: []};

  function addSubAttainments(sAtt: AttainmentGradeData[]) {
    if (sAtt) {
      result.flatAttainments.push(...sAtt);
      for (const subAtt of sAtt) {
        addSubAttainments(subAtt.subAttainments ?? []);
      }
    }
  }
  addSubAttainments(studentTree.subAttainments ?? []);
  return result;
}

// Group the rows by the last attainment date
function groupByLastAttainmentDate(gradesList: StudentRow[]) {
  // const result: {date: string; rows: StudentGradesTree[]}[] = [];
  function findNewestDate(row: StudentRow) {
    let newestDate = new Date('1970-01-01');
    for (const att of row.flatAttainments) {
      const bestGradeDate = new Date(
        findBestGradeOption(att.grades ?? [], {
          avoidExpired: true,
          preferExpiredToNull: true,
        })?.date ?? ''
      );
      //Get best grade date for each attainment and get the newest
      newestDate =
        newestDate && new Date(bestGradeDate ?? '') > newestDate
          ? bestGradeDate
          : newestDate;
    }
    return newestDate.toISOString().split('T')[0];
  }

  //Array implementation
  const result: Array<GroupedStudentRow> = [];
  for (const row of gradesList) {
    const date = findNewestDate(row);
    result.push({grouping: date, ...row});
  }
  return result;
}

/**
 * Finds the previous grade that has been exported to Sisu, excluding the best grade.
 * @param bestGrade - The best grade option.
 * @param row - The student row.
 * @returns The previous grade that has been exported to Sisu, or null if none is found.
 */
function findPreviouslyExportedToSisu(bestGrade: GradeOption, row: StudentRow) {
  for (const gr of row.grades) {
    if (bestGrade?.gradeId === gr.gradeId) continue; //Skip the best grade (we need to check for previous ones)
    if (gr.exportedToSisu) {
      //We found one!
      if (bestGrade.exportedToSisu) {
        //If the best grade is also exported, we need to check which one is newer
        if (bestGrade.exportedToSisu < gr.exportedToSisu) return gr;
      } else {
        return gr;
      }
    }
  }
  return null;
}

const columnHelper = createColumnHelper<GroupedStudentRow>();

//TODO: Better column definitions
//TODO: Better typing and freeze how to access data
const CourseResultsTanTable: React.FC<PropsType> = props => {
  console.log(props.attainmentList);
  const flattenData = React.useMemo(
    () => props.data.map(flattenTree),
    [props.data]
  );
  // Row are always grouped, toggling grouping just add the grouping column to the table
  const groupedData = React.useMemo(
    () => groupByLastAttainmentDate(flattenData),
    [flattenData]
  );
  console.log(groupedData);

  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [globalFilter, setGlobalFilter] = React.useState('');
  //Need to move it in a better place needed for the dialog
  const [user, setUser] = React.useState<FinalGrade | null>(null);
  const [showUserGrades, setShowUserGrades] = React.useState<boolean>(false);
  //End of shame paragraph

  React.useEffect(() => {
    props.setSelectedStudents(_ => {
      return table.getSelectedRowModel().rows.map(row => {
        //Setting selectedStudnets
        console.log(row.original);
        return row.original as unknown as FinalGrade;
      });
    });
  }, [rowSelection]);
  // console.log(expanded);
  // console.log(rowSelection);

  // Creating Grades columns
  // const dynamicColumns = props.attainmentList.map(att => {
  //   return columnHelper.accessor(row => getAttainmentGrade(row, att.id ?? 0), {
  //     header: att.name,
  //     meta: {PrettyChipPosition: 'alone'},
  //     enableSorting: false,
  //     cell: ({getValue}) => (
  //       <GradeCell studentNumber={'123'} attainemntResults={getValue()} />
  //     ),
  //     footer: att.name,
  //   });
  // });
  // Dynamic columns but instead of using the flat array of attainments, use the tree
  function createAssignmentRow(
    subAssignment: AttainmentData[] // : (ColumnDef<GroupedStudentRow, any>)[]
  ): (
    | ReturnType<typeof columnHelper.accessor>
    | ReturnType<typeof columnHelper.group>
  )[] {
    return subAssignment.map(att => {
      if ((att.subAttainments?.length ?? 0 > 0) && att.subAttainments) {
        return columnHelper.group({
          header: att.name,
          meta: {PrettyChipPosition: 'alone'},
          columns: [
            columnHelper.accessor(row => getAttainmentGrade(row, att.id ?? 0), {
              header: att.name,
              meta: {PrettyChipPosition: 'alone'},
              enableSorting: false,
              cell: ({getValue}) => (
                <GradeCell
                  studentNumber={'123'}
                  attainemntResults={getValue()}
                  finalGrade={false}
                />
              ),
            }),
            ...createAssignmentRow(att.subAttainments),
          ],
        });
      }

      return columnHelper.accessor(
        row => getAttainmentGrade(row, att.id ?? 0),
        {
          header: att.name,
          meta: {PrettyChipPosition: 'alone'},
          enableSorting: false,
          cell: ({getValue}) => (
            <GradeCell
              studentNumber={'123'}
              attainemntResults={getValue()}
              finalGrade={false}
            />
          ),
        }
      );
    }) as (
      | ReturnType<typeof columnHelper.accessor>
      | ReturnType<typeof columnHelper.group>
    )[];
  }

  const dynamicColumns = createAssignmentRow(
    props.attainmentTree?.subAttainments ?? []
  );

  // Creating grouping column
  const groupingColumns =
    grouping.length > 0
      ? [
          columnHelper.accessor(row => row.grouping, {
            id: 'grouping',
            meta: {PrettyChipPosition: 'first'},
            header: () => {
              return 'Latest Attainment';
            },
            cell: prop => prop.getValue(),
          }),
        ]
      : [];

  //Creating static columns
  const staticColumns = [
    ...groupingColumns,
    columnHelper.display({
      id: 'select',
      meta: {PrettyChipPosition: grouping.length > 0 ? 'last' : 'alone'},
      header: ({table}) => {
        return (
          <>
            <Checkbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
            <span style={{marginLeft: '4px', marginRight: '15px'}}>
              <Badge
                badgeContent={table.getSelectedRowModel().rows.length || '0'}
                // color="secondary"
                color="primary"
                max={999}
              />
            </span>
          </>
        );
      },
      aggregatedCell: ({row}) => (
        <PrettyChip position="last">
          <>
            <Checkbox
              checked={row.getIsAllSubRowsSelected()}
              indeterminate={row.getIsSomeSelected()}
              // onChange={row.getToggleSelectedHandler()}
              onChange={() => {
                if (row.getIsSomeSelected()) {
                  // If some rows are selected, select all
                  row.subRows.map(row => {
                    !row.getIsSelected() && row.getToggleSelectedHandler()(row);
                  });
                } else {
                  // All rows are selected, deselect all (and viceversa)
                  row.subRows.map(row => row.getToggleSelectedHandler()(row));
                }
              }}
            />
            <span style={{marginLeft: '4px', marginRight: '15px'}}>
              <Badge
                badgeContent={
                  row.subRows.filter(subRow => subRow.getIsSelected()).length ||
                  '0'
                }
                color="secondary"
              />
            </span>
          </>
        </PrettyChip>
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          style={{
            marginLeft: '21px',
          }}
          sx={{
            '&::before': {
              content: '""',
              width: '11px',
              height: '150%',
              // border: '1px solid black',
              borderBlockEnd: '1px solid lightgray',
              borderLeft: '1px solid lightgray',
              borderEndStartRadius: '10px',
              // backgroundColor: 'black',
              position: 'absolute',
              left: '0px',
              top: '-102%',
              zIndex: -1,
            },
          }}
        />
      ),
    }),
    columnHelper.accessor('studentNumber', {
      header: 'Student Number',
      meta: {PrettyChipPosition: 'first'},
      cell: ({row, getValue}) => {
        return (
          <Tooltip
            placement="top"
            title="Click to show individual grades for student"
          >
            <Link
              component="button"
              variant="body2"
              onClick={(): void => {
                setUser(row.original as unknown as FinalGrade);
                setShowUserGrades(true);
              }}
            >
              {getValue()}
            </Link>
          </Tooltip>
        );
      },
    }),
    columnHelper.accessor('credits', {
      header: 'Credits',
      enableSorting: false,
      cell: info => info.getValue(),
      aggregatedCell: () => null,
    }),
    columnHelper.accessor(row => row, {
      header: 'Final Grade',
      enableSorting: false,
      // cell: info => info.getValue(),
      cell: ({getValue}) => (
        <GradeCell
          studentNumber={'123'}
          attainemntResults={getValue()}
          finalGrade={true}
        />
      ),
      aggregatedCell: () => null,
    }),
    columnHelper.accessor(
      row => {
        // ATTENTION this function needs to have the same parameters of the one inside the grade cell
        // Clearly can be done in a better way
        const bestGrade = findBestGradeOption(row?.grades ?? [], {
          avoidExpired: true,
          preferExpiredToNull: true,
        });
        if (!bestGrade) return '-';
        console.log(bestGrade);
        if (bestGrade?.exportedToSisu) return '✅';
        console.log(findPreviouslyExportedToSisu(bestGrade, row));
        if (findPreviouslyExportedToSisu(bestGrade, row)) return '⚠️';
        return '❌';
      },
      {
        header: 'Exported to Sisu',
        meta: {PrettyChipPosition: 'last'},
        cell: info => info.getValue(),
        aggregatedCell: () => null,
      }
    ),
    columnHelper.group({
      header: 'Attainments',
      meta: {PrettyChipPosition: 'alone'},
      columns: dynamicColumns,
    }),
  ];

  const table = useReactTable({
    data: groupedData,
    columns: [...staticColumns],
    getCoreRowModel: getCoreRowModel(),
    // Selection
    onRowSelectionChange: selection => {
      setRowSelection(selection);
      table.options.state.rowSelection = rowSelection;
    },
    // enableRowSelection: row => {
    //   if (row.subRows && row.subRows.length > 0) {
    //     return false;
    //   }
    //   return true;
    // },
    enableRowSelection: true,
    // onRowSelectionChange: setRowSelection,
    // Grouping / Expanding
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    // getSubRows: (row: StudentRow) => row.subAttainments,
    enableGrouping: true,
    enableSorting: true,
    autoResetExpanded: false,
    state: {
      rowSelection,
      expanded,
      grouping,
      sorting,
    },

    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // debugAll: true,
  });

  return (
    <div className="p-2">
      <button
        onClick={() =>
          table.setGrouping(old => {
            const res = [...toggleString(old, 'grouping')];
            return res;
          })
        }
      >
        Group by Date
      </button>
      <input
        type="text"
        value={
          (table.getColumn('studentNumber')?.getFilterValue() ?? '') as string
        }
        onChange={e =>
          table.getColumn('studentNumber')?.setFilterValue(e.target.value)
        }
        placeholder={'Search...'}
        className="w-36 border shadow rounded"
      />
      <table style={{borderCollapse: 'collapse', borderSpacing: '0'}}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  style={{
                    // border: '1px solid lightgray',
                    padding: '0px',
                    height: '50px',
                  }}
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <PrettyChip
                      position={
                        header.column.columnDef.meta?.PrettyChipPosition ===
                        'alone'
                          ? undefined
                          : header.column.columnDef.meta?.PrettyChipPosition ??
                            'middle'
                      }
                      style={{
                        fontWeight: 'bold',
                      }}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {!header.column.getCanSort() ? null : (
                          <IconButton>
                            <>
                              {{
                                asc: <ArrowUpward />,
                                desc: (
                                  <ArrowUpward style={{rotate: '180deg'}} />
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <Sort></Sort>
                              )}
                            </>
                          </IconButton>
                        )}
                      </>
                    </PrettyChip>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              // style={{border: '1px solid lightgray'}}
            >
              {row.getVisibleCells().map(cell => {
                return (
                  <td
                    key={cell.id}
                    {...{
                      style: {
                        padding: '0px',
                        height: '50px',
                        textAlign: 'center',
                      },
                    }}
                  >
                    {cell.getIsGrouped() ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        {/* <Badge
                          badgeContent={
                            row.getIsExpanded() ? null : row.subRows.length
                          }
                          color="primary"
                        >
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={row.getToggleExpandedHandler()}
                            disabled={!row.getCanExpand()}
                          >
                            {row.getIsExpanded() ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </IconButton>
                        </Badge> */}
                        <PrettyChip
                          onClick={row.getToggleExpandedHandler()}
                          position="first"
                        >
                          <>
                            <Badge
                              badgeContent={
                                row.getIsExpanded() ? null : row.subRows.length
                              }
                              color="primary"
                            >
                              <IconButton
                                size="small"
                                color="primary"
                                // onClick={row.getToggleExpandedHandler()}
                                disabled={!row.getCanExpand()}
                              >
                                {row.getIsExpanded() ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </IconButton>
                            </Badge>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{' '}
                          </>
                        </PrettyChip>
                        {/* {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}{' '} */}
                        {/* ({row.subRows.length}) */}
                      </>
                    ) : cell.getIsAggregated() ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      flexRender(
                        cell.column.columnDef.aggregatedCell ??
                          cell.column.columnDef.cell,
                        cell.getContext()
                      )
                    ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      <>
                        {cell.getValue() === undefined ? (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottom: '1px solid lightgray',
                              height: '100%',
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <StudentGradesDialog
        user={user as FinalGrade}
        setOpen={setShowUserGrades}
        open={showUserGrades}
      />
    </div>
  );
};
export default CourseResultsTanTable;