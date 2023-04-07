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
    const [cartData, setCartData] = useState([]);
    const [deletedItem, setDeletedItem] = useState(0);
    const [ccNum, setCCNum] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [exp, setExp] = useState("");
    const [cvv, setCvv] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    const nav = useNavigate();
    let cartTotal = 0;

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
            
        

        setDeletedItem(deleted +1);


            
        } catch (error) {
            console.log(error);
        }
    };
    
    // Adding 1 on + click to increase quantity state. 
    async function addQuantity(event) {
        try {
            // console.log("Minus button clicked")
            // console.log(event.target.value)
            // console.log("ETV type of", typeof event.target.value)
            // console.log(typeof event.target.parentNode.getAttribute("value"))

            
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
                    qty: parseInt(event.target.value) + 1,
                    price: currentItem[0].price
                })
            })
            const translatedData = await response.json();
            // console.log("Line 100 cart", translatedData)
            if (translatedData.qty) {
                const currentItem = cartData.filter((item) => item.id === parseInt(event.target.parentNode.getAttribute("value")))
                currentItem[0].qty = parseInt(event.target.value) + 1 
                const newCart = cartData.filter((item) => item.id !== parseInt(event.target.parentNode.getAttribute("value")))
                setCartData([...newCart, currentItem[0]])
            }

        
        } catch (error) {
            throw error;
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
    
    
    // POST payment data
    async function postPaymentData (event) {
        event.preventDefault();
        try {
            const response = await fetch(`${DATABASE_URL}/payment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    user_id: props.userData.id,
                    cardnum: ccNum,
                    exp: exp,
                    cvv: cvv,
                    name: nameOnCard,
                    address: address,
                    city: city,
                    state: state,
                    zip_code: zipcode
                })
            });
            const translatedData = await response.json();

            if (translatedData) {
                setCCNum("");
                setNameOnCard("");
                setCvv("");
                setExp("");
                setAddress("");
                setState("");
                setCity("");   
                setZipcode("");
                alert("Thank you for submitting your order.");
                nav('/');
            };

        } catch (error) {
            throw error;
        };
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
                        const itemTotal = singleItem.price * singleItem.qty 
                        cartTotal += itemTotal
                        return (
                    <div className="d-flex align-items-center mb-5" key={idx}>
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          src={singleItem.image}
                          fluid
                          style={{ width: "5vw" }}
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
                                value={singleItem.qty}
                                type="number"
                            //   onChange={quantityAddOrMinus}
                            />
                            <button className="plus" value={singleItem.qty} onClick={addQuantity}></button>
                          </div>

                          <p className="fw-bold mb-0 me-5 pe-3"> = ${itemTotal.toFixed(2)}</p>
                
                        </div>
                      </div>
                    </div>
                        ) 
                    }) : <h1> No Items in your cart. </h1>
                }
                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }}
                    />
                    <div className="d-flex justify-content-between px-x">
                      <p className="fw-bold">Subtotal:</p>
                      <p className="fw-bold">${cartTotal.toFixed(2)}</p>
                    </div>
                    <div
                      className="d-flex justify-content-between p-2 mb-2"
                      style={{ backgroundColor: "#e1f5fe" }}
                    >
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        Total:
                      </MDBTypography>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        Tax 8%
                      </MDBTypography>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        ${(cartTotal * 1.08).toFixed(2)}
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

                    <form className="mb-3" onSubmit={postPaymentData}>
                      <MDBInput
                        className="mb-3"
                        label="Card number"
                        type="text"
                        size="lg"
                        value={ccNum}
                        onChange={(event) => setCCNum(event.target.value) }
                      />

                      <MDBInput
                        className="mb-3"
                        label="Name on card"
                        type="text"
                        size="lg"
                        value={nameOnCard}
                        onChange={(event) => setNameOnCard(event.target.value)}
                      />

                      <MDBRow>
                        <MDBCol md="6" className="mb-3">
                          <MDBInput
                            className="mb-3"
                            label="Expiration"
                            type="text"
                            size="lg"
                            minLength="4"
                            maxLength="7"
                            placeholder="042023"
                            value={exp}
                            onChange={(event) => setExp(event.target.value)}
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
                            value={cvv}
                            onChange={(event) => setCvv(event.target.value)}
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
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                      />

                      <MDBInput
                        className="mb-3"
                        label="City"
                        type="text"
                        size="lg"
                        placeholder=""
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                      />

                      <MDBRow>
                        <MDBCol md="6" className="mb-3">
                          <MDBInput
                            className="mb-3"
                            label="State"
                            type="text"
                            size="lg"
                            placeholder=""
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                          />
                        </MDBCol>
                        <MDBCol md="6" className="mb-3">
                          <MDBInput
                            className="mb-3"
                            label="Zip"
                            type="text"
                            size="lg"
                            placeholder=""
                            value={zipcode}
                            onChange={(event) => setZipcode(event.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>

                    <MDBBtn block size="lg" className="mb-5" type="submit">
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