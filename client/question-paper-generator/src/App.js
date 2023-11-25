import Home from './components/Home';
import QuestionForm from './components/QuestionForm';
import PaperForm from './components/PaperForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/question" element={<QuestionForm />} />
            <Route path="/paper" element={<PaperForm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
