export interface Job {
    jobID: string;
    posterID: string;
    title: string;
    description: string;
    category: string;
    payment: number;
    location: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }
  