export const sortedDate = (a: string, b: string) => {
    const convertToDate = (y: string) => {
        const [time, date] = y.split(' - ');
        const [hour, minute] = time.split(':').map(Number);
        const [day, month, year] = date.split('/').map(Number);
        return new Date(year, month - 1, day, hour, minute).getTime();
    };

    return convertToDate(a) - convertToDate(b);
};
