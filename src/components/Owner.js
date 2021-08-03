import React, { useEffect, useState, } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory, } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-scroll";
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

const EditSection = styled.div`
  display: flex;
`;

const initialState = {
  image_url: "",
  item_name: "",
  location: "",
  quantity: "",
  price: "",
  description: "",
  user_id: "",
};

const OwnerPage = (props) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log("Token and userId coming from local storage", token, user_id);
  const [itemToEdit, setItemToEdit] = useState(initialState);
  const [editItem, setEditItem] = useState(false);
  const [adding, setAdding] = useState(false);
  const { push } = useHistory();
  const {getProducts,  data } = props;

  const deleteHandler = (id) => {
    axiosWithAuth()
      .delete(`https://sauti-market-bw.herokuapp.com/api/items/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error message from owner", { err });
      });
  };

  const editItems = (items) => {
    setEditItem(true);
    setItemToEdit(items);
  };

  const addItem = (e) => {
    itemToEdit.user_id = user_id;
    e.preventDefault();
    console.log("form values passing to post in new item", itemToEdit);
    setAdding(true);
    axios
      .post("https://sauti-market-bw.herokuapp.com/api/items", itemToEdit)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log("Error from owner on add", { err }));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://sauti-market-bw.herokuapp.com/api/items/${itemToEdit.id}`,
        itemToEdit
      )
      .then((res) => {
        console.log("this is the put", res);
        console.log(itemToEdit.id);
        setEditItem(false);
        window.location.reload();
      })
      .catch((error) => console.log("This is not working", error));
  };

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
    //     setItems(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    getProducts();
  }, []);

  return (
    <div className="products-container">
      <button
        className="button"
        onClick={logOut}
        style={{ marginLeft: "85rem" }}
      >
        Logout
      </button>
      <Wrapper>
        <Title>
          <Span2>Welcome</Span2> to African <Span>Marketplace</Span>
        </Title>
        <br />
        <button
          className="button"
          onClick={() => (!adding ? setAdding(true) : setAdding(false))}
        >
          Add Item
        </button>
        {adding && (
          <form onSubmit={addItem}>
            <legend style={{textDecorationLine: "underline"}}>Add Product</legend>
            <br />
            <label>
              Name:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, item_name: e.target.value })
                }
              />
            </label>

            <label>
              Location:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, location: e.target.value })
                }
                value={itemToEdit.location}
              />
            </label>

            <label>
              Quantity:
              <input
                placeholder="Must be a number"
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, quantity: e.target.value })
                }
                value={itemToEdit.quantity}
              />
            </label>
            <br />
            <br />
            <label>
              Price:
              <input
                placeholder="Must be a number"
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, price: e.target.value })
                }
                value={itemToEdit.price}
              />
            </label>

            <label>
              Description:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, description: e.target.value })
                }
                value={itemToEdit.description}
              />
            </label>

            <label>
              Image:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, image_url: e.target.value })
                }
                value={itemToEdit.image_url}
              />
            </label>
            <br />
            <br />
            <EditSection className="button-row">
              <button className="button" type="submit">
                Save
              </button>
              <button className="button" onClick={() => setAdding(false)}>
                Cancel
              </button>
            </EditSection>
          </form>
        )}
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
              <button className="button">
                <Link
                  to="editForm"
                  smooth={true}
                  onClick={() => {
                    editItems(item);
                  }}
                >
                  Edit Item
                </Link>
              </button>
              <br/>
              <button className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler(item.id);
                }}
              >
                Delete Item
              </button>
              <br />
            </Card>
          );
        })}
        {editItem && (
          <form id="editForm" onSubmit={saveEdit}>
            <legend style={{textDecorationLine: "underline"}}>Edit Product</legend>
            <br />
            <label>
              Name:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, item_name: e.target.value })
                }
              />
            </label>

            <label>
              Location:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, location: e.target.value })
                }
                value={itemToEdit.location}
              />
            </label>

            <label>
              Quantity:
              <input
                placeholder="Must be a number"
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, quantity: e.target.value })
                }
                value={itemToEdit.quantity}
              />
            </label>
            <br />
            <br />
            <label>
              Price:
              <input
                placeholder="Must be a number"
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, price: e.target.value })
                }
                value={itemToEdit.price}
              />
            </label>

            <label>
              Description:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, description: e.target.value })
                }
                value={itemToEdit.description}
              />
            </label>

            <label>
              Image:
              <input
                onChange={(e) =>
                  setItemToEdit({ ...itemToEdit, image_url: e.target.value })
                }
                value={itemToEdit.image_url}
              />
            </label>
            <br />
            <br />
            <EditSection className="button-row">
              <button className="button" type="submit">
                Save
              </button>
              <button className="button" onClick={() => setEditItem(false)}>
                Cancel
              </button>
            </EditSection>
          </form>
        )}
      </Wrapper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    data: state.productReducer.data
  }
}


export default connect(mapStateToProps, { getProducts }) (OwnerPage)
