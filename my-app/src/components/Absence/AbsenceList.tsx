import React from 'react';
import { Absence } from '../../types';
import AbsenceRow from './AbsenceRow';

export interface AbsenceListProps {
  data?: Absence[];
}

const AbsenceList: React.FC<AbsenceListProps> = ({ data }) => {
  const headers = ['Start Date', 'End Date', 'Employee Name', 'approved/pending approval', 'Absence Type', 'Conflicts'];
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
            <AbsenceRow key={absence.id} absence={absence} headers={headers} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AbsenceList;