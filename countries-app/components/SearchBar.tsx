import { TextInput, View } from 'react-native';

export default function SearchBar({ value, onChange }) {
  return (
    <View>
      <TextInput
        value={value}
        placeholder="Buscar país..."
        onChangeText={onChange}
        style={{
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
    </View>
  );
}
