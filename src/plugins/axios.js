import Vue from 'vue';
import axios from 'axios'

Vue.use({
    install (Vue) {
         
        Vue.prototype.$apiWeather = async (location, condition = 'current') => {
            return asyncGeo(location, condition)
        }
        
        async function asyncWeatherCurrent(geo) {
            return axios.get('http://api.weatherbit.io/v2.0/current?lang=fr&lat='+geo.lat+'&lon='+geo.lon+'&key=c549558b6a7f4130a7cbd606c9b0b6cb')
                .then((res)=> {
                    if (res.status == 200)
                        return res.data
                })
                .then((res)=> {
                    return res.data[0]
                })
        }
        async function asyncWeatherHourly(geo) {

            return axios.get('http://api.weatherbit.io/v2.0/forecast/hourly?lang=fr&lat='+geo.lat+'&lon='+geo.lon+'&key=c549558b6a7f4130a7cbd606c9b0b6cb&hours=48')
                .then((res)=> {
                    if (res.status == 200)
                        return res.data
                })
                .then((res)=> {
                    return res.data
                })
        }
        async function asyncWeatherDaily(geo) {

            return axios.get('http://api.weatherbit.io/v2.0/forecast/daily?lang=fr&lat='+geo.lat+'&lon='+geo.lon+'&key=c549558b6a7f4130a7cbd606c9b0b6cb')
                .then((res)=> {
                    if (res.status == 200)
                        return res.data
                })
                .then((res)=> {
                    return res.data
                })
        }
        async function asyncGeo(location, condition) {
            return axios.get('https://api.opencagedata.com/geocode/v1/json?q='+encodeURIComponent(location)+'&key=2d585c3db22b40908000e8d6cf2b845a')
            .then((res)=> {
                if (res.status == 200)
                    return res.data
            })
            .then((res)=> {
                let location = {}
                if (res.results){
                    location.lat = res.results[0].geometry.lat
                    location.lon = res.results[0].geometry.lng
                    if (condition == 'current')
                        return asyncWeatherCurrent(location)
                    else if (condition == 'hourly')
                        return asyncWeatherHourly(location)
                    else if (condition == 'daily')
                        return asyncWeatherDaily(location)
                }
                
            })
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'accept': 'application/json',
            }
          };
        Vue.prototype.$get = async (path, data={}) => {
            let params= {params: data }
            return axios.get('http://localhost:5000/'+path, params)
            .then((res)=> {
                console.log(res)
                if (res.status == 200)
                    return res.data
            })
            .then((res)=> {
                return res
                
            })
        }
        Vue.prototype.$post = async (path, data = {}) => {
            let params= JSON.stringify(data)
            return axios.post('http://localhost:5000/'+ path, params, axiosConfig )
            .then((res)=> {
                console.log(res)
                if (res.status == 200)
                    return res.data
            })
            .then((res)=> {
                return res
                
            })
        }
        Vue.prototype.$put = async (path, data = {}) => {
            let params= JSON.stringify(data)
            return axios.put('http://localhost:5000/'+path, params, axiosConfig)
            .then((res)=> {
                console.log(res)
                if (res.status == 200)
                    return res.data
            })
            .then((res)=> {
                return res
                
            })
        }

        Vue.prototype.$patch = async (path, data = {}) => {
            let params= JSON.stringify(data)
            return axios.patch('http://localhost:5000/'+path, params, axiosConfig)
            .then((res)=> {
                console.log(res)
                if (res.status == 200)
                    return res.data
            })
            .then((res)=> {
                return res
                
            })
        }
        Vue.prototype.$del = async (path, data= {}) => {
            let params= {params: data, headers: axiosConfig.headers }
            return axios.delete('http://localhost:5000/'+path, params, axiosConfig)
            .then((res)=> {
                console.log(res)
                if (res.status == 200)
                    return res.data
            })
            .then((res)=> {
                return res
                
            })
        }
    }
})

