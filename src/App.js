import "./App.css";
import Main from "./pages/main/Main";
//test commit 1.1
function App() {
  return (
    <>
      <div className="min-vh-100">
        <Main />
        localStorage.setItem('greetingDisplayed', 'false');
      </div>
    </>
  );
}

export default App;
