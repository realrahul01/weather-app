export const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition(position=>{
        console.log(position)

    })
}