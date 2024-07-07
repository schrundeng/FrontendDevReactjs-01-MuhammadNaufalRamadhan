// import React from "react";
// import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";

// const FilterBar = () => {
//   return (
//     <div>
//       <Navbar expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand className="me-4">Filter</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="me-auto my-2 my-lg-0 align-items-center"
//               navbarScroll
//             >
// <div className="d-flex align-items-center me-4">
//   <Form.Check
//     type="checkbox"
//     id="open-now-checkbox"
//     className="me-3"
//   />
//   <Form.Label htmlFor="open-now-checkbox" className="mb-0">
//     Open Now
//   </Form.Label>
// </div>
//               <Form.Select className="me-3" aria-label="Price Range">
//                 <option>Price</option>
//                 <option value="1">$</option>
//                 <option value="2">$$</option>
//                 <option value="3">$$$</option>
//                 <option value="4">$$$$</option>
//               </Form.Select>
//               <Form.Select className="me-3" aria-label="Categories">
//                 <option>Categories</option>
//                 <option value="1">Category 1</option>
//                 <option value="2">Category 2</option>
//                 <option value="3">Category 3</option>
//               </Form.Select>
//             </Nav>
//             <Button variant="secondary">Clear All</Button>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   );
// };

// export default FilterBar;

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import axios from "axios";

const FilterBar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-api.dicoding.dev/list"
        );
        const restaurantList = response.data.restaurants;

        const allCategories = new Set();
        for (const restaurant of restaurantList) {
          const detailResponse = await axios.get(
            `https://restaurant-api.dicoding.dev/detail/${restaurant.id}`
          );
          detailResponse.data.restaurant.categories.forEach((category) => {
            allCategories.add(category.name);
          });
        }

        setCategories([...allCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    onFilterChange(event.target.value);
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
              <Form.Select className="me-3" aria-label="Price Range">
                <option>Price</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
              </Form.Select>
              <Form.Select
                className="me-3"
                aria-label="Categories"
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
            <Button variant="secondary">Clear All</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default FilterBar;
