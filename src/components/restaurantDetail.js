import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Spinner,
  Card,
  Row,
  Col,
  Image,
  ListGroup,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `https://restaurant-api.dicoding.dev/detail/${id}`
        );
        setRestaurant(response.data.restaurant);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

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

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <h1>{restaurant.name}</h1>
      </div>
      <div className="row">
        <div className="col-4">
          <Image
            src={`https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`}
            alt={restaurant.name}
          />
        </div>
        <div className="col-8">
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>{restaurant.description}</Card.Text>
              <Card.Text>
                <strong>City:</strong> {restaurant.city}
              </Card.Text>
              <Card.Text>
                <strong>Address:</strong> {restaurant.address}
              </Card.Text>
              <Card.Text>
                <strong>Rating:</strong>
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
                <strong>Categories:</strong>{" "}
                {restaurant.categories
                  .map((category) => category.name)
                  .join(", ")}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <h2>Menu</h2>
      </div>
      <div className="row">
        <div className="col-6">
          <Card className="mb-4">
            <Card.Body>
              <h4>Food</h4>
              <Card.Text>
                {restaurant.menus.foods.map((food) => (
                  <li key={food.name}>{food.name}</li>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6">
          <Card className="mb-4, ml-2">
            <Card.Body>
              <h4>Drinks</h4>
              <Card.Text>
                {restaurant.menus.drinks.map((drink) => (
                  <li key={drink.name}>{drink.name}</li>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="row">
          <h2>Reviews</h2>
        </div>
        <div className="col-12">
          <Card>
            <Card.Body>
              <Card.Title>Customer Reviews</Card.Title>
              <ListGroup variant="flush">
                {restaurant.customerReviews.map((review, index) => (
                  <ListGroup.Item key={index}>
                    <p>
                      <strong>{review.name}</strong> - {review.date}
                    </p>
                    <p>{review.review}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
