
let schema = [
    {
        klass: 'tetek21',
        day: 'monday',
        time: '0930',
        lection: 'Svenska 2',
        hall: '811'
    },
    {
        klass: 'tetek21',
        day: 'monday',
        time: '1040',
        lection: 'Programmering 1',
        hall: '909'
    },
    {
        klass: 'tetek21',
        day: 'monday',
        time: '1300',
        lection: 'Mentorstid',
        hall: '906'
    },
    {
        klass: 'tetek21',
        day: 'monday',
        time: '1350',
        lection: 'Lärtid',
        hall: '916'
    },
    {
        klass: 'tetek21',
        day: 'tuesday',
        time: '830',
        lection: 'Matte 3c',
        hall: '909'
    },
    {
        klass: 'tetek21',
        day: 'tuesday',
        time: '1000',
        lection: 'Fysik 1a',
        hall: '908'
    },
    {
        klass: 'tetek21',
        day: 'tuesday',
        time: '1220',
        lection: 'Fysik 1a',
        hall: '903'
    },
    {
        klass: 'tetek21',
        day: 'wednesday',
        time: '1000',
        lection: 'Programmering 1',
        hall: '708'
    },
    {
        klass: 'tetek21',
        day: 'wednesday',
        time: '1220',
        lection: 'Engelska 6',
        hall: '908'
    },
    {
        klass: 'tetek21',
        day: 'wednesday',
        time: '1350',
        lection: 'Teknik 2',
        hall: '708'
    },
    {
        klass: 'tetek21',
        day: 'wednesday',
        time: '1520',
        lection: 'Matte 3c',
        hall: '811'
    },
    {
        klass: 'tetek21',
        day: 'thursday',
        time: '830',
        lection: 'Engelska 6',
        hall: '916'
    },
    {
        klass: 'tetek21',
        day: 'thursday',
        time: '1000',
        lection: 'Svenska 2',
        hall: '000'
    },
    {
        klass: 'tetek21',
        day: 'thursday',
        time: '1220',
        lection: 'Matte 3c',
        hall: '906'
    },
    {
        klass: 'tetek21',
        day: 'thursday',
        time: '1350',
        lection: 'Teknik 2',
        hall: '708'
    },
    {
        klass: 'tetek21',
        day: 'friday',
        time: '830',
        lection: 'Individuellt val',
        hall: '000'
    },
    {
        klass: 'tetek21',
        day: 'friday',
        time: '1220',
        lection: 'Fysik 2',
        hall: '916'
    },
    {
        klass: 'tetek21',
        day: 'friday',
        time: '1350',
        lection: 'Matte 3c',
        hall: '909'
    },
]
days = [null, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']


function findLection() {
    const date = new Date()
    const currenttime = `${date.getHours()}${date.getMinutes() + 10}`
    const currentday = days[date.getUTCDay()]

    let result = schema.find(({ day, time }) => day === currentday && time === currenttime)
    if (result != -1) {
        return result;
    } else {
        return false;
    }
}

module.exports = {
    schema: schema,
    days: days,
    findLection: findLection()
}
