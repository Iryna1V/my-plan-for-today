import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export const MyPlans = ({ text, updatingInInput, deletePlan }) => {
  return (
    <div className="plan-item">
      <p className="plan-text">{text}</p>

      <div className="icons-container">
        <AiFillEdit className="icon edit-icon" onClick={updatingInInput} />
        <AiFillDelete className="icon delete-icon" onClick={deletePlan} />
      </div>
    </div>
  );
};
