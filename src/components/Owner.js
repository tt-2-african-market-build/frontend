import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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

const EditSection = styled.div`
  display: flex;
`;

const initialState = {
  item_name: "",
  location: "",
  quantity: "",
  price: "",
  description: "",
  user_id: "",
};

export default function OwnerPage() {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log( "Token and userId coming from local storage", token, user_id);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState();
  const [itemToEdit, setItemToEdit] = useState(initialState);
  const [editItem, setEditItem] = useState(false);
  const [adding, setAdding] = useState(false);
  const { push } = useHistory();
  const { id } = useParams();

  const deleteHandler = (id) => {
    axiosWithAuth()
      .delete(`https://sauti-market-bw.herokuapp.com/api/items/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log( "Error message from owner", {err});
      });
  };

  const handleChange = (e) => {
    setItemToEdit({ ...itemToEdit, [e.target.name]: e.target.value });
  };

  const editItems = (items) => {
    setEditItem(true);
    setItemToEdit(items);
  };
  
  const addItem = (e,) => {
    itemToEdit.user_id = user_id;
    e.preventDefault();
    console.log("form values passing to post in new item", itemToEdit)
    setAdding(true);
    axios
      .post("https://sauti-market-bw.herokuapp.com/api/items", itemToEdit)
      .then((res) => {
        console.log(res.data)
      })
      .catch(err => console.log("Error from owner on add", {err}))
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
      })
      .catch((error) => console.log("This is not working", error));
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/api/items")
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <Title>
        Welcome to African <Spam>Marketplace</Spam>
      </Title>
      <button onClick={() => setAdding(true)}>Add Item</button>
      {adding && (
        <form onSubmit={addItem}>
          <legend>Add Product</legend>
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
              onChange={(e) =>
                setItemToEdit({ ...itemToEdit, quantity: e.target.value })
              }
              value={itemToEdit.quantity}
            />
          </label>
          <label>
            Price:
            <input
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
          <EditSection className="button-row">
            <button type="submit">Save</button>
            <button onClick={() => setAdding(false)}>Cancel</button>
          </EditSection>
        </form>
      )}

      {items.map((item) => {
        const { id, item_name, location, quantity, price, description } = item;
        return (
          <Card key={id}>
            <p>Name: {item_name}</p>
            <p>Location: {location}</p>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <p>Description: {description}</p>
            <button
              onClick={() => {
                editItems(item);
              }}
            >
              Edit Item
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(item.id);
              }}
            >
              Delete Item
            </button>
          </Card>
        );
      })}
      {editItem && (
        <form onSubmit={saveEdit}>
          <legend>Edit Product</legend>
          <label>
            Name:
            <input
              onChange={(e) =>
                setItemToEdit({ ...itemToEdit, item_name: e.target.value })
              }
              value={itemToEdit.item_name}
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
              onChange={(e) =>
                setItemToEdit({ ...itemToEdit, quantity: e.target.value })
              }
              value={itemToEdit.quantity}
            />
          </label>
          <label>
            Price:
            <input
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

          <EditSection className="button-row">
            <button type="submit">Save</button>
            <button onClick={() => setEditItem(false)}>Cancel</button>
          </EditSection>
        </form>
      )}
    </Wrapper>
  );
}
