class TimeParser {
    static onlyHoursMinutesSeconds(time) {
        return time.split('T')[1]
    }
}

export default TimeParser;