// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import FilterBar from "./components/navbarComp";
// const Main = () => {
//   return (
//     <div>
//       <Routes>
//       <Route exact path="/detail" element={<detail />} />
//       </Routes>
//       <div className="container">
//         <div className="row">
//           <div className="col-12>">
//             <br></br>
//             <h1>Restaurants</h1>
//             <br></br>
//             <p>
//               Discover the broad culinary and and peak delicacy with this
//               website
//             </p>
//             <br></br>
//           </div>
//         </div>

//         <FilterBar />
//         <header className="App-header"></header>
//       </div>
//     </div>
//   );
// };

// export default Main

import React from "react";
import RestaurantList from "../components/restaurantList";
import RestaurantDetail from "../components/restaurantDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Button, Card } from "react-bootstrap";

const Main = () => {


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h1>Restaurants</h1>
            <br />
            <p>
              Discover the broad culinary and peak delicacy with this website
            </p>
          </div>
        </div>

        <div>
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          </Routes>
        </div>

        {/* <div className="row">
          <div className="col-3">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </div> */}
        <header className="App-header"></header>
      </div>
    </div>
  );
};

export default Main;
