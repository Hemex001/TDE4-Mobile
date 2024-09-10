import { useState, useEffect } from 'react';
import { SectionList, Text, View, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import CountryItem from '~/components/CountryItem';

interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  flags: {
    png: string;
  };
}

interface SectionData {
  title: string;
  data: Country[];
}

export default function HomeScreen() {
  const [countries, setCountries] = useState<SectionData[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const groupedCountries = groupByContinent(response.data);
        setCountries(groupedCountries);
      })
      .catch(error => console.log(error));
  }, []);

  const groupByContinent = (data: Country[]) => {
    const grouped = data.reduce((acc: { [key: string]: Country[] }, country) => {
      const continent = country.region || 'Unknown';
      if (!acc[continent]) {
        acc[continent] = [];
      }
      acc[continent].push(country);
      return acc;
    }, {});

    return Object.keys(grouped).map(continent => ({
      title: continent,
      data: grouped[continent],
    }));
  };

  const filteredCountries = countries.map(section => ({
    ...section,
    data: section.data.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
  }));

  return (
    <View style={styles.container}>
      {/* Barra de Busca */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar país..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Lista Seccionada */}
      <SectionList
        sections={filteredCountries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <CountryItem 
            country={item} 
            onPress={() => router.push({
              pathname: './[country]',
              params: { country: item.cca3 }
            })} 
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#f4f4f4',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
