const Cart = () => {

    return (
        <div className="homepage">
            <p>1 - Cart</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <div>
                <form class="form">
                    <div class="checkout-method">
                        <button type="button" class="button">
                            <i class="ri-bank-card-line"></i>
                        </button>
                        <button type="button" class="button button--inactive">
                            <i class="ri-paypal-fill"></i>
                        </button>
                    </div>
                    <div class="checkout-information">
                        <div class="input-group">
                            <label for="name">Name on card</label>
                            <input type="text" id="name" placeholder="Enter name" />
                        </div>
                        <div class="input-group">
                            <label for="number">Card number</label>
                            <input type="text" id="number" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div class="horizontal-grid">
                            <div class="input-group">
                                <label for="date">Expiration date</label>
                                <input type="text" id="date" placeholder="12/27" />
                            </div>
                            <div class="input-group">
                                <label for="cvv">CVV</label>
                                <input type="number" id="cvv" placeholder="CVV" />
                            </div>
                        </div>
                    </div>
                    <button class="button button--checkout">Checkout</button>
                </form>
            </div>
        </div>
    )
}

export default Cart;