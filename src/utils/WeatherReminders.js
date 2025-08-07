import WeatherRemindersList from "./WeatherRemindersList.json" with { type: "json" };

export const getWeatherReminder = (code, hour) => {
  const foundReminder = WeatherRemindersList.find(reminder => reminder.code === code)
  if(hour >= 6 && hour <= 18) {
    return foundReminder.day_reminder_es
  } else {
    return foundReminder.night_reminder_es
  }
}