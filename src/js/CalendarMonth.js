import m from 'mithril';
import chunkArray from './chunkArray';

const weekDays = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
];

const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
];

// https://www.jura.ch/DES/SEE/AMT/Documentation-formulaires-et-bases-legales/Jours-feries/Jours-feries-officiels-dans-le-Canton-du-Jura.html
// Month starting with 1 = January
const feries = [
    [2018, 1, 1],
    [2018, 1, 2],
    [2018, 3, 30],
    [2018, 4, 2],
    [2018, 5, 1],
    [2018, 5, 10],
    [2018, 5, 21],
    [2018, 5, 31],
    [2018, 6, 23],
    [2018, 8, 1],
    [2018, 8, 15],
    [2018, 11, 1],
    [2018, 12, 25],

    [2019, 1, 1],
    [2019, 1, 2],
    [2019, 4, 19],
    [2019, 4, 22],
    [2019, 5, 1],
    [2019, 5, 30],
    [2019, 6, 10],
    [2019, 6, 20],
    [2019, 6, 23],
    [2019, 8, 1],
    [2019, 8, 15],
    [2019, 11, 1],
    [2019, 12, 25],

    [2020, 1, 1],
    [2020, 1, 2],
    [2020, 4, 10],
    [2020, 4, 13],
    [2020, 5, 1],
    [2020, 5, 21],
    [2020, 6, 1],
    [2020, 6, 11],
    [2020, 6, 23],
    [2020, 8, 1],
    [2020, 8, 15],
    [2020, 11, 1],
    [2020, 12, 25],
];

const DAYS_PER_WEEK = 7;
const WEEK_START_ON = 1;

export default {
    view(vnode) {
        const {
            month,
            weeksPerLine = 1,
        } = vnode.attrs;

        const year = parseInt(vnode.attrs.year);

        let head = [];

        for (let i = WEEK_START_ON; i < DAYS_PER_WEEK * weeksPerLine + WEEK_START_ON; i++) {
            head.push(m('th', weekDays[i % DAYS_PER_WEEK].substring(0, 2)));
        }

        let body = [];
        let dayNumber = 1;
        let day = new Date(year, month, dayNumber);

        const weekDaysBeforeStartOfMonth = (day.getDay() - WEEK_START_ON + DAYS_PER_WEEK) % DAYS_PER_WEEK;

        for (let i = 0; i < weekDaysBeforeStartOfMonth; i++) {
            body.push(m('td.calendar-day.day-other-month'));
        }

        while (day.getMonth() === month) {
            const ferie = feries.some(ferieDay => {
                return ferieDay[0] === year && ferieDay[1] === (month + 1) && ferieDay[2] === dayNumber;
            });

            body.push(m('td.calendar-day.day-this-month', {
                className: 'weekday-' + day.getDay() + (ferie ? ' day-ferie' : ''),
            }, m('.date-wrapper', dayNumber)));

            dayNumber++;
            day = new Date(year, month, dayNumber);
        }

        const daysToFinishLine = Math.ceil(body.length / (DAYS_PER_WEEK * weeksPerLine)) * (DAYS_PER_WEEK * weeksPerLine) - body.length;

        for (let i = 0; i < daysToFinishLine; i++) {
            body.push(m('td.calendar-day.day-other-month'));
        }

        return m('.calendar-meta', [
            m('.calendar-month-heading', [
                m('h3.calendar-month', months[month]),
                m('p.calendar-year', year),
            ]),
            m('', m('table', [
                m('thead', m('tr', head)),
                m('tbody', chunkArray(body, DAYS_PER_WEEK * weeksPerLine).map(
                    line => m('tr', line)
                )),
            ])),
        ]);
    }
}
