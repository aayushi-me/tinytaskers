export interface Job {
    jobID: string;
    posterID: string;
    title: string;
    description: {
      aboutTheJob: string;
      essentialRequirements: string;
      specificJobResponsibilities: string;
      qualifications: string;
    };
    category: string;
    paymentFrom: number;
    paymentTo: number;
    location: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    milestones?: any; // Milestones are an array of objects
    applyByDate: string;
  }