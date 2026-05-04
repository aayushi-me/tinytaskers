export const getPosterIDFromToken = (): number | null => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
  
      // Extract the payload part of the JWT token
      const payload = token.split(".")[1];
      if (!payload) {
        throw new Error("Invalid token structure");
      }
  
      // Decode the payload from base64
      const decodedPayload = JSON.parse(atob(payload));
      const userID = decodedPayload.userID; // Extract userID as posterID
  
      if (!userID) {
        throw new Error("User ID not found in token");
      }
  
      return userID; // Return the poster ID
    } catch (error) {
      console.error("Failed to decode token or retrieve userID:", error);
      return null; // Return null if decoding fails
    }
  };
  
  export const getRoleFromToken = (): string | null => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found in localStorage");
  
      const payload = token.split(".")[1];
      if (!payload) throw new Error("Invalid token structure");
  
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.role || null; // Return role or null
    } catch (error) {
      console.error("Failed to decode token or retrieve role:", error);
      return null;
    }
  };
  