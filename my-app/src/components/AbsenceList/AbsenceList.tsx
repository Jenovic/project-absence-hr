import React from 'react';
import { Absence } from '../../types';
import { calculateEndDate } from '../../utils/calculateEndDate';

export interface AbsenceListProps {
  data?: Absence[];
}

const AbsenceList: React.FC<AbsenceListProps> = ({ data }) => {
  const headers = ['Start Date', 'End Date', 'Employee Name', 'approved/pending approval', 'Absence Type'];
  return (
    <div className='relative overflow-x-auto'>
      <table data-testid="absence-list">
        <thead>
        <tr>
          {headers.map((header) => (
          <th scope="col" key={header}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data?.map((absence) => (
          <tr key={absence.id} data-testid="absence">
          <td data-label={headers[0]}><span>{absence.startDate}</span></td>
          <td data-label={headers[1]}><span>{calculateEndDate(absence.startDate, absence.days)}</span></td>
          <td data-label={headers[2]}><span>{absence.employee.firstName} {absence.employee.lastName}</span></td>
          <td data-label={headers[3]}><span>{absence.approved ? 'Approved' : 'Pending'}</span></td>
          <td data-label={headers[4]}><span>{absence.absenceType}</span></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default AbsenceList;