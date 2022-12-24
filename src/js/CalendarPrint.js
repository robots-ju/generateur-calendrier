import m from 'mithril';
import CalendarMonth from './CalendarMonth';

export default {
    view(vnode) {
        return m('.calendar-print', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
            monthIndex => {
                return m('.calendar-page', [
                    m(CalendarMonth, {
                        year: 2020,
                        month: monthIndex,
                        weeksPerLine: 1,
                    }),
                ]);
            }
        ));
    },
}
