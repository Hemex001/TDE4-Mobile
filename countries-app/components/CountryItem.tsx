import { Text, View, TouchableOpacity, Image } from 'react-native';

interface CountryItemProps {
  country: {
    name: {
      common: string;
      official: string;
    };
    flags: {
      png: string;
    };
    capital: string[];
    region: string;
  };
  onPress: () => void;
}

export default function CountryItem({ country, onPress }: CountryItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Image source={{ uri: country.flags.png }} style={{ width: 50, height: 30 }} />
        <View style={{ marginLeft: 10 }}>
          <Text>{country.name.common}</Text>
          <Text>{country.name.official}</Text>
          <Text>{country.capital ? country.capital[0] : 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
