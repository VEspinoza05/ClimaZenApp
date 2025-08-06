import { supabase } from '../lib/supabase'

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