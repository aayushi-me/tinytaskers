import React from "react";

interface JobCardProps {
  title: string;
  description: string;
  company: string;
  category: string;
  payment: number;
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  company,
  category,
  payment,
  location,
}) => {
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Payment:</strong> ${payment}</p>
      <p>
        <strong>Location:</strong> {location.street}, {location.city}, {location.state}, {location.zipCode}
      </p>
    </div>
  );
};

export default JobCard;
