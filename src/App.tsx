import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import AnimalPage from './pages/AnimalPage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter basename="/online-zoo">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="animal" element={<AnimalPage />} />
          <Route path="animal/:petId" element={<AnimalPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
