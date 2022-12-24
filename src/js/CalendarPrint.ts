import * as m from 'mithril';
import CalendarMonth from './CalendarMonth';

export default class CalendarPrint implements m.ClassComponent {
    view() {
        let year: number;
        const yearQuery = m.parseQueryString(window.location.search).year;

        if (typeof yearQuery === 'string') {
            year = parseInt(yearQuery);
        } else {
            const now = (new Date());
            // On prend l'année d'une date légèrement dans le futur puisqu'on va généralement générer le calendrier juste à la fin de l'année précédente ou début de l'année actuelle
            now.setMonth(now.getMonth() + 3);

            year = now.getFullYear();
        }

        return m('.calendar-print', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
            monthIndex => {
                return m('.calendar-page', [
                    m(CalendarMonth, {
                        year,
                        month: monthIndex,
                        weeksPerLine: 1,
                    }),
                ]);
            }
        ));
    }
}
