import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../actions";

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  font-weight: bold;
`;

const Span = styled.span`
  color: rgb(29, 155, 76);
`;

const Span2 = styled.span`
  color: red;
`;

const Wrapper = styled.div`
  display: flex;
  width: 48%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid rgb(42, 42, 42);
`;

const ProductsPage = (props) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const { getProducts, data } = props;

  useEffect(() => {
    // axiosWithAuth()
    //   .get("/api/items")
    //   .then((res) => {
    //     console.log(res);
    //     setItemsForSale(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    getProducts();
    console.log(getProducts());
  }, []);

  return (
    <div className="products-container">
      <Wrapper>
        <Title>
          <Span2>Welcome</Span2> to African <Span>Marketplace</Span>
        </Title>
        <br />
        {data.map((item) => {
          const {
            id,
            item_name,
            location,
            quantity,
            price,
            description,
            image_url,
          } = item;
          return (
            <Card key={id}>
              <img src={image_url} alt="img" />
              <p>Name: {item_name}</p>
              <p>Location: {location}</p>
              <p>Quantity: {quantity}</p>
              <p>Price: ${price}</p>
              <p>Description: {description}</p>
              <br/>
              <i>Interested? <Link className="button" to="signup">Sign up</Link></i>
              <br />
            </Card>
          );
        })}
      </Wrapper>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    data: state.productReducer.data,
    fetchingProducts: state.productReducer.fetchingProducts,
    error: state.productReducer.error,
  };
}

export default connect(mapStateToProps, { getProducts })(ProductsPage);
