enum MonthsOfYear {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export const getDateWithTime = () => {
    const date = new Date();

    const day = date.getDate();
    const month = MonthsOfYear[date.getMonth()]
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [`${day}${month}${year}`, `${hours}:${minutes}:${seconds}`]
}