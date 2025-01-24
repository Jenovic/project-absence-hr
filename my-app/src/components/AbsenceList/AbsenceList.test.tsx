import React from 'react';
import { render, screen } from '@testing-library/react';
import AbsenceList from './AbsenceList';

describe('<AbsenceList />', () => {
  it('should render', () => {
    render(<AbsenceList data={[]} />);
    expect(screen.getByTestId('absence-list')).toBeInTheDocument();
  });

  it('should render a list of absences', () => {
    render(
    <AbsenceList
      data={[
        {
          "id": 0,
          "startDate": "2022-05-28T04:39:06.470Z",
          "days": 9,
          "absenceType": "SICKNESS",
          "employee": {
            "firstName": "Rahaf",
            "lastName": "Deckard",
            "id": "2ea05a52-4e31-450d-bbc4-5a6c73167d17"
          },
          "approved": true
        },
        {
          "id": 1,
          "startDate": "2022-02-08T08:02:47.543Z",
          "days": 5,
          "absenceType": "ANNUAL_LEAVE",
          "employee": {
            "firstName": "Enya",
            "lastName": "Behm",
            "id": "84502153-69e6-4561-b2de-8f21f97530d3"
          },
          "approved": true
        },
      ]}
     />
  );
    expect(screen.getAllByTestId('option')).toHaveLength(2);
  });
});