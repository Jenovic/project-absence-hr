import React from 'react';
import { Absence } from '../../types';
import { calculateEndDate } from '../../utils';
import { useGetAbsenceConflictsQuery } from '../../services/brighthrApi';

export interface AbsenceRowProps {
    absence: Absence;
    headers: {
        key: string;
        label: string;
    }[];
    onEmployeeClick: (employeeId: string) => void;
}

const AbsenceRow: React.FC<AbsenceRowProps> = ({ absence, headers, onEmployeeClick }) => {
    const { data, isLoading } = useGetAbsenceConflictsQuery(absence.id) || {};
    return (
        <tr key={absence.id} data-testid="absence" onClick={() => onEmployeeClick(absence.employee.id)} className="cursor-pointer hover:underline">
            <td data-label={headers[0].label}><span>{absence.startDate}</span></td>
            <td data-label={headers[1].label}><span>{calculateEndDate(absence.startDate, absence.days)}</span></td>
            <td data-label={headers[2].label}><span>{absence.employee.firstName} {absence.employee.lastName}</span></td>
            <td data-label={headers[3].label}><span>{absence.approved ? 'Approved' : 'Pending'}</span></td>
            <td data-label={headers[4].label}><span>{absence.absenceType}</span></td>
            <td data-label={headers[5].label}>
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <span className={`${data?.conflicts ? 'text-red-700' : 'text-green-700'} font-bold`}>
                        {data?.conflicts ? 'Conflict' : 'No Conflict'}
                    </span>
                )}
            </td>
        </tr>
    );
}

export default AbsenceRow;