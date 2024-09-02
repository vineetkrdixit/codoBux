import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import assetsImages from '../../assests/assetsImages';
import {useDispatch} from 'react-redux';
import {
  setEmail,
  setFirstName,
  setLastName,
  setNewDate,
  setNewTime,
} from '../../redux/slices/personalInfoSlice';
import DatePicker from 'react-native-date-picker';
import {formatDate, formatTime} from '../utils/helper';
import useCountdown from '../../hooks/useCountdown';

const Checkout = ({navigation}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [firstName, setFirstNameLocal] = useState('');
  const [lastName, setLastNameLocal] = useState('');
  const [email, setEmailLocal] = useState('');
  const [date, setDateLocal] = useState(new Date());
  const [time, setTimeLocal] = useState(new Date());
  const [errors, setErrors] = useState({});
  const {hours, minutes, seconds, resetCountdown} = useCountdown(30);
  const [modalVisible, setModalVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seconds === 0 && !formSubmitted) {
      setModalVisible(true);
    }
  }, [seconds, formSubmitted]);

  // Validation functions
  const validateFirstName = name => /^[^\s][a-zA-Z\s]*$/.test(name);

  const validateLastName = name => /^[^\s][a-zA-Z\s]*$/.test(name);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateDate = date => date !== '';

  const validateTime = time => time !== '';

  const handleFirstNameChange = text => setFirstNameLocal(text);

  const handleLastNameChange = text => setLastNameLocal(text);

  const handleEmailChange = text => setEmailLocal(text);

  const handleSubmit = () => {
    const newErrors = {};

    if (!validateFirstName(firstName)) {
      newErrors.firstName = 'Invalid first name.';
    }
    if (!validateLastName(lastName)) {
      newErrors.lastName = 'Invalid last name.';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!validateDate(date)) {
      newErrors.date = 'Please select a date.';
    }
    if (!validateTime(time)) {
      newErrors.time = 'Please select a time.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(setFirstName(firstName));
      dispatch(setLastName(lastName));
      dispatch(setEmail(email));
      dispatch(setNewDate(date));
      dispatch(setNewTime(time));
      setFormSubmitted(true);
      navigation.navigate('CheckoutDetail');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    resetCountdown(30);
  };

  const handleDateConfirm = selectedDate => {
    const today = new Date();
    const isDateValid = selectedDate >= today.setHours(0, 0, 0, 0);

    if (isDateValid) {
      setDateLocal(selectedDate);
    } else {
      Alert.alert(
        'Invalid Date',
        'Please select a date that is today or later.',
      );
    }
    setOpenDatePicker(false);
  };

  const handleTimeConfirm = selectedTime => {
    const today = new Date();
    const isTimeValid = selectedTime >= today;

    if (isTimeValid) {
      setTimeLocal(selectedTime);
    } else {
      Alert.alert('Invalid Time', 'Please select a time that is now or later.');
    }
    setOpenTimePicker(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <Text style={styles.mainText}>Test</Text>
      <View style={styles.mainBody}>
        <Text style={styles.headingText}>Checkout Form</Text>
        <View style={styles.timerBody}>
          <Text style={styles.descrptionText}>Your Session will end in :</Text>
          <View style={styles.counterStyle}>
            <View>
              <Text style={styles.timerText}>{hours}</Text>
              <Text style={styles.timerText}>Hours</Text>
            </View>
            <Text style={styles.colonText}>:</Text>
            <View>
              <Text style={styles.timerText}>{minutes}</Text>
              <Text style={styles.timerText}>Mins</Text>
            </View>
            <Text style={styles.colonText}>:</Text>
            <View>
              <Text style={styles.timerText}>{seconds}</Text>
              <Text style={styles.timerText}>Sec</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.infoText}>Personal Info</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputRange}>
              <Text style={styles.fieldText}>First Name</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="First Name"
                value={firstName}
                onChangeText={handleFirstNameChange}
              />
              {errors?.firstName && (
                <Text style={styles.error}>{errors?.firstName}</Text>
              )}
            </View>
            <View style={styles.inputRange}>
              <Text style={styles.fieldText}>Last Name</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Last Name"
                value={lastName}
                onChangeText={handleLastNameChange}
              />
              {errors?.lastName && (
                <Text style={styles.error}>{errors?.lastName}</Text>
              )}
            </View>
            <View style={styles.inputRange}>
              <Text style={styles.fieldText}>Email</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
              />
              {errors?.email && (
                <Text style={styles.error}>{errors?.email}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.bookingInfo}>
          <Text style={styles.infoText}>Booking Info</Text>

          <View style={styles.inputRange}>
            <Text style={styles.fieldText}>Date</Text>
            <TouchableOpacity
              style={styles.dateTimeInput}
              onPress={() => setOpenDatePicker(true)}>
              <Text style={styles.dateTimeInputText}>{formatDate(date)}</Text>
              <Image
                source={assetsImages.Calendar}
                style={{height: 25, width: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <DatePicker
              modal
              open={openDatePicker}
              date={date}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
            {errors?.date && <Text style={styles.error}>{errors?.date}</Text>}
          </View>

          <View style={styles.inputRange}>
            <Text style={styles.fieldText}>Time</Text>
            <TouchableOpacity
              style={styles.dateTimeInput}
              onPress={() => setOpenTimePicker(true)}>
              <Text style={styles.dateTimeInputText}>{formatTime(time)}</Text>
              <Image
                source={assetsImages.Clock}
                style={{height: 25, width: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <DatePicker
              modal
              open={openTimePicker}
              date={time}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={() => {
                setOpenTimePicker(false);
              }}
            />
            {errors?.time && <Text style={styles.error}>{errors?.time}</Text>}
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.timerText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={handleCloseModal}>
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Your Session has Expired</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleCloseModal}>
                    <Text style={styles.closeButtonText}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFEC',
  },
  scrollContent: {
    paddingVertical: 20,
  },
  mainText: {
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  mainBody: {
    margin: 30,
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#ffffff',
  },
  headingText: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  timerBody: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  descrptionText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',
  },
  counterStyle: {
    flexDirection: 'row',
    backgroundColor: '#E05D5D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  timerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
  },
  colonText: {
    fontSize: 45,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 15,
    color: '#ffffff',
  },
  divider: {
    borderColor: '#071523',
    borderWidth: 0.2,
    marginVertical: 30,
  },
  infoText: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  fieldText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    paddingVertical: 5,
  },
  textInputStyle: {
    borderWidth: 0.7,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  inputRange: {
    marginVertical: 10,
  },
  bookingInfo: {
    marginVertical: 25,
    paddingHorizontal: 20,
  },
  submitBtn: {
    backgroundColor: '#071523',
    width: '60%',
    alignSelf: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  dateTimeInput: {
    height: 50,
    borderColor: '#000000',
    borderWidth: 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  dateTimeInputText: {
    fontSize: 14,
    color: 'grey',
    paddingVertical: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#E05D5D',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#E05D5D',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
