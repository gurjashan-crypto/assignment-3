import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CallApi = () => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("");

  useEffect(() => {
    if (month && day) {
      fetchFact(month, day);
    }
  }, [month, day]);

  const fetchFact = async (month: string, day: string) => {
    try {
      const response = await fetch(
        `https://numbersapi.p.rapidapi.com/${month}/${day}/date`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "da3d2b8cfemshca6d9fbedf0b03bp148acajsnedd29d22044d",
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
        }
      );

      const data = await response.text();
      setFact(data);
    } catch (error) {
      console.error("Error fetching the fact:", error);
      setFact("Could not fetch fact. Try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Historical Date Facts</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Month:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={month}
            mode="dropdown"
            onValueChange={(itemValue) => setMonth(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Month" value="" />
            {Array.from({ length: 12 }, (_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Day:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={day}
            mode="dropdown"
            onValueChange={(itemValue) => setDay(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Day" value="" />
            {Array.from({ length: 31 }, (_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.factContainer}>
        <Text style={styles.factText}>
          {fact || " Select a date to see an interesting fact!"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  pickerContainer: {
    width: "80%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    
  },
  picker: {
    width: "100%",
    height: 125,
  },
  factContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    elevation: 3,
  },
  factText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default CallApi;
