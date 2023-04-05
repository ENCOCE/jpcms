import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Cms from './pages/cms/Cms';
import Was from './pages/was/Was';

export default App;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cms" element={<Cms />} />
        <Route path="/was" element={<Was />} />
      </Routes>
    </BrowserRouter>
  );
}