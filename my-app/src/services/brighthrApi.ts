import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Absence, conflictingAbsence } from "../types";

export const brighthrApi = createApi({
    reducerPath: 'brightHRApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://front-end-kata.brighthr.workers.dev/api/' }),
    endpoints: (builder) => ({
        getAbsences: builder.query<Absence[], void>({
            query: () => 'absences'
        }),
        getAbsenceConflicts: builder.query<conflictingAbsence, number>({
            query: (id) => `conflict/${id}`
        }),
    }),
});

export const { useGetAbsencesQuery, useGetAbsenceConflictsQuery } = brighthrApi;