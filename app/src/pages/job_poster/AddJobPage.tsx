import AddNewJobForm from "../../components/job_poster/addJob/AddNewJobForm.tsx";
import { Container } from "@mui/material";
import Header from "../../components/job_poster/shared/PosterHeader.tsx";
import Footer from "../../components/job_poster/shared/PosterFooter.tsx";

export default function AddJobPage() {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Container>
          <AddNewJobForm />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
