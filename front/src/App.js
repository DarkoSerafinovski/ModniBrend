import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import RegistrationPage from './Components/RegistrationPage';
import StyleSurvey from './Components/StyleSurvey';
import ClothingTypesPage from './Components/ClothingTypesPage';
import ProductsPage from './Components/ProductsPage';
import Preporuke from './Components/Preporuke';
import Blog from './Components/Blog';
import NewsDetailPage from './Components/NewsDetailPage';
import AddNewsPage from './Components/AddNewsPage';
import AddCategoryPage from './Components/AddCategoryPage';
import OrdersPage from './Components/OrdersPage';
import AddStylePage from './Components/AddStylePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/registracija" element={<RegistrationPage />} />  
          <Route path="/anketa" element={<StyleSurvey />} />  
          <Route path="/shop" element={<ClothingTypesPage />} />  
          <Route path="/blog" element={<Blog />} />  
          <Route path="/preporuke" element={<Preporuke />} />  
          <Route path="/shop/:type" element={<ProductsPage/>} />
          <Route path="/blog/:newsId" element={<NewsDetailPage/>} />
          <Route path="/dodaj-clanak" element={<AddNewsPage />} />  
          <Route path="/dodaj-kategoriju" element={<AddCategoryPage />} />  
          <Route path="/porudzbine" element={<OrdersPage />} />  
          <Route path="/dodaj-stil" element={<AddStylePage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
