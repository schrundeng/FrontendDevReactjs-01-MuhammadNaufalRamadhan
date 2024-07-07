// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Container, Card, Spinner } from "react-bootstrap";

// const RestaurantDetails = () => {
//   const { id } = useParams();
//   const [restaurant, setRestaurant] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRestaurantDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://restaurant-api.dicoding.dev/detail/${id}`
//         );
//         setRestaurant(response.data.restaurant);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching restaurant details: ", error);
//         setLoading(false);
//       }
//     };

//     fetchRestaurantDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   if (!restaurant) {
//     return <div>Restaurant not found.</div>;
//   }

//   return (
//     <Container>
//       <Card>
//         <Card.Img
//           variant="top"
//           src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
//           alt={restaurant.name}
//         />
//         <Card.Body>
//           <Card.Title>{restaurant.name}</Card.Title>
//           <Card.Text>{restaurant.description}</Card.Text>
//           <Card.Text>
//             <strong>City:</strong> {restaurant.city}
//           </Card.Text>
//           <Card.Text>
//             <strong>Address:</strong> {restaurant.address}
//           </Card.Text>
//           <Card.Text>
//             <strong>Rating:</strong> {restaurant.rating}
//           </Card.Text>
//           <Card.Text>
//             <strong>Categories:</strong>{" "}
//             {restaurant.categories.map((category) => category.name).join(", ")}
//           </Card.Text>
//           <Card.Text>
//             <strong>Foods:</strong>{" "}
//             {restaurant.menus.foods.map((food) => food.name).join(", ")}
//           </Card.Text>
//           <Card.Text>
//             <strong>Drinks:</strong>{" "}
//             {restaurant.menus.drinks.map((drink) => drink.name).join(", ")}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default RestaurantDetails;

import React from "react";

const Details = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h1>$RestoName</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
