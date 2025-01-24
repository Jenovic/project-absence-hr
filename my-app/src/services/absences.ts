import { fetchCall } from "../utils/fecthCall";

export const getAbsences = async () =>
    fetchCall({ method: 'GET', endpoint: 'absences' });

export const getAbsenceConflits = async (absenceId: number) => 
    fetchCall({ method: 'GET', endpoint: `conflict/${absenceId}` });