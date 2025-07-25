import { supabase } from '../lib/supabase'; // tu configuración supabase

const getWeatherFromSupabase = async (lat, lon) => {
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

export default getWeatherFromSupabase;
