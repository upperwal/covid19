import dlake from 'pravah-datalake'

class Data {
    latest() {
        let डेटालेक = new dlake.Datalake('/Covid19District', '1cDpdkE2Qvq26OvUAxkXswmHcXEPUBS6Wcig6ERQvPrQ')
        return new Promise((resolve, reject) => {
            डेटालेक.get().then(res => {
                resolve({
                    india: {
                        ...res.countries[0].stats,
                        timestamp: res.header.timestamp
                    },
                    states: this.extractStatesData(res.countries[0].states)
                })
            })
        })
    }

    extractStatesData(states) {
        let res = {}
        let stateData = {}
        let max = 0
        states.forEach(function(s) {
            stateData[s.code] = s.stats
            if(s.districts === undefined) {
                return
            }
            s.districts.forEach((d) => {
                res[d.code] = d.stats.activePositiveCases
                if(max < d.stats.activePositiveCases) {
                    max = d.stats.activePositiveCases
                }
            })
        })
        return {
            mapData: res,
            mapDataStates: stateData,
            maxDistrictCount: max
        }
    }
}

export default Data