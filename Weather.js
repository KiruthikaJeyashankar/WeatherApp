import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

function Weather() {
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function onPressHandler() {
    setLoading(true);
    const response = await fetch('http://localhost:3000/weather');
    const jsonResponse = await response.json();
    const matchingWeatherData = jsonResponse.find(
      weatherData => weatherData.city === city,
    );
    setTimeout(() => {
      if (matchingWeatherData) setData(matchingWeatherData);
      else setIsError(true);
      setLoading(false);
    }, 1000);
  }

  function onRefreshHandler() {
    setIsRefreshing(true);
    setCity(null);
    setData(null);
    setIsRefreshing(false);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefreshHandler}
        />
      }>
      <Image height={40} width={40} source={require('./assets/weather.png')} />
      {/* Style prop */}
      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 2,
        }}
        value={city}
        onChangeText={text => setCity(text)}
        placeholder="Enter the city"
      />
      {/* Stylesheet style */}
      <Button title="Enter" onPress={onPressHandler} />
      {loading && (
        <View>
          <Text>loading weather for {city}</Text>
          <ActivityIndicator />
        </View>
      )}
      {data && (
        <View style={styles.greyText}>
          <Text>{isCelsius ? 'Celsius' : 'Fahrenheit'}</Text>
          <Switch
            value={isCelsius}
            onValueChange={() => setIsCelsius(!setIsCelsius)}
          />
          <Text>City: {data.city}</Text>
          <Text>Temperature: {data.temperature}</Text>
          <Text>Conditions: {data.conditions}</Text>
        </View>
      )}
      {isError &&
        Alert.alert('Invalid', 'Invalid city entered!', [
          {text: 'Retry', onPress: () => setIsError(false)},
        ])}
      <Text>
        One of the first things you probably do every morning is look out the
        window to see what the weather is like. Looking outside and listening to
        the day’s forecast helps you decide what clothes you will wear and maybe
        even what you will do throughout the day. If you don’t have school and
        the weather looks sunny, you might visit the zoo or go on a picnic. A
        rainy day might make you think about visiting a museum or staying home
        to read. The weather affects us in many ways. Day-to-day changes in
        weather can influence how we feel and the way we look at the world.
        Severe weather, such as tornadoes, hurricanes, and blizzards, can
        disrupt many people’s lives because of the destruction they cause. The
        term “weather” refers to the temporary conditions of the atmosphere, the
        layer of air that surrounds the Earth. We usually think of weather in
        terms of the state of the atmosphere in our own part of the world. But
        weather works like dropping a pebble in water—the ripples eventually
        affect water far away from where the pebble was dropped. The same
        happens with weather around the globe. Weather in your region will
        eventually affect the weather hundreds or thousands of kilometers away.
        For example, a snowstorm around Winnipeg, Manitoba, Canada, might
        eventually reach Chicago, Illinois, as it moves southeast through the
        U.S. Weather doesn’t just stay in one place. It moves, and changes from
        hour to hour or day to day. Over many years, certain conditions become
        familiar weather in an area. The average weather in a specific region,
        as well as its variations and extremes over many years, is called
        climate. For example, the city of Las Vegas in the U.S. state of Nevada
        is generally dry and hot. Honolulu, the capital of the U.S. state of
        Hawaii, is also hot, but much more humid and rainy. Climate changes,
        just like weather. However, climate change can take hundreds or even
        thousands of years. Today, the Sahara Desert in northern Africa is the
        largest desert in the world. However, several thousand years ago, the
        climate in the Sahara was quite different. This “Green Sahara”
        experienced frequent rainy weather. What Makes Weather There are six
        main components, or parts, of weather. They are temperature, atmospheric
        pressure, wind, humidity, precipitation, and cloudiness. Together, these
        components describe the weather at any given time. These changing
        components, along with the knowledge of atmospheric processes, help
        meteorologists—scientists who study weather—forecast what the weather
        will be in the near future. Temperature is measured with a thermometer
        and refers to how hot or cold the atmosphere is. Meteorologists report
        temperature two ways: in Celsius (C) and Fahrenheit (F). The United
        States uses the Fahrenheit system; in other parts of the world, Celsius
        is used. Almost all scientists measure temperature using the Celsius
        scale. Temperature is a relative measurement. An afternoon at 70 degrees
        Fahrenheit, for example, would seem cool after several days of 95
        degrees Fahrenheit, but it would seem warm after temperatures around 32
        degrees Fahrenheit. The coldest weather usually happens near the poles,
        while the warmest weather usually happens near the Equator. Atmospheric
        pressure is the weight of the atmosphere overhead. Changes in
        atmospheric pressure signal shifts in the weather. A high-pressure
        system usually brings cool temperatures and clear skies. A low-pressure
        system can bring warmer weather, storms, and rain. Meteorologists
        express atmospheric pressure in a unit of measurement called an
        atmosphere. Atmospheres are measured in millibars or inches of mercury.
        Average atmospheric pressure at sea level is about one atmosphere (about
        1,013 millibars, or 29.9 inches). An average low-pressure system, or
        cyclone, measures about 995 millibars (29.4 inches). A typical
        high-pressure system, or anticyclone, usually reaches 1,030 millibars
        (30.4 inches). The word “cyclone” refers to air that rotates in a
        circle, like a wheel. Atmospheric pressure changes with altitude. The
        atmospheric pressure is much lower at high altitudes. The air pressure
        on top of Mount Kilimanjaro, Tanzania—which is 5,895 meters (19,344
        feet) tall—is 40 percent of the air pressure at sea level. The weather
        is much colder. The weather at the base of Mount Kilimanjaro is
        tropical, but the top of the mountain has ice and snow. Wind is the
        movement of air. Wind forms because of differences in temperature and
        atmospheric pressure between nearby regions. Winds tend to blow from
        areas of high pressure, where it’s colder, to areas of low pressure,
        where it’s warmer. In the upper atmosphere, strong, fast winds called
        jet streams occur at altitudes of 8 to 15 kilometers (5 to 9 miles)
        above the Earth. They usually blow from about 129 to 225 kilometers per
        hour (80 to 140 miles per hour), but they can reach more than 443
        kilometers per hour (275 miles per hour). These upper-atmosphere winds
        help push weather systems around the globe. Wind can be influenced by
        human activity. Chicago, Illinois, is nicknamed the “Windy City.” After
        the Great Chicago Fire of 1871 destroyed the city, city planners rebuilt
        it using a grid system. This created wind tunnels. Winds are forced into
        narrow channels, picking up speed and strength. The Windy City is a
        result of natural and manmade winds. Humidity refers to the amount of
        water vapor in the air. Water vapor is a gas in the atmosphere that
        helps make clouds, rain, or snow. Humidity is usually expressed as
        relative humidity, or the percentage of the maximum amount of water air
        can hold at a given temperature. Cool air holds less water than warm
        air. At a relative humidity of 100 percent, air is said to be saturated,
        meaning the air cannot hold any more water vapor. Excess water vapor
        will fall as precipitation. Clouds and precipitation occur when air
        cools below its saturation point. This usually happens when warm, humid
        air cools as it rises. The most humid places on Earth are islands near
        the Equator. Singapore, for instance, is humid year-round. The warm air
        is continually saturated with water from the Indian Ocean. Clouds come
        in a variety of forms. Not all of them produce precipitation. Wispy
        cirrus clouds, for example, usually signal mild weather. Other kinds of
        clouds can bring rain or snow. A blanketlike cover of nimbostratus
        clouds produces steady, extended precipitation. Enormous cumulonimbus
        clouds, or thunderheads, release heavy downpours. Cumulonimbus clouds
        can produce thunderstorms and tornadoes as well.
      </Text>
    </ScrollView>
  );
}

export default Weather;

const styles = StyleSheet.create({
  greyText: {
    backgroundColor: 'grey',
    margin: 10,
  },
});
