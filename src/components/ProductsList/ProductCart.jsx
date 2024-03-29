import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import {
  ShoppingCartOutlined,
  EllipsisOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { cartContext } from "../../contexts/CartContext"
import { useState } from "react";
import { favContext } from "../../contexts/favContext";


const ProductCart = ({ item }) => {
  const { addProductToCart, checkItemInCart } = useContext(cartContext);
  const [checkInCart, setCheckInCart] = useState(checkItemInCart(item.id));
  useEffect(() => {
    setCheckInCart(checkItemInCart(item.id))
  })

  const {addProductToFav, checkItemInFav } = useContext(favContext);
  const [checkInFav, setCheckInFav] = useState(checkItemInFav(item.id));
  useEffect(() => {
    setCheckInFav(checkItemInFav(item.id))
  })
  return (
    <Card className="ant-card-body_shop "
      hoverable
      key={item.id}
      style={{ width: "280px", margin: "10px", background: 'transparent' }}
      cover={<img alt="example" src={item.image1} style={{width: '250px', marginLeft: '5.5%'}} />}
      actions={[
        <HeartOutlined twoToneColor="red" style={{ color: checkInFav ? "red" : "black", fontSize: "25px" }}
        onClick={() => {
          addProductToFav(item);
          setCheckInFav(checkItemInFav(item.id));
        }} />,
        <ShoppingCartOutlined
          style={{ color: checkInCart ? "red" : "black", fontSize: "25px" }}
          onClick={() => {
            addProductToCart(item);
            setCheckInCart(checkItemInCart(item.id));
          }}
        />,
        <Link to={`/products/${item.id}`}>
          <EllipsisOutlined
            style={{ color: "black", fontSize: "25px" }}
            key="ellipsis"
          />
        </Link>,
      ]}
    >
      <Card.Meta
        title={<h3 style={{color: 'white'}}>{item.brand}</h3>}
        description={
          <>
            <h3 style={{color: 'black'}}>{item.model}</h3>
            <h2 style={{color: 'black'}}>{"$" + item.price}</h2>
          </>
        }
      />
    </Card>
  );
};

export default ProductCart;