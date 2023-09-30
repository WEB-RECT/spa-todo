import moment from "moment/moment";

const currentType: string = 'YYYY-MM-DD HH:mm:ss'

export const timeUnixConvert = (unix: number | null, type?: string | undefined) => {
    if (unix) {
        return moment.unix(+unix / 1000).format(type || currentType)
    } else {
        return 'Нет даты'
    }
}

export const timeUnixConvertDuration = (unixEnd: number, unixNow: number) => {
    let now = moment(timeUnixConvert(unixNow))
    let end = moment(timeUnixConvert(unixEnd))
    let duration: any = moment.duration(now.diff(end))

    let result = ''

    let years = duration._data.years ? duration._data.years + ' Лет' : ''
    let months = duration._data.months ? duration._data.months + ' Месяцев ' : ''
    let days = duration._data.days ? duration._data.days + ' Дней ' : ''
    let hours = duration._data.hours ? duration._data.hours + ' Часов ' : ''
    let minutes = duration._data.minutes ? duration._data.minutes + ' Минут ' : ''
    let seconds = duration._data.seconds ? duration._data.seconds + ' Секунды ' : ''

    if (years) {
        result += `${years}`
    }
    if (months) {
        result += `${months}`
    }
    if (days) {
        result += `${days}`
    }
    if (hours) {
        result += `${hours}`
    }
    if (minutes) {
        result += `${minutes}`
    }
    if (seconds) {
        result += `${seconds}`
    }

    return result
}


