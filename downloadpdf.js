const got = require('got');
const fs = require('fs');

const getWeekNumber = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0 ,1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
};

const downloadUrl = `https://www.matoppet.se/wp-content/uploads/2022/08/Matoppet_v${getWeekNumber()}_edition_1.pdf`;



