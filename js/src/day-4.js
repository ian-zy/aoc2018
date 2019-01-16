function parseRecordsToSleepTimes(records) {
    class SleepTime {
        constructor(startMinute) {
            this.startMinute = parseInt(startMinute)
        }

        get duration() {
            return this.endMinute - this.startMinute
        }

        wakeup(endMinute) {
            this.endMinute = parseInt(endMinute)
        }

        isAsleep() {
            return this.endMinute === undefined
        }

        include(minute) {
            return minute >= this.startMinute && minute < this.endMinute
        }
    }

    const sleepTimes = {}
    let currentGuard = null
    let sleepTime = null
    Array.from(records).sort().forEach(record => {
        const [_, hour, minute, description] = record.match(/\[\d{4}-\d{2}-\d{2}\s+(\d{2}):(\d{2})\]\s+(.+)/)
        if(description.startsWith('Guard')) {
            const [_, id] = description.match(/Guard #(\d+) begins shift/)
            currentGuard = id
            if(sleepTimes[currentGuard] === undefined) {
                sleepTimes[currentGuard] = []
            }
        } else if(description === 'falls asleep') {
            sleepTime = new SleepTime(minute)
        } else if(description === 'wakes up') {
            sleepTime.wakeup(minute)
            sleepTimes[currentGuard].push(sleepTime)
            sleepTime = null
        } else {
            console.warn(`Unrecognized record ${record}`)
        }
    })

    return sleepTimes
}

function findSleepyGuardStrategy1(records) {
    const sleepTimes = parseRecordsToSleepTimes(records)

    let maxTotalSleepTime = 0
    let laziestGuard = null
    let laziestSleepTimes = null
    for(let id in sleepTimes) {
        const totalSleepTime = sleepTimes[id].reduce((total, current) => total + current.duration, 0)
        if(totalSleepTime > maxTotalSleepTime) {
            maxTotalSleepTime = totalSleepTime
            laziestGuard = id
            laziestSleepTimes = sleepTimes[id]
        }
    }

    let mostAsleepMinute = null
    let mostAsleepCount = 0

    for(let i=0; i<60; i++) {
        asleepCount = laziestSleepTimes.filter(st => st.include(i)).length
        if(asleepCount > mostAsleepCount) {
            mostAsleepCount = asleepCount
            mostAsleepMinute = i
        }
    }

    return parseInt(laziestGuard) * mostAsleepMinute
}

function findSleepyGuardStrategy2(records) {
    const sleepTimes = parseRecordsToSleepTimes(records)
    
    let mostAsleepCount = 0
    let mostAsleepMinute = null
    let laziestGuard = null
    for(let i=0; i<60; i++) {
        const mostAsleepGuard = Object.entries(sleepTimes)
        .map(([id, sts]) => [id, sts.filter(st => st.include(i)).length])
        .reduce((p, c) => c[1] > p[1] ? c : p)
        if(mostAsleepGuard[1] > mostAsleepCount) {
            mostAsleepCount = mostAsleepGuard[1]
            mostAsleepMinute = i
            laziestGuard = mostAsleepGuard[0]
        }
    }

    return parseInt(laziestGuard) * mostAsleepMinute
}

module.exports = {
    findSleepyGuardStrategy1,
    findSleepyGuardStrategy2
}
