const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Login user
export const loginUser = async (data) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('Login error:', responseData.message);
    throw new Error(responseData.message || 'Failed to login');
  }

  // Store token in sessionStorage
  sessionStorage.setItem('authToken', responseData.token);
  return responseData;
};

// Register user
export const registerUser = async (data) => {
  const token = sessionStorage.getItem('authToken'); // Get token from sessionStorage

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Register user error:', responseData.message);
      throw new Error(responseData.message || 'Failed to register user');
    }

    return responseData;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw new Error('Failed to register user');
  }
};

// Fetch all users
export const fetchUser = async () => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return await response.json();
};

// Delete user
export const deleteUser = async (id) => {
  const token = sessionStorage.getItem('authToken');
  
  const response = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to delete user:', errorData.message);
    throw new Error(errorData.message || 'Failed to delete user');
  }

  return await response.json();
};

// Fetch products
export const fetchProducts = async () => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
};

// Update user information
export const updateUser = async (id, data) => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error updating user:', errorData.message);
    throw new Error(errorData.message || 'Failed to update user');
  }

  return await response.json();
};

// Add product
export const addProduct = async (data) => {
  const token = sessionStorage.getItem('authToken');
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Error adding product:', responseData.message);
      throw new Error(responseData.message || 'Failed to add product');
    }

    return responseData;
  } catch (error) {
    console.error('Error during product request:', error);
    throw new Error('Error adding product');
  }
};

// Delete product
export const deleteProduct = async (id) => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to delete product:', errorData.message);
    throw new Error(errorData.message || 'Failed to delete product');
  }

  return await response.json();
};

// Update product
export const updateProduct = async (id, data) => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error updating product:', errorData.message);
    throw new Error(errorData.message || 'Failed to update product');
  }

  return await response.json();
};

// Save quotation request to multiple suppliers
export const saveQuoteRequest = async (token, supplierId, products, date) => {
  console.log('Data being sent to API:', {
    supplierId,
    products,  // Ensure products is an array
    date,
  });

  // Do not include `status` in the request, as the backend will handle this
  const response = await fetch(`${API_BASE_URL}/quotes/save-quotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      supplierId: supplierId,
      products: products,  // Array of products
      date: date,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    console.error('Error response:', responseText);
    throw new Error(responseText || 'Failed to save quotation request');
  }

  const responseData = await response.json();
  return responseData;
};



// Fetch quotation history
export const fetchQuotationHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes/history`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during fetchQuotationHistory', error);
    throw error;
  }
};

// Fetch supplier quotations
export const fetchSupplierQuotations = async () => {
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication token is missing or expired');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/quotes/supplier/quotations`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch quotations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching supplier quotations:', error);
    throw error;
  }
};

// Update quotation status
export const updateQuotationStatus = async (quotationId, status) => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/quotes/supplier/quotations/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quotationId, status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update quotation status');
  }

  return await response.json();
};

// Move quotation to accepted collection
export const moveToAcceptedQuotations = async (quotationId) => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/quotes/move-to-accepted/${quotationId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to move quotation to accepted');
  }

  const responseData = await response.json();
  return responseData;
};

// Fetch accepted quotations for supplier
export const fetchAcceptedQuotationsForSupplier = async () => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/quotes/supplier/accepted-quotations`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch accepted quotations');
  }

  return await response.json();
};
