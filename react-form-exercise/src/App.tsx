import { useState } from "react";
import "./App.css";

type MyFormData = {
  firstName: string;
  lastName: string;
  age: string;
  favouriteFood: string[];
};

function App() {
  const [formData, setFormData] = useState<MyFormData>({
    firstName: "",
    lastName: "",
    age: "",
    favouriteFood: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData["favouriteFood"], value]
          : prevData["favouriteFood"].filter((item: string) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can handle the form submission, e.g., send data to an API
  };
  const handleClearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      favouriteFood: [],
    });
  };

  const formValid: boolean = !!(
    formData.firstName &&
    formData.lastName &&
    formData.age &&
    formData.favouriteFood.length > 0
  );

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="favouriteFood">Favourite Food</label>
          <br />
          <input
            type="checkbox"
            id="pizza"
            name="favouriteFood"
            value="pizza"
            onChange={handleInputChange}
            checked={formData.favouriteFood.includes("pizza")}
          />
          <label htmlFor="pizza">Pizza</label>
          <input
            type="checkbox"
            id="burger"
            name="favouriteFood"
            value="burger"
            onChange={handleInputChange}
            checked={formData.favouriteFood.includes("burger")}
          />
          <label htmlFor="burger">Burger</label>
          <input
            type="checkbox"
            id="sushi"
            name="favouriteFood"
            value="sushi"
            onChange={handleInputChange}
            checked={formData.favouriteFood.includes("sushi")}
          />
          <label htmlFor="sushi">Sushi</label>
        </div>
        <button type="submit" disabled={!formValid}>
          Display User
        </button>
        <button type="button" onClick={handleClearForm}>
          Clear
        </button>
        {formValid && <FormDetails formData={formData} />}
      </form>
    </>
  );
}

const FormDetails = ({ formData }: { formData: MyFormData }) => {
  return (
    <div>
      <p>
        <b>First Name</b>: {formData.firstName}
      </p>
      <p>
        <b>Last Name</b>: {formData.lastName}
      </p>
      <p>
        <b>Age</b>: {formData.age}
      </p>
      <p>
        <b>Favourite Food</b>: {formData.favouriteFood.join(", ")}
      </p>
    </div>
  );
};

export default App;
