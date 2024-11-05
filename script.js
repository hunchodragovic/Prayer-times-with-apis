let cities = [
   
    {
        arabicName: "الرياض",
        name: "Ar Riyāḑ"
    }, {
        arabicName: "الشرقية",
        name: "Ash Sharqīyah"
    }, {
        arabicName: "مكة المكرمة",
        name: "Makkah al Mukarramah"
    }, {
        arabicName: "القصيم",
        name: "Al Qaşīm"
    }
]
for(let city of cities){
   const  content = `     <option>${city.arabicName}</option>`
   document.getElementById("cities-select").innerHTML += content
}
document.getElementById("cities-select").addEventListener("change",function(){
    document.getElementById("city-name").innerHTML = this.value
    // this.value == city.arabicName
    //     getPrayerTimingsOfCity(city.name)
  let cityName = ""
  for(let city of cities){
    if (city.arabicName == this.value){
        cityName = city.name
    }
  }
  getPrayerTimingsOfCity(cityName)
  
})

function getPrayerTimingsOfCity(cityName){
    let params = {
        country: "SA",
        city: cityName 
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
      })
      .then(function (response) {
        const timings = response.data.data.timings
        fillTimeForPrayer("fajr-time",timings.Fajr)
        fillTimeForPrayer("sunrise-time",timings.Sunrise)
        fillTimeForPrayer("dhur-time",timings.Dhuhr)
        fillTimeForPrayer("asr-time",timings.Asr)
        fillTimeForPrayer("sunset-time",timings.Sunset)
        fillTimeForPrayer("isha-time",timings.Isha)
        
        const readableDate = response.data.data.date.readable
        const weekDay = response.data.data.date.hijri.weekday.ar
    const date = readableDate + " " +weekDay
    document.getElementById("date").innerHTML = date
        // document.getElementById('fajr-time').innerHTML = timings.Fajr
        console.log(weekDay + " " +readableDate);
      })
      .catch(function (error) {
        console.log(error);
      })
}

getPrayerTimingsOfCity("Ar Riyāḑ	")






  function fillTimeForPrayer(id,time){
    document.getElementById(id).innerHTML = time

  }
  