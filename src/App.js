import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Details from "./pages/detail";
import RestaurantList from "./components/restaurantList";
import RestaurantDetail from "./components/restaurantDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/detail/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
