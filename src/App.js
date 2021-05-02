import "./App.scss";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import formData from "./constants/formData";

function App() {
  const submitFormData = (data) => {
    console.log(data);
  };

  return (
    <div data-testid="app-container" className="app">
      <header data-testid="app-header" className="app-header">
        Howdy
      </header>
      <div data-testid="app-body" className="app-body">
        <FormBuilder data={formData} submitAction={submitFormData} />
      </div>
    </div>
  );
}

export default App;
