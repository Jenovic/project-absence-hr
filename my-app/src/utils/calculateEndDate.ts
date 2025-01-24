export const calculateEndDate = (startDate: string, days: number): string => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + days);
    return end.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}; 