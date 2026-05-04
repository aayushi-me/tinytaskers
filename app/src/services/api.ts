import axios from "axios";
const api = axios.create({
 baseURL: "http://localhost:3002", // Base URL of your backend
});
// Authentication APIs
export const login = async (credentials: { email: string; password: string }) => {
 return await api.post("/auth/login", credentials);
};
export const register = async (userData: { name: string; email: string; password: string }) => {
 return await api.post("/auth/register/user", userData);
};
// Job Application APIs
export const submitApplication = async (applicationData: { title: string; description: string }) => {
 return await api.post("/applications", applicationData);
};
export const fetchApplications = async () => {
 return await api.get("/applications");
};
export const approveApplication = async (id: string) => {
  return await api.post("/applications/${id}/approve");
};
export const denyApplication = async (id: string) => {
  return await api.post("/applications/${id}/deny");
};
export default api;