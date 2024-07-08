// import React, { useState, useEffect } from "react";
// import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
// import axios from "axios";

// const borderStyle = {
//   borderRadius: "0px",
// };

// const buttonColor = {
//   borderRadius: "0px",
//   color: "white",
//   fontSize: "1em",
// };

// const FilterBar = ({ onFilterChange }) => {
//   const [categories, setCategories] = useState([]);
//   const [openNow, setOpenNow] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "https://restaurant-api.dicoding.dev/list"
//         );
//         const restaurantList = response.data.restaurants;

//         const allCategories = new Set();
//         for (const restaurant of restaurantList) {
//           const detailResponse = await axios.get(
//             `https://restaurant-api.dicoding.dev/detail/${restaurant.id}`
//           );
//           detailResponse.data.restaurant.categories.forEach((category) => {
//             allCategories.add(category.name);
//           });
//         }

//         setCategories([...allCategories]);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryChange = (event) => {
//     onFilterChange(event.target.value);
//   };

//   const handleOpenNowChange = (event) => {
//     setOpenNow(event.target.checked);
//     onFilterChange(event.target.checked);
//   };

//   const handlePriceChange = (event) => {
//     setSelectedPrice(event.target.value);
//     onFilterChange(event.target.value);
//   };

//   return (
//     <div>
//       <Navbar expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand className="me-4">Filter by:</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="me-auto my-2 my-lg-0 align-items-center"
//               navbarScroll
//             >
//               <Form.Check
//                 type="checkbox"
//                 id="open-now-checkbox"
//                 label="Open Now"
//                 className="me-3"
//                 style={{
//                   marginBottom: "0",
//                   whiteSpace: "nowrap",
//                   borderRadius: "0px",
//                 }}
//                 checked={openNow}
//                 onChange={handleOpenNowChange}
//               />
//               <Form.Select
//                 className="me-3"
//                 aria-label="Price Range"
//                 style={borderStyle}
//                 value={selectedPrice}
//                 onChange={handlePriceChange}
//               >
//                 <option value="">Price</option>
//                 <option value="1">$</option>
//                 <option value="2">$$</option>
//                 <option value="3">$$$</option>
//                 <option value="4">$$$$</option>
//               </Form.Select>
//               <Form.Select
//                 style={borderStyle}
//                 className="me-3"
//                 aria-label="Categories"
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">All</option>
//                 {categories.map((category, index) => (
//                   <option key={index} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Nav>
//             <Button variant="secondary" style={buttonColor}>
//               Clear All
//             </Button>
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

const borderStyle = {
  borderRadius: "0px",
};

const buttonColor = {
  borderRadius: "0px",
  color: "white",
  fontSize: "1em",
};

const FilterBar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [openNow, setOpenNow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
    setSelectedCategory(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleOpenNowChange = (event) => {
    setOpenNow(event.target.checked);
    onFilterChange(event.target.checked);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleClearAll = () => {
    setOpenNow(false);
    setSelectedPrice("");
    setSelectedCategory(""); // Resetting category filter
    onFilterChange(""); // Resetting filter
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className="me-4">Filter by:</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 align-items-center"
              navbarScroll
            >
              <Form.Check
                type="checkbox"
                id="open-now-checkbox"
                label="Open Now"
                className="me-3"
                style={{
                  marginBottom: "0",
                  whiteSpace: "nowrap",
                  borderRadius: "0px",
                }}
                checked={openNow}
                onChange={handleOpenNowChange}
              />
              <Form.Select
                className="me-3"
                aria-label="Price Range"
                style={borderStyle}
                value={selectedPrice}
                onChange={handlePriceChange}
              >
                <option value="">Price</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
              </Form.Select>
              <Form.Select
                style={borderStyle}
                className="me-3"
                aria-label="Categories"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Nav>
            <Button
              variant="secondary"
              style={buttonColor}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default FilterBar;
