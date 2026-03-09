import axios from "axios";

const getAllPlans = (setPlan) => {
  axios.get(`https://my-plan-for-today.onrender.com`).then(({ data }) => {
    console.log(data);
    setPlan(data);
  });
};
const addPlan = (title, setTitle, setPlan) => {
  axios
    .post(`https://my-plan-for-today.onrender.com/savePlans`, { title })
    .then((data) => {
      console.log(data);
      setTitle("");
      getAllPlans(setPlan);
    });
};
const editPlan = (planId, title, setPlan, setTitle, setEditing) => {
  axios
    .put(`https://my-plan-for-today.onrender.com/editPlan`, {
      _id: planId,
      title,
    })
    .then((data) => {
      console.log(data);
      setTitle("");
      setEditing(false);
      getAllPlans(setPlan);
    });
};
const deletePlan = (_id, setPlan) => {
  axios
    .post(`https://my-plan-for-today.onrender.com/deletePlan`, { _id })
    .then((data) => {
      console.log(data);
      getAllPlans(setPlan);
    });
};
export { getAllPlans, addPlan, editPlan, deletePlan };
