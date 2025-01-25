import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Absence, SortParams } from '../../types';
import { sortAbsences, absenceListheaders } from '../../utils';
import AbsenceRow from './AbsenceRow';
const AbsenceCard = lazy(() => import('./AbsenceCard'));

export interface AbsenceListProps {
  data?: Absence[];
}

const AbsenceList: React.FC<AbsenceListProps> = ({ data }) => {
  const [sortParams, setSortParams] = useState<SortParams | null>(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState<string>('');
  const [selectedEmployeeAbsences, setSelectedEmployeeAbsences] = useState<Absence[]>([]);

  const sortedData = useMemo(() => sortAbsences(data!, sortParams), [data, sortParams]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortParams && sortParams.key === key && sortParams.direction === 'asc') {
      direction = 'desc';
    }
    setSortParams({ key, direction });
  };

  const handleEmployeeClick = (employeeId: string) => {
    const employeeAbsences = sortedData?.filter(absence => absence.employee.id === employeeId) || [];
    setEmployeeName(prevName => {
      const newName = `${employeeAbsences[0].employee.firstName} ${employeeAbsences[0].employee.lastName}`;
      return newName;
    });
    setSelectedEmployeeAbsences(prevAbsences => { return employeeAbsences; });
    setCardOpen(true);
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
            <AbsenceRow 
              key={absence.id} 
              absence={absence} 
              headers={absenceListheaders} 
              onEmployeeClick={handleEmployeeClick}
            />
          ))}
        </tbody>
      </table>
      <Suspense fallback={<div>Loading...</div>}>
        {cardOpen && (
          <AbsenceCard 
            isOpen={cardOpen} 
            onClose={() => setCardOpen(false)}
            employeeName={employeeName} 
            employeeAbsences={selectedEmployeeAbsences} 
          />
        )}
      </Suspense>
    </div>
  )
}

export default AbsenceList;