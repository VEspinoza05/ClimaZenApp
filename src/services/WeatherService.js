import { supabase } from '../lib/supabase';

export const getWeatherFromSupabase = async (lat, lon) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      throw new Error('Usuario no autenticado');
    }

    const response = await fetch('https://ilzjhekqwxirijweyslq.functions.supabase.co/get-weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ lat, lon }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    return null;
  }
};

export const getWeatherForecast = async (lat, lon, days, hour) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;
    

    if (!accessToken) {
      throw new Error('Usuario no autenticado');
    }

    const BASE_URL = 'https://ilzjhekqwxirijweyslq.functions.supabase.co/weather-forecast'
    const params = {
      lat: lat,
      lon: lon,
      days: days,
      hour: hour,
    }

    const queryString = new URLSearchParams(params).toString(); 
    const urlWithParams = `${BASE_URL}?${queryString}`

    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    return null;
  }
};
