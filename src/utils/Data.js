import dlake from 'pravah-datalake'
import stateCode from './state_code_to_name.json'
import wroldData from './world_data.json'

class Data {
    latest() {
        let डेटालेक = new dlake.Datalake('/Covid19District', '1cDpdkE2Qvq26OvUAxkXswmHcXEPUBS6Wcig6ERQvPrQ')
        return new Promise((resolve, reject) => {
            डेटालेक.latest(3).then(res => {

                let p = new Pipeline()
                p.add('mapping_past_data', (args) => {
                    return {
                        pastMap: this.mapData(args[1].item),
                        latestData: args[0].item
                    }
                    
                }).add('diff_agg', (args) => {
                    return this.diffAndAggData(args.pastMap, args.latestData)
                }).add('improved_data', args => {
                    let diff = args.diffStats
                    let improved = []
                    let sortupdate=[]
                    Object.keys(diff).forEach(k => {
                        // if(diff[k].activePositiveCases < 0) {
                        //     improved.push(k)
                        // }
                        if(k === 'india' || k === 'timestamp') {
                            return
                        }
                        sortupdate.push({...diff[k], 'state_code': k})
                    })
                    sortupdate.sort((a, b) => {
                        return a.activePositiveCases - b.activePositiveCases
                    })

                    for(let i=0; i<sortupdate.length; i++) {
                        if(sortupdate[i].activePositiveCases >= 0) {
                            break
                        }
                        improved.push(sortupdate[i])
                    }
                    return {
                        ...args,
                        improved: improved,
                        worstHit: sortupdate.reverse().slice(0, 6)

                    }
                }).add('static_data', args => {
                    return {
                        ...args,
                        stateCode: stateCode,
                        worldData: wroldData
                    }
                })
                resolve(p.execute(res))
            })
            
        })
    }

    mapData(d) {
        let res = {}
        res['india'] = d.countries[0].stats
        res['timestamp'] = d.header.timestamp

        d.countries[0].states.forEach(s => {
            res[s.code] = s.stats
        })
        console.log(res)

        return res
    }

    diff(presentStats, pastStats) {
        return {
            'curedCases': (presentStats.curedCases || 0) - ((pastStats || {}).curedCases || 0),
            'totalPositiveCases': (presentStats.totalPositiveCases || 0) - ((pastStats || {}).totalPositiveCases || 0),
            'activePositiveCases': (presentStats.activePositiveCases || 0) - ((pastStats || {}).activePositiveCases || 0),
            'deathCases': (presentStats.deathCases || 0) - ((pastStats || {}).deathCases || 0)
        }
    }

    diffAndAggData(pastMap, latestData) {
        // Aggregate
        let worstAffectedStates = [];
        let leastAffectStates = [];

        // Detailed
        let statesStats = {}

        // Diff
        let diffStats = {}

        // Temp
        let activePosStateArr = []
        latestData.countries[0].states.forEach(s => {
            if(s.stats.activePositiveCases !== undefined) {
                statesStats[s.code] = s.stats
                activePosStateArr.push([s.code, s.stats.activePositiveCases || 0])
                diffStats[s.code] = this.diff(s.stats, pastMap[s.code])
            }
        })
        diffStats['timestamp'] = latestData.header.timestamp - pastMap.timestamp
        diffStats['india'] = this.diff(latestData.countries[0].stats, pastMap['india'])

        activePosStateArr = activePosStateArr.sort((a, b) => {
            return (a[1] - b[1]) 
        })

        worstAffectedStates = activePosStateArr.slice(activePosStateArr.length - 6).reverse()
        leastAffectStates = activePosStateArr.slice(0, 6)

        /* let min = activePosStateArr[0][1]
        for(let i=0; i < activePosStateArr.length; i++) {
            if(activePosStateArr[i][1] > min) {
                break
            }
            leastAffectStates.push(activePosStateArr[i][0])
        }

        let max = activePosStateArr[activePosStateArr.length - 1][1]
        for(let i=activePosStateArr.length - 1; i > -1; i--) {
            if(activePosStateArr[i][1] < max) {
                break
            }
            worstAffectedStates.push(activePosStateArr[i][0])
        } */
        

        return {
            worstAffectedStates: worstAffectedStates,
            leastAffectStates: leastAffectStates,
            statesStats: statesStats,
            diffStats: diffStats,
            countryStats: latestData.countries[0].stats,
            timestamp: parseInt(latestData.header.timestamp)
        }

        /* let res = {};
        let stateData = {};
        let max = 0;
        let maxStateActiveCount = 0;
        let worstState;
        states.forEach(function(s) {
            stateData[s.code] = s.stats
            if(maxStateActiveCount < s.stats.activePositiveCases || 0) {
                worstState = s
            }
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
            mapDataDistricts: res,
            mapDataStates: stateData,
            maxDistrictCount: max,
            worstState: worstState
        } */
    }
}

class Pipeline {
    constructor() {
        this.funcs = []
    }
    add(name, func) {
        this.funcs.push(func)
        return this
    }

    execute(x) {
        let y = x
        this.funcs.forEach(f => {
            y = f(y)
        })
        return y
    }
}

export default Data