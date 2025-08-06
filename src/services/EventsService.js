import { supabase } from '../lib/supabase'
import { getWeatherForecast } from './WeatherService'

export const GetAllEvents = async (date) => {
  const { data, error } = await supabase
    .from('event')
    .select('*')
    .eq('date', date.toISOString().split('T')[0])
    .order('time')

  if(error) {
    console.log('GetAllEvents error: ', error.message)
    return null
  }
  else {
    for(let i = 0; i < data.length; i++ ) {
      console.log('Ejecutando bucle de data...')
      if(!data[i].latitude && !data[i].longitude) continue

      console.log('No omitiendo bucle. paso del bucle: ' + i)
      const hour = data[i].time.split(':')[0]
      const weatherForecast = await getWeatherForecast(data[i].latitude, data[i].longitude,3,hour)
      const weatherForecastDays = weatherForecast.forecast.forecastday
      const eventForecastDay = weatherForecastDays.find(forecastday => forecastday.date === data[i].date)
      const forecastDayCondition = eventForecastDay.hour[0].condition
      data[i].weatherCondition = forecastDayCondition
      console.log(JSON.stringify(data[i]))
    }

    return data
  }
}

export const CreateEvent = async (EventModel) => {
  const { error } = await supabase
    .from('event')
    .insert({
      title: EventModel.title,
      date: EventModel.date,
      time: EventModel.time,
      user_id: EventModel.user_id,
      latitude: EventModel.latitude,
      longitude: EventModel.longitude,
      radius: EventModel.radius,
    })

  if(error) {
    console.log(error.message)
    return error
  }
  else {
    console.log('Event addedd successfuly')
    return
  }
}