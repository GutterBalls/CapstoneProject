import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
const DATABASE_URL = 'http://localhost:1337/api';

const CartCheckout = (props) => {
    const [cartQuantity, setCartQuantity] = useState({});
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deletedItem, setDeletedItem] = useState("");
    const nav = useNavigate();

    useEffect(() => {
    
        if (localStorage.getItem("token")) {
        props.getUserData();
        getCartData();
        };
    }, [deletedItem]);

    // GET logged in user cart.
    async function getCartData() {
        try {
            const response = await fetch(`${DATABASE_URL}/cartItems/${props.userData.id}`)
            const translatedData = await response.json();
            
            setCartData(translatedData);

            return translatedData
        } catch (error) {
            console.log(error)
        };
    };

    // DELETE a cart item.
    async function deleteCartItem(event) {
        console.log("Delete Cart Item F(X) id parameter", event.target.value)
        try {
            const response = await fetch(`${DATABASE_URL}/cartItems/${event.target.value}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                },
            });
            
        

        return setDeletedItem("deleted", event.target.value);


            
        } catch (error) {
            console.log(error);
        }
    };


    // Setting state for Cart Quantity
    // function quantityAddOrMinus(event) {
    //     setCartQuantity(event.target.value)
    // };
    
    // Adding 1 on + click to increase quantity state. 
    function addQuantity(event) {
        if ( cartQuantity[`${event.target.value}`]) {
        setCartQuantity(cartQuantity[`${event.target.value}`] + 1);
        }
    };

    // Subtracting 1 on - click to decrease quantity state. 
    async function minusQuantity(event) {
        try {
            // console.log("Minus button clicked")
            // console.log(event.target.value)
            // console.log("ETV type of", typeof event.target.value)
            // console.log(typeof event.target.parentNode.getAttribute("value"))

            if (parseInt(event.target.value) > 1){
            // console.log("Inside if")
            const currentItem = cartData.filter((item) => item.id === parseInt(event.target.parentNode.getAttribute("value")))
            
            const response = await fetch(`${DATABASE_URL}/cartItems/${event.target.parentNode.getAttribute("value")}`,{
                method: "PATCH",
                headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    "order_id": currentItem[0].order_id,
                    "product_id": currentItem[0].product_id,
                    qty: parseInt(event.target.value) - 1,
                    price: currentItem[0].price
                })
            })
            const translatedData = await response.json();
            // console.log("Line 100 cart", translatedData)
            if (translatedData.qty) {
                const currentItem = cartData.filter((item) => item.id === parseInt(event.target.parentNode.getAttribute("value")))
                currentItem[0].qty = parseInt(event.target.value) -1 
                const newCart = cartData.filter((item) => item.id !== parseInt(event.target.parentNode.getAttribute("value")))
                setCartData([...newCart, currentItem[0]])
            }
        }
        } catch (error) {
            throw error;
        }
    };
    

    function calculateTotal() {

    };

    // const checkOrderStatus = await getOrderByUserId(user.id);
    //         if (checkOrderStatus.order_status === true)

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBRow>
                  <MDBCol lg="7" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    >
                      Shopping Cart Items
                    
                    </MDBTypography>
                    { cartData.length > 0 && localStorage.getItem("token") ? cartData.map((singleItem, idx) => {
                        console.log("Cart line 150")
                        console.log(singleItem)
                        console.log("cartData")
                        console.log(cartData)
                        return (
                    <div className="d-flex align-items-center mb-5" key={idx}>
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          src={singleItem.image}
                          fluid
                          style={{ width: "150px" }}
                          alt="Generic placeholder image"
                        />
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <button onClick={deleteCartItem} value={singleItem.id} className="float-end text-black">
                          <MDBIcon fas icon="times" /> {singleItem.id}
                        </button>
                        <MDBTypography tag="h5" className="text-primary">
                          {singleItem.brand} {singleItem.name}
                        </MDBTypography>

                        <div className="d-flex align-items-center">
                          <p className="fw-bold mb-0 me-5 pe-3">${singleItem.price}</p>

                          <div value={singleItem.id} className="def-number-input number-input safari_only">
                            <button className="minus" value={singleItem.qty} onClick={minusQuantity}></button>
                            <input
                              className="quantity fw-bold text-black"
                              min={1}
                              max={20}
                              value={singleItem.qty}
                              type="number"
                            //   onChange={quantityAddOrMinus}
                            />
                            <button className="plus" value={singleItem.id} onClick={addQuantity}></button>
                          </div>

                          <p className="fw-bold mb-0 me-5 pe-3"> = ${(singleItem.price * singleItem.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                        ) 
                    }) : <h1> No Items in your cart. </h1>
                }
                    
                    {/* <div className="d-flex align-items-center mb-5">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp"
                          fluid
                          style={{ width: "150px" }}
                          alt="Generic placeholder image"
                        />
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <a href="#!" className="float-end text-black">
                          <MDBIcon fas icon="times" />
                        </a>
                        <MDBTypography tag="h5" className="text-primary">
                          Headphones Bose 35 II
                        </MDBTypography>
                        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                          Color: red
                        </MDBTypography>

                        <div className="d-flex align-items-center">
                          <p className="fw-bold mb-0 me-5 pe-3">239$</p>

                          <div className="def-number-input number-input safari_only">
                            <button className="minus"></button>
                            <input
                              className="quantity fw-bold text-black"
                              min={0}
                              defaultValue={1}
                              type="number"
                            />
                            <button className="plus"></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-5">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                          fluid
                          style={{ width: "150px" }}
                          alt="Generic placeholder image"
                        />
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <a href="#!" className="float-end text-black">
                          <MDBIcon fas icon="times" />
                        </a>
                        <MDBTypography tag="h5" className="text-primary">
                          iPad 9.7 6-gen WiFi 32GB
                        </MDBTypography>
                        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                          Color: rose pink
                        </MDBTypography>

                        <div className="d-flex align-items-center">
                          <p className="fw-bold mb-0 me-5 pe-3">659$</p>

                          <div className="def-number-input number-input safari_only">
                            <button className="minus"></button>
                            <input
                              className="quantity fw-bold text-black"
                              min={0}
                              defaultValue={2}
                              type="number"
                            />
                            <button className="plus"></button>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }}
                    />

                    {/* <div className="d-flex justify-content-between px-x">
                      <p className="fw-bold">Sub:</p>
                      <p className="fw-bold">95$</p>
                    </div> */}
                    <div
                      className="d-flex justify-content-between p-2 mb-2"
                      style={{ backgroundColor: "#e1f5fe" }}
                    >
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        Total:
                      </MDBTypography>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        2261$
                      </MDBTypography>
                    </div>
                  </MDBCol>
                  <MDBCol lg="5" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-3 pt-2 text-center fw-bold text-uppercase"
                    >
                      Payment
                    </MDBTypography>

                    <form className="mb-3">
                      <MDBInput
                        className="mb-3"
                        label="Card number"
                        type="text"
                        size="lg"
                        defaultValue=""
                      />

                      <MDBInput
                        className="mb-3"
                        label="Name on card"
                        type="text"
                        size="lg"
                        defaultValue=""
                      />

                      <MDBRow>
                        <MDBCol md="6" className="mb-3">
                          <MDBInput
                            className="mb-3"
                            label="Expiration"
                            type="text"
                            size="lg"
                            minLength="7"
                            maxLength="7"
                            defaultValue=""
                            placeholder=""
                          />
                        </MDBCol>
                        <MDBCol md="6" className="mb-3">
                          <MDBInput
                            className="mb-3"
                            label="CVV"
                            type="password"
                            size="lg"
                            minLength="3"
                            maxLength="3"
                            placeholder="&#9679;&#9679;&#9679;"
                            defaultValue="&#9679;&#9679;&#9679;"
                          />
                        </MDBCol>
                      </MDBRow>

                    <MDBTypography
                      tag="h3"
                      className="mb-3 pt-2 text-center fw-bold text-uppercase"
                    > Shipping 
                    </MDBTypography>

                    <MDBInput
                        className="mb-3"
                        label="Street Address"
                        type="text"
                        size="lg"
                        placeholder=""
                        defaultValue=""
                      />

                      <MDBInput
                        className="mb-3"
                        label="Apt or Suite #"
                        type="text"
                        size="lg"
                        placeholder=""
                        defaultValue=""
                      />

                      <MDBRow>
                        <MDBCol md="6" className="mb-3">
                          <MDBInput
                            className="mb-3"
                            label="City"
                            type="text"
                            size="lg"
                            defaultValue=""
                            placeholder=""
                          />
                        </MDBCol>
                        <MDBCol md="6" className="mb-3">
                          <MDBInput
                            className="mb-3"
                            label="State"
                            type="text"
                            size="lg"
                            placeholder=""
                            defaultValue=""
                          />
                        </MDBCol>
                      </MDBRow>

                    <MDBBtn block size="lg" className="mb-5">
                        Buy now
                      </MDBBtn>

                      <MDBTypography
                        tag="h5"
                        className="fw-bold mb-5"
                        style={{ position: "absolute", bottom: "0" }}
                      >
                        <Link to='/'>
                          <MDBIcon fas icon="angle-left me-2" />
                          Back to shopping
                        </Link>
                      </MDBTypography>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default CartCheckout;