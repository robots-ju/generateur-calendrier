import * as m from 'mithril';
import chunkArray from './chunkArray';
import {feries} from './joursFeries';

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

const DAYS_PER_WEEK = 7;
const WEEK_START_ON = 1;

interface CalendarMonthAttrs {
    year: number
    month: number
    weeksPerLine?: number
}

export default class CalendarMonth implements m.ClassComponent<CalendarMonthAttrs> {
    view(vnode: m.Vnode<CalendarMonthAttrs>) {
        const {
            month,
            weeksPerLine = 1,
        } = vnode.attrs;

        const {year} = vnode.attrs;

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
