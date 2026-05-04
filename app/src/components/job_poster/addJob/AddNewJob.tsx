import { Job } from "../../../models/Job";

/**
 * Component to display the details of a job.
 *
 * @param {PropsType} props - The properties passed to the component.
 * @param {Job} props.job - The job object containing details to display.
 * @returns {JSX.Element} - A React component that renders job details.
 */
type PropsType = {
  job: Job;
};

export default function AddNewJobComponent(props: PropsType) {
  const { title, description, category, payment, location } = props.job;

  return (
    <article className="job">
      <h2>{title}</h2>
      <p>{description}</p>
      <div>Category: {category}</div>
      <div>Payment: ${payment}</div>
      <div>
        Location:{" "}
        {`${location.street}, ${location.city}, ${location.state} - ${location.zipCode}`}
      </div>
    </article>
  );
}
