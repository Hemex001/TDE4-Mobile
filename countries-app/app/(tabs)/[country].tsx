import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

// Definindo a interface 'Country'
interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  flags: {
    png: string;
  };
  latlng: number[];
  languages: { [key: string]: string };
  area: number;
  population: number;
}
export default function CountryDetail() {
  const { country } = useLocalSearchParams();
  const [countryData, setCountryData] = useState<Country | null>(null);

  useEffect(() => {
    if (country) {
      axios.get(`https://restcountries.com/v3.1/alpha/${country}`)
        .then(response => setCountryData(response.data[0]))
        .catch(error => console.log(error));
    }
  }, [country]);

  if (!countryData) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bandeira */}
      <Image source={{ uri: countryData.flags.png }} style={styles.flag} />

      {/* Informações do país */}
      <Text style={styles.title}>{countryData.name.common}</Text>
      <Text style={styles.subTitle}>Nome Oficial: {countryData.name.official}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Capital:</Text>
        <Text style={styles.infoValue}>
          {countryData.capital ? countryData.capital[0] : 'N/A'}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Continente:</Text>
        <Text style={styles.infoValue}>{countryData.region}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Moeda:</Text>
        <Text style={styles.infoValue}>
          {Object.values(countryData.currencies).map(currency => currency.name).join(', ')}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Latitude:</Text>
        <Text style={styles.infoValue}>{countryData.latlng[0]}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Longitude:</Text>
        <Text style={styles.infoValue}>{countryData.latlng[1]}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Línguas:</Text>
        <Text style={styles.infoValue}>
          {Object.values(countryData.languages).join(', ')}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Área:</Text>
        <Text style={styles.infoValue}>{countryData.area.toLocaleString()} km²</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>População:</Text>
        <Text style={styles.infoValue}>{countryData.population.toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
  flag: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
});
