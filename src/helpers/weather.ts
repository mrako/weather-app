interface Weather {
  icon?: number | string;
  sunrise?: number;
  sunset?: number;
}

export const getIcon = (weather: Weather): string | null => {
  if (weather.icon) {
    return weather.icon.toString();
  }

  return null;
};

/*
export const getDayAndNightIcon = (weather: Weather): string | null => {
  const now = new Date();
  const sunrise = weather.sunrise ? new Date(weather.sunrise * 1000) : null;
  const sunset = weather.sunset ? new Date(weather.sunset * 1000) : null;

  if (weather.icon) {
    if (weather.icon === 800 && sunrise && (now < sunrise || now > sunset)) {
      return `${weather.icon}n`;
    }
    return weather.icon.toString();
  }

  return null;
};
*/
