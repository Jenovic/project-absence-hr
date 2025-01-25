import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AbsenceCard from './AbsenceCard';
import { mockAbsenceData } from '../../__mocks__/brighthrApi';

describe('<AbsenceCard />', () => {
    const mockEmployeeName = 'Enya Behm';
    const mockOnClose = jest.fn();

    it('should render correctly when open', () => {
        render(
        <AbsenceCard
            isOpen={true}
            onClose={mockOnClose}
            employeeAbsences={mockAbsenceData}
            employeeName={mockEmployeeName}
        />
        );

        expect(screen.getByText(`Full Name: ${mockEmployeeName}`)).toBeInTheDocument();
        expect(screen.getByText('Start Date: 2022-02-08T08:02:47.543Z')).toBeInTheDocument();
        expect(screen.getByText('Days: 5')).toBeInTheDocument();
        expect(screen.getByText('Type: ANNUAL_LEAVE')).toBeInTheDocument();
        expect(screen.getByText('Status: Approved')).toBeInTheDocument();
    });

    it('should not render when closed', () => {
        render(
          <AbsenceCard
            isOpen={false}
            onClose={mockOnClose}
            employeeAbsences={mockAbsenceData}
            employeeName={mockEmployeeName}
          />
        );

        expect(screen.queryByText(`${mockEmployeeName}'s Absences`)).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
        render(
          <AbsenceCard
            isOpen={true}
            onClose={mockOnClose}
            employeeAbsences={mockAbsenceData}
            employeeName={mockEmployeeName}
          />
        );
    
        fireEvent.click(screen.getByText('Close'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});