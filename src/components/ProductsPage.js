import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../actions";

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: rgb(250, 179, 51);
`;

const Spam = styled.span`
  color: rgb(29, 155, 76);
`;

const Wrapper = styled.div`
  display: flex;
  width: 48%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(42, 42, 42);
  // width: 48%;
  // flex-wrap: wrap;
`;

const ProductsPage = (props) => {
  const token = localStorage.getItem("token");
  console.log(token);
//   const [itemsForSale, setItemsForSale] = useState([]);
  const { push } = useHistory();
  const { getProducts, data } = props;

  const logOut = () => {
    localStorage.clear("token");
    console.log("You have logged out");
    push("/");
  };

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
    console.log(getProducts())
  }, []);

  return (
    <div>
      <button onClick={logOut} style={{ marginLeft: "85rem" }}>
        Logout
      </button>
      <Wrapper>
        <Title>
          Welcome to African <Spam>Marketplace</Spam>
        </Title>
        {data.map((item) => {
          return (
            <Card key={item.id}>
              <p>Name: {item.item_name}</p>
              <p>Location: {item.location}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Description: {item.description}</p>
            </Card>
          );
        })}
      </Wrapper>
    </div>
  );
}

function mapStateToProps(state) {
    console.log(state)
    return {
      data: state.productReducer.data,
      fetchingProducts: state.productReducer.fetchingProducts,
      error: state.productReducer.error,
    };
}

export default connect(mapStateToProps, { getProducts })(ProductsPage)