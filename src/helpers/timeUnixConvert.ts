import moment from "moment/moment";

const currentType: string = "YYYY-MM-DD HH:mm:ss";

export const timeUnixConvert = (
    unix: number | null,
    type?: string | undefined,
) => {
    if (unix) {
        return moment.unix(+unix / 1000).format(type || currentType);
    } else {
        return "Нет даты";
    }
};

export const timeUnixConvertDuration = (unixEnd: number, unixNow: number) => {
    const now = moment(timeUnixConvert(unixNow));
    const end = moment(timeUnixConvert(unixEnd));
    const duration: any = moment.duration(now.diff(end));

    let result = "";

    const years = duration._data.years ? duration._data.years + " Лет" : "";
    const months = duration._data.months
        ? duration._data.months + " Месяцев "
        : "";
    const days = duration._data.days ? duration._data.days + " Дней " : "";
    const hours = duration._data.hours ? duration._data.hours + " Часов " : "";
    const minutes = duration._data.minutes
        ? duration._data.minutes + " Минут "
        : "";
    const seconds = duration._data.seconds
        ? duration._data.seconds + " Секунды "
        : "";

    if (years) {
        result += `${years}`;
    }
    if (months) {
        result += `${months}`;
    }
    if (days) {
        result += `${days}`;
    }
    if (hours) {
        result += `${hours}`;
    }
    if (minutes) {
        result += `${minutes}`;
    }
    if (seconds) {
        result += `${seconds}`;
    }

    return result;
};
