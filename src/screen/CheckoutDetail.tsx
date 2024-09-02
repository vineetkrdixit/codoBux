import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {formatDate, formatTime} from '../utils/helper';

const CheckoutDetail = () => {
  const {firstName, lastName, email, date, time} = useSelector(
    state => state.personalInfo,
  );
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <Text style={styles.mainText}>Test</Text>
      <View style={styles.mainBody}>
        <Text style={styles.headingText}>Checkout Form</Text>

        <View style={styles.divider} />
        <View style={styles.mainContainer}>
          <View style={styles.detailBody}>
            <Text style={styles.detailText}>Booking ID</Text>
            <Text style={styles.detailTexts}>XXX78X09</Text>
          </View>
          <View style={styles.detailBody}>
            <Text style={styles.detailText}>First Name</Text>
            <Text style={styles.detailTexts}>{firstName}</Text>
          </View>
          <View style={styles.detailBody}>
            <Text style={styles.detailText}>Last Name</Text>
            <Text style={styles.detailTexts}>{lastName}</Text>
          </View>
          <View style={styles.detailBody}>
            <Text style={styles.detailText}>Email</Text>
            <Text style={styles.detailTexts}>{email}</Text>
          </View>
          <View style={styles.detailBody}>
            <Text style={styles.detailText}>Date</Text>
            <Text style={styles.detailTexts}>{formatDate(date)}</Text>
          </View>
          <View style={styles.detailBody}>
            <Text style={styles.detailText}>Time</Text>
            <Text style={styles.detailTexts}>{formatTime(time)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default CheckoutDetail;
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
    marginTop: 20,
  },
  divider: {
    borderColor: '#071523',
    borderWidth: 0.2,
    marginVertical: 30,
  },
  detailBody: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  detailText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
  },
  mainContainer: {
    marginBottom: 20,
  },
  detailTexts: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
});
