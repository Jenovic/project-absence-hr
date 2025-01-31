export interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: string;
  employee: {
    firstName: string;
    lastName: string;
    id: string;
  };
  approved: boolean;
}

export interface conflictingAbsence {
  conflicts: boolean;
}

export type SortParams = {
  key: string;
  direction: 'asc' | 'desc';
};