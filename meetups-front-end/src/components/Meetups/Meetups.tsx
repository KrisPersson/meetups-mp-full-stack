
interface Meetup {
    meetupId: number;
    title: string;
    date: string;
    venue: string;
    shortInfo: string;
    info: string;
    host: string;
    maxNumberOfAttendees?: number;
    numberOfAttendees?: number;
}
const meetupArr: Meetup[] = [
    {
        meetupId: 1,
        title: "Hundar utan öron",
        date: "2021-09-01",
        venue: "Hundparken",
        shortInfo: "Vi träffas och pratar om hundar utan öron...",
        info: "Vi träffas och pratar om hundar utan öron lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        host: "Brukshundsklubben",
        maxNumberOfAttendees: 5,
        numberOfAttendees: 3,
    }, {
        meetupId: 2,
        title: "Katter med öron",
        date: "2021-09-02",
        venue: "Kattparken",
        shortInfo: "Vi träffas och pratar om katter med öron...",
        info: "Vi träffas och pratar om katter med öron lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        host: "Brukskattsklubben",
        maxNumberOfAttendees: 10,
        numberOfAttendees: 8,
    },
    {
        meetupId: 3,
        title: "fåglar med näbb",
        date: "2021-09-03",
        venue: "fågelparken",
        shortInfo: "Vi träffas och pratar om fåglar med näbb...",
        info: "Vi träffas och pratar om fåglar med näbb lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        host: "Bruksfågelsklubben",
        maxNumberOfAttendees: 8,
        numberOfAttendees: 7,
    }, {
        meetupId: 4,
        title: "fiskar med fenor",
        date: "2021-09-04",
        venue: "fiskparken",
        shortInfo: "Vi träffas och pratar om fiskar med fenor...",
        info: "Vi träffas och pratar om fiskar med fenor lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        host: "Bruksfisksklubben",
        maxNumberOfAttendees: 2,
        numberOfAttendees: 2,
    }, {
        meetupId: 5,
        title: "hästar med hovar",
        date: "2021-09-05",
        venue: "hästparken",
        shortInfo: "Vi träffas och pratar om hästar med hovar...",
        info: "Vi träffas och pratar om hästar med hovar lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        host: "Brukshästsklubben",
        maxNumberOfAttendees: 3,
        numberOfAttendees: 3,
    }
]
export default meetupArr;