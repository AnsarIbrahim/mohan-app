import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  remove,
  update,
} from 'firebase/database';
import { getAuth } from 'firebase/auth';

// // const firebaseConfig = {
// //   apiKey: 'AIzaSyA83y8ql7PTRBRsEyJyixVF80YtHPwI2f4',
// //   authDomain: 'mohan-4269a.firebaseapp.com',
// //   databaseURL:
// //     'https://mohan-4269a-default-rtdb.asia-southeast1.firebasedatabase.app',
// //   projectId: 'mohan-4269a',
// //   storageBucket: 'mohan-4269a.appspot.com',
// //   messagingSenderId: '275537933180',
// //   appId: '1:275537933180:web:fbb633cc10e7d197fbaaf9',
// // };

const firebaseConfig = {
  apiKey: 'AIzaSyBNxftkP8HQOQMN4NtT2pot99naB7exmx4',
  authDomain: 'summa-f930c.firebaseapp.com',
  databaseURL:
    'https://summa-f930c-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'summa-f930c',
  storageBucket: 'summa-f930c.appspot.com',
  messagingSenderId: '834115724523',
  appId: '1:834115724523:web:30491baf13f5e52d0dcaae',
  measurementId: 'G-FPVHVZZJTR',
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyDZFl6BC-CnM04a6fN3Nm8AVzvWGd3KRFw',
//   authDomain: 'newone-64230.firebaseapp.com',
//   databaseURL:
//     'https://newone-64230-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'newone-64230',
//   storageBucket: 'newone-64230.appspot.com',
//   messagingSenderId: '125097466580',
//   appId: '1:125097466580:web:69216c1660d4342f1bb941',
//   measurementId: 'G-JJ2W1QSM9Q',
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const addCustomer = async (customer) => {
  try {
    const customersRef = ref(db, 'customers/');
    const newCustomerRef = push(customersRef);
    await set(newCustomerRef, { ...customer, id: newCustomerRef.key });
    console.log('Customer added successfully');
  } catch (error) {
    console.error('Error adding customer:', error);
  }
};

const getCustomer = async (id) => {
  const customerRef = ref(db, `customers/${id}`);
  const snapshot = await get(customerRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No such document!');
  }
};

const getCustomers = async () => {
  const customersRef = ref(db, 'customers/');
  const snapshot = await get(customersRef);
  return snapshot.val();
};

const updateCustomer = async (id, updatedCustomer) => {
  const customerRef = ref(db, `customers/${id}`);
  const snapshot = await get(customerRef);
  if (snapshot.exists()) {
    await update(customerRef, updatedCustomer);
  } else {
    console.log(`No customer with id: ${id}`);
  }
};

const deleteCustomer = async (email) => {
  try {
    const encodedEmail = email.replace(/\./g, ',');
    const customerRef = ref(db, `customers/${encodedEmail}`);
    await remove(customerRef);
    console.log('Customer deleted successfully');
  } catch (error) {
    console.error('Error deleting customer:', error);
  }
};

const addCustomerDetails = async (customerId, details) => {
  if (!customerId) {
    console.error('Customer ID is undefined');
    return;
  }

  try {
    const formattedCusDate = details.cusDate.replace(/-/g, '');

    const detailsId = formattedCusDate;

    const customerDetailsRef = ref(
      db,
      `customers/${customerId}/details/${detailsId}/${details.id}`,
    );
    const timestamp = Date.now();
    await set(customerDetailsRef, { ...details, timestamp });
    console.log('Customer details added successfully');
  } catch (error) {
    console.error('Error adding customer details:', error);
  }
};

const getAllCustomerDetails = async (customerId) => {
  console.log('Fetching all details for customer with ID:', customerId);

  try {
    const db = getDatabase();
    const detailsRef = ref(db, `customers/${customerId}/details`);

    const snapshot = await get(detailsRef);

    if (snapshot.exists()) {
      const detailsData = snapshot.val();
      let detailsArray = [];

      for (let cusDate in detailsData) {
        for (let detailId in detailsData[cusDate]) {
          detailsArray.push({
            id: detailId,
            ...detailsData[cusDate][detailId],
          });
        }
      }

      detailsArray = detailsArray.sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0),
      );

      console.log('Details:', detailsArray);
      return detailsArray;
    } else {
      console.error('No details found for customer with ID:', customerId);
      throw new Error('No such details!');
    }
  } catch (error) {
    console.error('Error fetching details:', error);
    throw error;
  }
};

const getCustomerDetail = async (customerId, detailId) => {
  try {
    const detailRef = ref(db, `customers/${customerId}/details/${detailId}`);
    const snapshot = await get(detailRef);
    if (snapshot.exists()) {
      return { [detailId]: snapshot.val() };
    } else {
      console.error(
        `Details not found for customerId: ${customerId} detailId: ${detailId}`,
      );
      return null;
    }
  } catch (error) {
    console.error('Error getting customer detail:', error);
  }
};

const editCustomerDetail = async (customerId, detailId, detail) => {
  try {
    const detailRef = ref(
      db,
      `customers/${customerId}/details/${detailId}/${detail.id}`,
    );

    const updatedDetail = { ...detail, timestamp: Date.now() };
    console.log('updatedDetail', updatedDetail);
    await update(detailRef, updatedDetail);

    console.log('Customer detail updated successfully');
  } catch (error) {
    console.error('Error updating customer detail:', error);
  }
};

const deleteCustomerDetail = async (customerId, cusDate, detailId) => {
  try {
    const formattedCusDate = cusDate.replace(/-/g, '');
    const detailsRef = ref(
      db,
      `customers/${customerId}/details/${formattedCusDate}/${detailId}`,
    );
    await remove(detailsRef);
    console.log('Customer detail deleted successfully');
  } catch (error) {
    console.error('Error deleting customer detail:', error);
  }
};

export {
  db,
  auth,
  addCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  addCustomerDetails,
  editCustomerDetail,
  getCustomerDetail,
  deleteCustomerDetail,
  getAllCustomerDetails,
};
