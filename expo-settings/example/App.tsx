import React from 'react';
import * as Settings from 'expo-settings';
import { Button, Text, View } from 'react-native';

export default function App() {
  const [theme, setTheme] = React.useState(Settings.getTheme());
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  const onPress = () => {
    try {
      Settings.setTheme(nextTheme);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  React.useEffect(() => {
    const subscription = Settings.addThemeListener((event) => {
      setTheme(event.theme);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Theme: {theme}</Text>
      <View style={{ padding: 20 }} />
      <Button title={`Set theme to ${nextTheme}`} onPress={onPress} />
    </View>
  );
}
