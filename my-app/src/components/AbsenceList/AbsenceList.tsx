import React from 'react';
import { Absence } from '../../types';

export interface AbsenceListProps {
  data?: Absence[];
}

const AbsenceList: React.FC<AbsenceListProps> = ({ data }) => {
  return (
    <table data-testid="absence-list">
      <thead>
      <tr>
        <th>Employee ID</th>
        <th>Employee Name</th>
        <th>Start Date</th>
        <th>Days</th>
        <th>Absence Type</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {data?.map((absence) => (
        <tr key={absence.id} data-testid="option">
        <td>{absence.id}</td>
        <td>{absence.employee.firstName} {absence.employee.lastName}</td>
        <td>{absence.startDate}</td>
        <td>{absence.days}</td>
        <td>{absence.absenceType}</td>
        <td>{absence.approved ? 'Approved' : 'Not Approved'}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default AbsenceList;