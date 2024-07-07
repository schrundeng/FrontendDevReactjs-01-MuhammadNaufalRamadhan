// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Container, Row, Col, Spinner } from "react-bootstrap";

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://restaurant-api.dicoding.dev/list");
//         setRestaurants(response.data.restaurants);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <Container>
//       <Row>
//         {restaurants.map((restaurant) => (
//           <Col key={restaurant.id} md={4} className="mb-4">
//             <Card>
//               <Card.Img variant="top" src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`} alt={restaurant.name} />
//               <Card.Body>
//                 <Card.Title>{restaurant.name}</Card.Title>
//                 <Card.Text>{restaurant.description}</Card.Text>
//                 <Card.Text><strong>City:</strong> {restaurant.city}</Card.Text>
//                 <Card.Text><strong>Rating:</strong> {restaurant.rating}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default RestaurantList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
// import ReactStars from "react-rating-stars-component";
// import { Link } from "react-router-dom";

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://restaurant-api.dicoding.dev/list"
//         );
//         const restaurantList = response.data.restaurants;

//         const detailedRestaurants = await Promise.all(
//           restaurantList.map(async (restaurant) => {
//             try {
//               const detailResponse = await axios.get(
//                 `https://restaurant-api.dicoding.dev/detail/${restaurant.id}`
//               );
//               return {
//                 ...restaurant,
//                 categories: detailResponse.data.restaurant.categories,
//               };
//             } catch (error) {
//               console.error(
//                 `Error fetching details for restaurant ${restaurant.id}: `,
//                 error
//               );
//               return { ...restaurant, categories: [] };
//             }
//           })
//         );

//         setRestaurants(detailedRestaurants);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const truncateDescription = (description, maxLength) => {
//     if (description.length <= maxLength) {
//       return description;
//     }
//     return description.substring(0, maxLength) + "...";
//   };

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

//   return (
//     <Container>
//       <Row>
//         {restaurants.map((restaurant) => (
//           <Col key={restaurant.id} md={3} className="mb-3">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
//                 alt={restaurant.name}
//               />
//               <Card.Body>
//                 <Card.Title>{restaurant.name}</Card.Title>
//                 <Card.Text>
//                   <ReactStars
//                     count={5}
//                     value={restaurant.rating}
//                     size={24}
//                     isHalf={true}
//                     edit={false}
//                     activeColor="#ffd700"
//                   />
//                 </Card.Text>

//                 <Card.Text>
//                   {restaurant.categories
//                     ?.map((category) => category.name)
//                     .join(", ") || "N/A"}
//                 </Card.Text>
//                 <Link to={`/restaurant/${restaurant.id}`}>
//                   <Button variant="primary">Learn More</Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default RestaurantList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import FilterBar from "./navbarComp"; // Assuming the filter bar is in the same directory

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-api.dicoding.dev/list"
        );
        const restaurantList = response.data.restaurants;

        const detailedRestaurants = await Promise.all(
          restaurantList.map(async (restaurant) => {
            try {
              const detailResponse = await axios.get(
                `https://restaurant-api.dicoding.dev/detail/${restaurant.id}`
              );
              return {
                ...restaurant,
                categories: detailResponse.data.restaurant.categories,
              };
            } catch (error) {
              console.error(
                `Error fetching details for restaurant ${restaurant.id}: `,
                error
              );
              return { ...restaurant, categories: [] };
            }
          })
        );

        setRestaurants(detailedRestaurants);
        setFilteredRestaurants(detailedRestaurants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.categories.some(
          (category) => category.name === selectedCategory
        )
      );
      setFilteredRestaurants(filtered);
    }
  }, [selectedCategory, restaurants]);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <FilterBar onFilterChange={handleFilterChange} />
      <br />
      <Row>
        {filteredRestaurants.map((restaurant) => (
          <Col key={restaurant.id} md={3} className="mb-3">
            <Card>
              <Card.Img
                variant="top"
                src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
                alt={restaurant.name}
              />
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>
                  <ReactStars
                    count={5}
                    value={restaurant.rating}
                    size={24}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </Card.Text>

                <Card.Text>
                  {restaurant.categories
                    ?.map((category) => category.name)
                    .join(", ") || "N/A"}
                </Card.Text>
                <Link to={`/restaurant/${restaurant.id}`}>
                  <Button variant="primary">Learn More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantList;
