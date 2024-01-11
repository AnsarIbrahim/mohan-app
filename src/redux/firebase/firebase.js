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

const firebaseConfig = {
  apiKey: 'AIzaSyDYTzQGpzxJ8vP-uPlrNXh94vXq90AC_Ek',
  authDomain: 'mohankumargoldsmitth.firebaseapp.com',
  databaseURL:
    'https://mohankumargoldsmitth-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'mohankumargoldsmitth',
  storageBucket: 'mohankumargoldsmitth.appspot.com',
  messagingSenderId: '721786706679',
  appId: '1:721786706679:web:6d0ccd189af72a5b2e51f2',
  measurementId: 'G-V8CKLBPV6E',
};

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
  set(customerRef, updatedCustomer);
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
