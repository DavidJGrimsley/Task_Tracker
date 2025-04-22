import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react';

type LocationFormProps = {
  onSubmit: (name: string) => void
};

const LocationForm = ({ onSubmit }: LocationFormProps) => {
  const [name, setName] = useState<string>('')
  
  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter location name"
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          Add Location
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LocationForm

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 8,
    margin: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
 
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { 
    padding: 8, 
    color: '#fff', 
    textAlign: 'center', 
    // borderRadius: 5 
  },
})