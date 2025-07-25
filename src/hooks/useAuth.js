import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await AsyncStorage.getItem('session');

      if (storedSession) {
        const parsed = JSON.parse(storedSession);

        await supabase.auth.setSession({
          access_token: parsed.access_token,
          refresh_token: parsed.refresh_token,
        });

        setSession(parsed);
      }

      setLoading(false);
    };

    loadSession();
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await AsyncStorage.setItem('session', JSON.stringify(session));
          setSession(session);
        } else {
          await AsyncStorage.removeItem('session');
          setSession(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { session, loading };
}
