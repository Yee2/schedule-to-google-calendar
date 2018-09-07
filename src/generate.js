import dayjs from 'dayjs';

const header = "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n";
const time = {
    start: {
        "1": "08:00",
        "2": "08:55",
        "3": "10:00",
        "4": "10:55",
        "5": "12:00",
        "6": "14:00",
        "7": "14:55",
        "8": "16:00",
        "9": "16:55",
        "10": "18:30",
        "11": "18:55"
    },
    end: {
        "1": "08:45",
        "2": "09:40",
        "3": "10:45",
        "4": "11:40",
        "5": "12:45",
        "6": "14:45",
        "7": "15:40",
        "8": "16:45",
        "9": "17:40",
        "10": "18:45",
        "11": "19:40",
        "12": "20:45",
    }
};
export default function generate(date,obj) {
    let raw = "";
    obj.forEach((item) => {
        let start = dayjs(date).add(--item.startWeek, "week"),
            end = dayjs(date).add(item.endWeek, "week");
        for (let t = start; t.isBefore(end); t = t.add(1, "day")) {
            if (t.day() === item.week) {
                raw += [Escape(item.name), t.format("DD/MM/YYYY"), time.start[item.startTime],
                    t.format("DD/MM/YYYY"), time.end[item.endTime], "False", Escape(item.description), Escape(item.location), "True"
                ].join(",") + "\n";
            }
        }
    });
    return header + raw;
}

function Escape(str) {
    if (str === undefined) {
        return ""
    }
    if (str.includes(",")) {
        if (str.includes("\"")) {
            str = str.replace("\"", "\"\"")
        }
        return "\"" + str + "\"";
    }
    return str;
}