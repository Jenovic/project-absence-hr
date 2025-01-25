import React, { useState, useMemo } from 'react';
import { Absence, SortParams } from '../../types';
import { sortAbsences } from '../../utils/sortAbsences';
import { absenceListheaders } from '../../utils/absenceListConstants';
import AbsenceRow from './AbsenceRow';

export interface AbsenceListProps {
  data?: Absence[];
}

const AbsenceList: React.FC<AbsenceListProps> = ({ data }) => {
  const [sortParams, setSortParams] = useState<SortParams | null>(null);
  const sortedData = useMemo(() => sortAbsences(data!, sortParams), [data, sortParams]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortParams && sortParams.key === key && sortParams.direction === 'asc') {
      direction = 'desc';
    }
    setSortParams({ key, direction });
  };

  return (
    <div className='relative overflow-x-auto'>
      <table data-testid="absence-list">
        <thead>
        <tr>
          {absenceListheaders.map((header) => (
          <th 
            className={`${header.sort && 'cursor-pointer'}`}
            scope="col" key={header.key} 
            onClick={() => header.sort && handleSort(header.key)}
          >
            {header.label}
            {header.sort && <span className='ml-3'><i className="fa-solid fa-sort"></i></span>}
          </th>
          ))}
        </tr>
        </thead>
        <tbody>
          {sortedData?.map((absence) => (
            <AbsenceRow key={absence.id} absence={absence} headers={absenceListheaders} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AbsenceList;