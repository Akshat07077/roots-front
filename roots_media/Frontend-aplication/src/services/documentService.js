import axios from "axios";

const API_URL = "https://your-backend-api.com/api/documents";

export const uploadDocumentAPI = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
