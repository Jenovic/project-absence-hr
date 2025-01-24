import React from 'react';
import { render, screen } from '@testing-library/react';
import AbsenceList from './AbsenceList';

describe('<AbsenceList />', () => {
  it('should render', () => {
    render(<AbsenceList />);
    expect(screen.getByTestId('absence-list')).toBeInTheDocument();
  });
});