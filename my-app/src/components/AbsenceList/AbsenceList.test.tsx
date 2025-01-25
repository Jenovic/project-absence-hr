import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { calculateEndDate } from '../../utils/calculateEndDate';
import { brighthrApi, useGetAbsenceConflictsQuery } from '../../services/brighthrApi';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockAbsenceData } from '../../__mocks__/brighthrApi';
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
  
});