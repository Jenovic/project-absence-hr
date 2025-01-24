import React from 'react';
import { Absence } from '../../types';
import { calculateEndDate } from '../../utils/calculateEndDate';

export interface AbsenceListProps {
  data?: Absence[];
}

const AbsenceList: React.FC<AbsenceListProps> = ({ data }) => {
  return (
    <div className='relative overflow-x-auto'>
      <table data-testid="absence-list">
        <thead>
        <tr>
          {['Start Date', 'End Date', 'Employee Name', 'approved/pending approval', 'Absence Type'].map((header) => (
          <th scope="col" key={header}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data?.map((absence) => (
          <tr key={absence.id} data-testid="absence">
          <td scope="col">{absence.startDate}</td>
          <td scope="col">{calculateEndDate(absence.startDate, absence.days)}</td>
          <td scope="col">{absence.employee.firstName} {absence.employee.lastName}</td>
          <td scope="col">{absence.approved ? 'Approved' : 'Pending'}</td>
          <td scope="col">{absence.absenceType}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default AbsenceList;