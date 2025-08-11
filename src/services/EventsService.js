import { supabase } from '../lib/supabase'
import { getWeatherForecast } from './WeatherService'
import { getWeatherReminder } from '../utils/WeatherReminders'
import { parseDate } from '../utils/DateUtilities'

export const GetAllEvents = async (date) => {
  const { data, error } = await supabase
    .from('event')
    .select('*')
    .eq('date', parseDate(date))
    .order('time')

  if(error) {
    console.log('GetAllEvents error: ', error.message)
    return null
  }
  else {
    for(let i = 0; i < data.length; i++ ) {
      if(!data[i].latitude && !data[i].longitude) continue

      const hour = data[i].time.split(':')[0]
      const weatherForecast = await getWeatherForecast(data[i].latitude, data[i].longitude,3,hour)
      const weatherForecastDays = weatherForecast.forecast.forecastday
      const eventForecastDay = weatherForecastDays.find(forecastday => forecastday.date === data[i].date)
      const forecastDayCondition = eventForecastDay.hour[0].condition
      forecastDayCondition.reminder = getWeatherReminder(forecastDayCondition.code,hour)
      data[i].weatherCondition = forecastDayCondition
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
      address: EventModel.address
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

export const UpdateEvent = async (EventModel) => {
  const { error } = await supabase
    .from('event')
    .update({
      title: EventModel.title,
      date: EventModel.date,
      time: EventModel.time,
      latitude: EventModel.latitude,
      longitude: EventModel.longitude,
      radius: EventModel.radius,
      address: EventModel.address
    })
    .eq('id', EventModel.id)

    if(error) {
      console.log(error.message)
      return error
    }
    else {
      console.log('Event updated successfuly')
      return
    }
}

export const DeleteEvent = async (eventId) => {
  const { error } = await supabase
    .from('event')
    .delete()
    .eq('id', eventId)

  if(error) {
    console.log(error.message)
    return error
  }
  else {
    console.log('Event deleted successfuly')
    return
  }
}