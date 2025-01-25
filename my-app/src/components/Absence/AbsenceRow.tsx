import React from 'react';
import { Absence } from '../../types';
import { calculateEndDate } from '../../utils/calculateEndDate';
import { useGetAbsenceConflictsQuery } from '../../services/brighthrApi';

export interface AbsenceRowProps {
    absence: Absence;
    headers: {
        key: string;
        label: string;
    }[];
}

const AbsenceRow: React.FC<AbsenceRowProps> = ({ absence, headers }) => {
    const { data, isLoading } = useGetAbsenceConflictsQuery(absence.id) || {};
    return (
        <tr key={absence.id} data-testid="absence">
            <td data-label={headers[0].label}><span>{absence.startDate}</span></td>
            <td data-label={headers[1].label}><span>{calculateEndDate(absence.startDate, absence.days)}</span></td>
            <td data-label={headers[2].label}><span>{absence.employee.firstName} {absence.employee.lastName}</span></td>
            <td data-label={headers[3].label}><span>{absence.approved ? 'Approved' : 'Pending'}</span></td>
            <td data-label={headers[4].label}><span>{absence.absenceType}</span></td>
            <td data-label={headers[5].label}>
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <span className={data?.conflicts ? 'text-red-500 font-bold' : 'text-green-500'}>
                        {data?.conflicts ? 'Conflict' : 'No Conflict'}
                    </span>
                )}
            </td>
        </tr>
    );
}

export default AbsenceRow