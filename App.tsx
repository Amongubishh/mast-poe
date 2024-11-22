import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type definition for navigation
type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  ChefControl: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: 'Menu' }}
        />
        <Stack.Screen
          name="ChefControl"
          component={ChefControlScreen}
          options={{ title: 'Chef Control' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// HomeScreen Component
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to the Chef App</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={styles.buttonText}>Enter Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.chefControlButton}
        onPress={() => navigation.navigate('ChefControl')}
      >
        <Text style={styles.buttonText}>Chef Control</Text>
      </TouchableOpacity>
    </View>
  );
};

// MenuScreen Component
const MenuScreen = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [starterDescription, setStarterDescription] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [dessertDescription, setDessertDescription] = useState('');
  const [starterPrice, setStarterPrice] = useState('');
  const [mainPrice, setMainPrice] = useState('');
  const [dessertPrice, setDessertPrice] = useState('');

  // Function to update menu items when the button is clicked
  const updateMenuItems = () => {
    setStarterDescription('A delicious, warm tomato soup with a hint of basil.');
    setStarterPrice('R 75');
    setMainDescription('Grilled salmon with a side of vegetables and lemon butter sauce.');
    setMainPrice('R 150');
    setDessertDescription('Rich chocolate cake topped with fresh berries.');
    setDessertPrice('R 60');
  };

  const addMenuItem = (course: string, description: string, price: string) => {
    setMenuItems([...menuItems, { course, description, price }]);
  };

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const calculateAveragePrice = (course: string) => {
    const filteredItems = menuItems.filter(item => item.course === course);
    if (filteredItems.length === 0) return 0;
    const total = filteredItems.reduce((sum, item) => sum + parseFloat(item.price.slice(2)), 0); // Remove "R " and parse as number
    return total / filteredItems.length;
  };

  return (
    <ScrollView style={styles.menuContainer}> {/* ScrollView added */}
      <Text style={styles.menuTitle}>Our Menu</Text>

      <TouchableOpacity style={styles.button} onPress={updateMenuItems}>
        <Text style={styles.buttonText}>Enter Menu</Text>
      </TouchableOpacity>

      <Text style={styles.menuItem}>Total Number of Dishes: {menuItems.length}</Text>
      <Text style={styles.menuItem}>Average Starter Price: R {calculateAveragePrice('starter').toFixed(2)}</Text>
      <Text style={styles.menuItem}>Average Main Price: R {calculateAveragePrice('main').toFixed(2)}</Text>
      <Text style={styles.menuItem}>Average Dessert Price: R {calculateAveragePrice('dessert').toFixed(2)}</Text>

      <Text style={styles.menuItem}>Starter: Tomato Soup</Text>
      {starterDescription ? (
        <Text style={styles.menuItem}>Description: {starterDescription}</Text>
      ) : null}
      {starterPrice ? <Text style={styles.menuItem}>Price: {starterPrice}</Text> : null}

      <Text style={styles.menuItem}>Main: Grilled Salmon</Text>
      {mainDescription ? (
        <Text style={styles.menuItem}>Description: {mainDescription}</Text>
      ) : null}
      {mainPrice ? <Text style={styles.menuItem}>Price: {mainPrice}</Text> : null}

      <Text style={styles.menuItem}>Dessert: Chocolate Cake</Text>
      {dessertDescription ? (
        <Text style={styles.menuItem}>Description: {dessertDescription}</Text>
      ) : null}
      {dessertPrice ? <Text style={styles.menuItem}>Price: {dessertPrice}</Text> : null}

      {/* Add Dish buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => addMenuItem('starter', starterDescription, starterPrice)}
      >
        <Text style={styles.buttonText}>Add Starter to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addMenuItem('main', mainDescription, mainPrice)}
      >
        <Text style={styles.buttonText}>Add Main to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addMenuItem('dessert', dessertDescription, dessertPrice)}
      >
        <Text style={styles.buttonText}>Add Dessert to Menu</Text>
      </TouchableOpacity>

      {/* Remove Dish buttons */}
      {menuItems.map((item, index) => (
        <View key={index} style={styles.menuItemContainer}>
          <Text>{item.course}: {item.description} - {item.price}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeMenuItem(index)}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView> /* End ScrollView */
  );
};

// ChefControlScreen Component
const ChefControlScreen = () => {
  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [course, setCourse] = useState('starter');
  const [addedDishes, setAddedDishes] = useState<any[]>([]);

  const addDish = () => {
    if (dishName && dishDescription && dishPrice && course) {
      const newDish = {
        dishName,
        dishDescription,
        dishPrice,
        course,
      };
      setAddedDishes([...addedDishes, newDish]);
      setDishName('');
      setDishDescription('');
      setDishPrice('');
      setCourse('starter');
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Chef Control</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dish Description"
        value={dishDescription}
        onChangeText={setDishDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={dishPrice}
        keyboardType="numeric"
        onChangeText={setDishPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Course (e.g., starter, main, dessert)"
        value={course}
        onChangeText={setCourse}
      />

      <Button title="Add Dish" onPress={addDish} />

      <View style={styles.dishesList}>
        <Text style={styles.dishesListTitle}>Added Dishes:</Text>
        {addedDishes.length > 0 ? (
          addedDishes.map((dish, index) => (
            <View key={index} style={styles.dishItem}>
              <Text style={styles.dishText}>Name: {dish.dishName}</Text>
              <Text style={styles.dishText}>Description: {dish.dishDescription}</Text>
              <Text style={styles.dishText}>Price: {dish.dishPrice}</Text>
              <Text style={styles.dishText}>Course: {dish.course}</Text>
            </View>
          ))
        ) : (
          <Text>No dishes added yet.</Text>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  chefControlButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  removeButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
  },
  dishesList: {
    marginTop: 20,
  },
  dishesListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishItem: {
    marginVertical: 10,
  },
  dishText: {
    fontSize: 16,
  },
});