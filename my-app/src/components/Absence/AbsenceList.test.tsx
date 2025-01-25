import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { calculateEndDate, sortAbsences } from '../../utils';
import { brighthrApi, useGetAbsenceConflictsQuery } from '../../services/brighthrApi';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockAbsenceData } from '../../__mocks__/brighthrApi';
import { Absence } from '../../types';
import AbsenceList from './AbsenceList';

jest.mock('../../services/brighthrApi', () => ({
  ...jest.requireActual('../../services/brighthrApi'),
  useGetAbsenceConflictsQuery: jest.fn(),
}));

describe('<AbsenceList />', () => {
  beforeEach(() => {
    const store = configureStore({
      reducer: {
        [brighthrApi.reducerPath]: brighthrApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(brighthrApi.middleware),
    });

    (useGetAbsenceConflictsQuery as jest.Mock)
      .mockReturnValueOnce({ data: { conflicts: false }, isLoading: false })
      .mockReturnValueOnce({ data: { conflicts: true }, isLoading: false });
  
    render(
      <Provider store={store}>
        <AbsenceList data={mockAbsenceData} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });  

  it('should render', () => {
    expect(screen.getByTestId('absence-list')).toBeInTheDocument();
  });

  it('should render a list of absences', () => {
    expect(screen.getAllByTestId('absence')).toHaveLength(2);
  });

  it('should render "Approved" for approved absences', () => {
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('should render "Pending" for pending absences', () => {
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('should render the correct end date for each absence', () => {
    mockAbsenceData.forEach(absence => {
      const endDate = calculateEndDate(absence.startDate, absence.days);
      expect(screen.getByText(endDate)).toBeInTheDocument();
    });
  });

  it('should render correct conflict data for each absence', async () => {
    await waitFor(() => {
      expect(screen.getByText('No Conflict')).toBeInTheDocument();
      expect(screen.getByText('Conflict')).toBeInTheDocument();
    });
  
    mockAbsenceData.forEach((absence) => {
      expect(useGetAbsenceConflictsQuery).toHaveBeenCalledWith(absence.id);
    });
  });

  it('should sort absences when clicking on column headers', async () => {
    // Click on 'Start Date' header to sort
    fireEvent.click(screen.getByText('Start Date'));

    // Use sortAbsences to get the expected order
    const sortedData: Absence[] = sortAbsences(mockAbsenceData, { key: 'startDate', direction: 'asc' });
    const sortedRows = screen.getAllByTestId('absence');

    // Check if the order matches the sorted data
    sortedData.forEach((absence, index) => {
      expect(within(sortedRows[index]).getByText(absence.employee.firstName + ' ' + absence.employee.lastName)).toBeInTheDocument();
    });

    // Click again to reverse the order
    fireEvent.click(screen.getByText('Start Date'));

    // Use sortAbsences to get the expected reverse order
    const reverseSortedData = sortAbsences(mockAbsenceData, { key: 'startDate', direction: 'desc' });
    const reverseSortedRows = screen.getAllByTestId('absence');

    // Check if the order matches the reverse sorted data
    reverseSortedData.forEach((absence, index) => {
      expect(within(reverseSortedRows[index]).getByText(absence.employee.firstName + ' ' + absence.employee.lastName)).toBeInTheDocument();
    });
  });
});