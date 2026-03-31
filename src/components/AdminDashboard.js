// // src/components/AdminDashboard.js
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   Platform,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { COLORS } from "../theme/colors";
// import { DUMMY_CROPS } from "../utils/dummyData";

// // --- FIREBASE IMPORTS ---
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../config/firebase"; // Your actual database!

// const urduMonths = [
//   "جنوری",
//   "فروری",
//   "مارچ",
//   "اپریل",
//   "مئی",
//   "جون",
//   "جولائی",
//   "اگست",
//   "ستمبر",
//   "اکتوبر",
//   "نومبر",
//   "دسمبر",
// ];

// export default function AdminDashboard({ onLogout }) {
//   const router = useRouter();

//   const [selectedCrop, setSelectedCrop] = useState(DUMMY_CROPS[0]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [maxPrice, setMaxPrice] = useState("");
//   const [minPrice, setMinPrice] = useState("");

//   // New state for the loading spinner while saving to the cloud
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const getFormattedUrduDate = (currentDate) => {
//     const day = currentDate.getDate();
//     const month = urduMonths[currentDate.getMonth()];
//     const year = currentDate.getFullYear();
//     return `${day} ${month} ${year}`;
//   };

//   const onChangeDate = (event, selectedDate) => {
//     setShowPicker(Platform.OS === "ios");
//     if (selectedDate) {
//       setDate(selectedDate);
//     }
//   };

//   // --- THE CLOUD SAVE FUNCTION ---
//   const handleUpdate = async () => {
//     if (!maxPrice || !minPrice) {
//       Alert.alert(
//         "غلطی (Error)",
//         "براہ کرم زیادہ سے زیادہ اور کم از کم قیمت درج کریں۔",
//       );
//       return;
//     }

//     setIsSubmitting(true); // Turn on the loading spinner
//     const formattedDate = getFormattedUrduDate(date);

//     try {
//       // 1. Create the data package exactly how we want it in the cloud
//       const newPriceRecord = {
//         cropName: selectedCrop.name,
//         fullDate: formattedDate,
//         maxPrice: Number(maxPrice),
//         minPrice: Number(minPrice),
//         timestamp: new Date(), // Saves the exact computer time for sorting later!
//       };

//       // 2. Shoot it to Firebase!
//       // This creates a collection (drawer) called "cropPrices" and adds the document
//       await addDoc(collection(db, "cropPrices"), newPriceRecord);

//       console.log("✅ SAVED TO CLOUD:", newPriceRecord);
//       Alert.alert(
//         "کامیابی (Success)",
//         `${selectedCrop.name} کی قیمت کلاؤڈ میں محفوظ ہو گئی۔`,
//       );

//       setMaxPrice("");
//       setMinPrice("");
//     } catch (error) {
//       console.error("❌ Error saving to cloud:", error);
//       Alert.alert(
//         "غلطی",
//         "ڈیٹا محفوظ کرنے میں مسئلہ پیش آیا۔ اپنا انٹرنیٹ چیک کریں۔",
//       );
//     } finally {
//       setIsSubmitting(false); // Turn off the spinner
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={onLogout}>
//             <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>قیمت اپ ڈیٹ کریں</Text>
//           <Ionicons name="eye-off-outline" size={24} color={COLORS.primary} />
//         </View>

//         <View style={styles.heroBox}>
//           <Ionicons name="cloud-upload-outline" size={40} color="#FFF" />
//           <Text style={styles.heroText}>کلاؤڈ ڈیٹا بیس میں محفوظ کریں</Text>
//         </View>

//         <View style={styles.formSection}>
//           <Text style={styles.label}>فصل منتخب کریں</Text>
//           <TouchableOpacity
//             style={styles.inputBox}
//             onPress={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             <Text style={styles.inputText}>{selectedCrop.name}</Text>
//             <Ionicons
//               name={isDropdownOpen ? "chevron-up" : "chevron-down"}
//               size={20}
//               color={COLORS.textMuted}
//             />
//           </TouchableOpacity>

//           {isDropdownOpen && (
//             <View style={styles.dropdownMenu}>
//               {DUMMY_CROPS.map((crop) => (
//                 <TouchableOpacity
//                   key={crop.id}
//                   style={styles.dropdownItem}
//                   onPress={() => {
//                     setSelectedCrop(crop);
//                     setIsDropdownOpen(false);
//                   }}
//                 >
//                   <Text style={styles.dropdownItemText}>{crop.name}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}

//           <Text style={styles.label}>تاریخ منتخب کریں</Text>
//           <TouchableOpacity
//             style={styles.inputBox}
//             onPress={() => setShowPicker(true)}
//           >
//             <Text style={styles.inputText}>{getFormattedUrduDate(date)}</Text>
//             <Ionicons
//               name="calendar-outline"
//               size={20}
//               color={COLORS.textMuted}
//             />
//           </TouchableOpacity>

//           {showPicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display="default"
//               onChange={onChangeDate}
//             />
//           )}

//           <Text style={styles.label}>زیادہ سے زیادہ قیمت</Text>
//           <View style={styles.priceInputBox}>
//             <Text style={styles.currency}>PKR</Text>
//             <TextInput
//               style={styles.priceInput}
//               placeholder="0.00"
//               keyboardType="numeric"
//               value={maxPrice}
//               onChangeText={setMaxPrice}
//             />
//             <Ionicons name="trending-up" size={20} color={COLORS.success} />
//           </View>

//           <Text style={styles.label}>کم از کم قیمت</Text>
//           <View style={styles.priceInputBox}>
//             <Text style={styles.currency}>PKR</Text>
//             <TextInput
//               style={styles.priceInput}
//               placeholder="0.00"
//               keyboardType="numeric"
//               value={minPrice}
//               onChangeText={setMinPrice}
//             />
//             <Ionicons name="trending-down" size={20} color={COLORS.alert} />
//           </View>

//           <TouchableOpacity
//             style={[styles.updateButton, isSubmitting && { opacity: 0.7 }]}
//             onPress={handleUpdate}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <ActivityIndicator color="#FFF" size="small" />
//             ) : (
//               <>
//                 <Text style={styles.updateButtonText}>محفوظ کریں</Text>
//                 <Ionicons
//                   name="cloud-upload"
//                   size={20}
//                   color="#FFF"
//                   style={{ marginLeft: 10 }}
//                 />
//               </>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-crop")}
//       >
//         <Ionicons name="add" size={32} color={COLORS.textDark} />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingHorizontal: 20 },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   headerTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.primary },
//   heroBox: {
//     backgroundColor: COLORS.primary,
//     height: 120,
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   heroText: { color: "#FFF", fontSize: 18, fontWeight: "bold", marginTop: 10 },
//   formSection: { paddingBottom: 80 },
//   label: {
//     fontSize: 16,
//     color: COLORS.textDark,
//     marginBottom: 8,
//     fontWeight: "bold",
//   },
//   inputBox: {
//     flexDirection: "row-reverse",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#E8ECE8",
//     borderRadius: 8,
//     height: 55,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//   },
//   inputText: { fontSize: 16, color: COLORS.textDark },
//   dropdownMenu: {
//     backgroundColor: "#FFF",
//     borderRadius: 8,
//     marginTop: -15,
//     marginBottom: 20,
//     padding: 5,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   dropdownItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//   },
//   dropdownItemText: {
//     fontSize: 16,
//     color: COLORS.textDark,
//     textAlign: "right",
//   },
//   priceInputBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E8ECE8",
//     borderRadius: 8,
//     height: 55,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//   },
//   currency: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: COLORS.textMuted,
//     marginRight: 15,
//   },
//   priceInput: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: "bold",
//     color: COLORS.textDark,
//     textAlign: "right",
//     paddingRight: 15,
//   },
//   updateButton: {
//     backgroundColor: COLORS.primary,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     height: 60,
//     borderRadius: 12,
//     marginTop: 10,
//     elevation: 2,
//   },
//   updateButtonText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
//   fab: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     backgroundColor: COLORS.secondary,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//   },
// });

////

// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../theme/colors";

// --- FIREBASE IMPORTS ---
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const urduMonths = [
  "جنوری",
  "فروری",
  "مارچ",
  "اپریل",
  "مئی",
  "جون",
  "جولائی",
  "اگست",
  "ستمبر",
  "اکتوبر",
  "نومبر",
  "دسمبر",
];

// A fallback list just in case the database is completely empty
const FALLBACK_CROP = { id: "1", name: "گندم (Wheat)" };

export default function AdminDashboard({ onLogout }) {
  const router = useRouter();

  // --- NEW STATES FOR DYNAMIC DROPDOWN ---
  const [availableCrops, setAvailableCrops] = useState([FALLBACK_CROP]);
  const [isLoadingCrops, setIsLoadingCrops] = useState(true);

  const [selectedCrop, setSelectedCrop] = useState(FALLBACK_CROP);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FETCH CATEGORIES FROM FIREBASE ---
  const fetchCropCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "availableCrops"));
      const fetchedCrops = [];

      querySnapshot.forEach((doc) => {
        fetchedCrops.push({
          id: doc.id,
          name: doc.data().name,
        });
      });

      // If we found crops in the database, use them!
      if (fetchedCrops.length > 0) {
        setAvailableCrops(fetchedCrops);
        setSelectedCrop(fetchedCrops[0]); // Auto-select the first one
      }
    } catch (error) {
      console.error("❌ Error fetching crop categories:", error);
    } finally {
      setIsLoadingCrops(false);
    }
  };

  // Run this function when the dashboard opens
  useEffect(() => {
    fetchCropCategories();
  }, []);

  const getFormattedUrduDate = (currentDate) => {
    const day = currentDate.getDate();
    const month = urduMonths[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleUpdate = async () => {
    if (!maxPrice || !minPrice) {
      Alert.alert(
        "غلطی (Error)",
        "براہ کرم زیادہ سے زیادہ اور کم از کم قیمت درج کریں۔",
      );
      return;
    }

    setIsSubmitting(true);
    const formattedDate = getFormattedUrduDate(date);

    try {
      const newPriceRecord = {
        cropName: selectedCrop.name,
        fullDate: formattedDate,
        maxPrice: Number(maxPrice),
        minPrice: Number(minPrice),
        timestamp: new Date(),
      };

      await addDoc(collection(db, "cropPrices"), newPriceRecord);
      Alert.alert(
        "کامیابی (Success)",
        `${selectedCrop.name} کی قیمت کلاؤڈ میں محفوظ ہو گئی۔`,
      );

      setMaxPrice("");
      setMinPrice("");
    } catch (error) {
      Alert.alert("غلطی", "ڈیٹا محفوظ کرنے میں مسئلہ پیش آیا۔");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onLogout}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>قیمت اپ ڈیٹ کریں</Text>
          <Ionicons name="eye-off-outline" size={24} color={COLORS.primary} />
        </View>

        <View style={styles.heroBox}>
          <Ionicons name="cloud-upload-outline" size={40} color="#FFF" />
          <Text style={styles.heroText}>کلاؤڈ ڈیٹا بیس میں محفوظ کریں</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>فصل منتخب کریں</Text>

          {/* Show a spinner if categories are still downloading */}
          {isLoadingCrops ? (
            <View style={[styles.inputBox, { justifyContent: "center" }]}>
              <ActivityIndicator color={COLORS.primary} size="small" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.inputText}>{selectedCrop.name}</Text>
              <Ionicons
                name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          )}

          {isDropdownOpen && !isLoadingCrops && (
            <View style={styles.dropdownMenu}>
              {/* 👇 Now mapping over the REAL data from Firebase! */}
              {availableCrops.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCrop(crop);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{crop.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>تاریخ منتخب کریں</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.inputText}>{getFormattedUrduDate(date)}</Text>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.label}>زیادہ سے زیادہ قیمت</Text>
          <View style={styles.priceInputBox}>
            <Text style={styles.currency}>PKR</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
            <Ionicons name="trending-up" size={20} color={COLORS.success} />
          </View>

          <Text style={styles.label}>کم از کم قیمت</Text>
          <View style={styles.priceInputBox}>
            <Text style={styles.currency}>PKR</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <Ionicons name="trending-down" size={20} color={COLORS.alert} />
          </View>

          <TouchableOpacity
            style={[styles.updateButton, isSubmitting && { opacity: 0.7 }]}
            onPress={handleUpdate}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <>
                <Text style={styles.updateButtonText}>محفوظ کریں</Text>
                <Ionicons
                  name="cloud-upload"
                  size={20}
                  color="#FFF"
                  style={{ marginLeft: 10 }}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-crop")}
      >
        <Ionicons name="add" size={32} color={COLORS.textDark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.primary },
  heroBox: {
    backgroundColor: COLORS.primary,
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  heroText: { color: "#FFF", fontSize: 18, fontWeight: "bold", marginTop: 10 },
  formSection: { paddingBottom: 80 },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputBox: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputText: { fontSize: 16, color: COLORS.textDark },
  dropdownMenu: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginTop: -15,
    marginBottom: 20,
    padding: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "right",
  },
  priceInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  currency: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textMuted,
    marginRight: 15,
  },
  priceInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    textAlign: "right",
    paddingRight: 15,
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
  },
  updateButtonText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  fab: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: COLORS.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
