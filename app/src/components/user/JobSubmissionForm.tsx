import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { submitApplication } from "../../services/api";

export default function JobSubmissionForm() {
  const [application, setApplication] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await submitApplication(application);
      alert(`Application submitted! ID: ${response.data.applicationId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to submit application!");
    }
  };

  return (
    <form>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        onChange={(e) => setApplication({ ...application, title: e.target.value })}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        onChange={(e) => setApplication({ ...application, description: e.target.value })}
      />
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}