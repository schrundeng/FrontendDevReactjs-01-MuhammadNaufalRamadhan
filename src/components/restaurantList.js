import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import FilterBar from "./filterBar";

const buttonColor = {
  backgroundColor: "#002B56",
  borderRadius: "0px",
  color: "white",
  fontSize: "1em",
  width: "100%",
};

const borderStyle = {
  borderRadius: "0px",
  borderColor: "white",
};

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openNow, setOpenNow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

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
                priceRange: restaurant.priceRange || "N/A",
              };
            } catch (error) {
              console.error(
                `Error fetching details for restaurant ${restaurant.id}: `,
                error
              );
              return {
                ...restaurant,
                categories: [],
                priceRange: "N/A",
              };
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
    filterRestaurants();
  }, [selectedCategory, openNow, selectedPrice, restaurants]);

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (selectedCategory) {
      filtered = filtered.filter((restaurant) =>
        restaurant.categories.some(
          (category) => category.name === selectedCategory
        )
      );
    }

    if (openNow) {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      filtered = filtered.filter((restaurant) =>
        isOpenNow(restaurant, currentHour)
      );
    }

    if (selectedPrice) {
      filtered = filtered.filter(
        (restaurant) => restaurant.priceRange === selectedPrice
      );
    }

    setFilteredRestaurants(filtered);
  };

  const isOpenNow = (restaurant, currentHour) => {
    const openingHours = restaurant.operationalHours;

    if (!openingHours) return false;

    const today = new Date().getDay();
    const todayHours = openingHours[today];

    if (!todayHours) return false;

    const { from, to } = todayHours;
    return currentHour >= from && currentHour < to;
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOpenNowChange = (isOpen) => {
    setOpenNow(isOpen);
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
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
      <FilterBar
        onFilterChange={handleFilterChange}
        onOpenNowChange={handleOpenNowChange}
        onPriceChange={handlePriceChange}
      />
      <br />
      <Row>
        {filteredRestaurants.length === 0 && (
          <div className="text-center w-100 mt-3 mb-3">
            <p>No restaurants found. Please adjust your filters.</p>
          </div>
        )}
        {filteredRestaurants.map((restaurant) => (
          <Col key={restaurant.id} md={3} className="mb-3">
            <Card style={borderStyle}>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card.Img
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "0px",
                  }}
                  variant="top"
                  src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
                  alt={restaurant.name}
                />
              </div>

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
                <Card.Text>Price: {restaurant.priceRange}</Card.Text>
              </Card.Body>
              <Link to={`/restaurant/${restaurant.id}`}>
                <Button style={buttonColor}>Learn More</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantList;
