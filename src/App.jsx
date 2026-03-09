import { useState, useEffect } from "react";
import "./App.css";
import { MyPlans } from "./MyPlans";
import Alert from "./Alert"; 
import { getAllPlans, addPlan, editPlan, deletePlan } from "./FetchPlans";

function App() {
  const [myPlan, setPlan] = useState([]);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [planId, setPlanId] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    getAllPlans(setPlan);
  }, []);

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const updatingInInput = (_id, title) => {
    setEditing(true);
    setTitle(title);
    setPlanId(_id);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      showAlert(true, "danger", "Please enter a plan"); 
      return;
    }

    if (editing) {
      editPlan(planId, title, setPlan, setTitle, setEditing);
      showAlert(true, "success", "Plan edited!"); 
    } else {
      addPlan(title, setTitle, setPlan);
      showAlert(true, "success", "Plan added!");
    }
  };

  return (
    <div className="App">
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={myPlan} />}
      <form onSubmit={handleSubmit}>
        <h1>My plan for today</h1>
        <input
          type="text"
          placeholder="Enter a new task to do..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={!title}>
          {editing ? "Edit" : "Add"}
        </button>
      </form>

      {myPlan.map((plan) => (
        <MyPlans
          text={plan.title}
          key={plan._id}
          updatingInInput={() => updatingInInput(plan._id, plan.title)}
          deletePlan={() => {
            deletePlan(plan._id, setPlan);
            showAlert(true, "danger", "Plan deleted");
          }}
        />
      ))}
    </div>
  );
}

export default App;
