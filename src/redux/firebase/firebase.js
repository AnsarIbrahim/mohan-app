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
  apiKey: 'AIzaSyChzPySF_QhRXiY1YT4wl91aXnJbb1OwiE',
  authDomain: 'mohan-app-c4bc3.firebaseapp.com',
  databaseURL:
    'https://mohan-app-c4bc3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'mohan-app-c4bc3',
  storageBucket: 'mohan-app-c4bc3.appspot.com',
  messagingSenderId: '709743714134',
  appId: '1:709743714134:web:66fb8de10ea378b31440f7',
  measurementId: 'G-MZEKXXLXHP',
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
    const customerDetailsRef = ref(
      db,
      `customers/${customerId}/details/${details.id}`,
    );
    await set(customerDetailsRef, details);
    console.log('Customer details added successfully');
  } catch (error) {
    console.error('Error adding customer details:', error);
  }
};

// Firebase.js or wherever your firebase functions are defined

const getCustomerDetail = async (customerId, detailId) => {
  console.log('Fetching detail with ID:', detailId);

  try {
    const db = getDatabase();
    const detailRef = ref(db, `customers/${customerId}/details/${detailId}`);

    const snapshot = await get(detailRef);

    if (snapshot.exists()) {
      const detailData = snapshot.val();
      console.log('Detail:', detailData);
      return detailData;
    } else {
      console.error('Document not found for detail with ID:', detailId);
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error fetching detail:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

const editCustomerDetail = async (customerId, detailId, newDetailData) => {
  const detailRef = ref(db, `customers/${customerId}/details/${detailId}`);

  try {
    await update(detailRef, newDetailData);
    console.log('Detail updated successfully');
  } catch (error) {
    console.error('Error updating detail:', error);
    throw error;
  }
};

const deleteCustomerDetail = async (customerId, detailId) => {
  const detailRef = ref(db, `customers/${customerId}/details/${detailId}`);

  try {
    await remove(detailRef);
    console.log('Detail deleted successfully');
  } catch (error) {
    console.error('Error deleting detail:', error);
    throw error;
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
};
