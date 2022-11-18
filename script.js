const p_actual = document.getElementById("actual");
const p_api = document.getElementById("p_api");

//System time

const printDate = (d, element) => {
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    element.innerHTML = `${h<10?"0":""}${h}:${m<10?"0":""}${m}:${s<10?"0":""}${s}`;

}

setInterval(() => {
    let dt = new Date();
    printDate(dt, p_actual);
    
}, 200);

// TIMEZONE DB

const key = "1720IEG1EV1X"
const by = "zone"
const zone = "America/Bahia_Banderas"
const lat = "20.5175"
const lng = "-103.181"

const url = `http://api.timezonedb.com/v2.1/get-time-zone?
                key=${key}
                &zone=${zone}
                &format=json
                &by=${by}
                &lat=${lat}
                &lng=${lng}`

let time_api

const getHourFromApi = async (url) => {
    try {
        const pr = await fetch(url)
        let {formatted} = await pr.json();
        const time_remote = new Date(formatted.replace(" ", "T"))
        time_api = time_remote
        time_api && printDate(time_api, p_api)
    } catch (error) {
        console.log(error)
    }
}



getHourFromApi(url)

