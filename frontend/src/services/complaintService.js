const API_URL = process.env.REACT_APP_API_URL;

export const submitComplaint = async (reportData) => {
  const response = await fetch(`${API_URL}/complaints/proof`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};