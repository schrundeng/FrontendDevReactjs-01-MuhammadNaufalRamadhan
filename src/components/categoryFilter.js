import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import axios from "axios";

const FilterBar = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-api.dicoding.dev/detail/:id"
        );
        const allCategories = response.data.restaurants.flatMap((restaurant) =>
          restaurant.categories.map((category) => category.name)
        );
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      onSearch(category);
    }
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange("");
    onSearch("");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className="me-4">Filter</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 align-items-center"
              navbarScroll
            >
              <div className="d-flex align-items-center me-4">
                <Form.Check
                  type="checkbox"
                  id="open-now-checkbox"
                  className="me-3"
                />
                <Form.Label htmlFor="open-now-checkbox" className="mb-0">
                  Open Now
                </Form.Label>
              </div>
              <Form.Select
                className="me-3"
                aria-label="Price Range"
                value={priceRange}
                onChange={handlePriceRangeChange}
              >
                <option value="">Price</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
              </Form.Select>
              <Form.Select
                className="me-3"
                aria-label="Categories"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Nav>
            <Button variant="secondary" onClick={clearFilters}>
              Clear All
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default FilterBar;
