import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DATABASE_URL = 'http://localhost:1337/api';

const AdminEditProduct = (props) => {
    const { productData, setProductData, getProductData, editProductBtn, setEditProductBtn, setIsLoggedIn, getUserData, getOrderHistory, getAllUsersData, userData  } = props;

    const [searchAdmin, setSearchAdmin] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);

    const nav = useNavigate();

        useEffect(() => {
            getProductData();
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            getUserData();
            // getOrderHistory();
        if(userData.isAdmin === true){
            // getAllUsersData();
        }    
            
        } else {
            setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])

    function selectProductById(singleProduct){
        setSelectProduct(singleProduct);
        setEditImage(singleProduct.image);
        setEditBrand(singleProduct.brand);
        setEditName(singleProduct.name);
        setEditDescription(singleProduct.description);
        setEditPrice(singleProduct.price);
        setEditSale(singleProduct.sale);
        setEditClearance(singleProduct.clearance);
        setEditCatId(singleProduct.category_id)
    }

//Admin - Edit Product State
    const [ editImage, setEditImage ] = useState("");
    const [ editBrand, setEditBrand ] = useState("");
    const [ editName, setEditName ] = useState("");
    const [ editDescription, setEditDescription ] = useState("");
    const [ editPrice, setEditPrice ] = useState("");
    const [ editSale, setEditSale ] = useState("");
    const [ editClearance, setEditClearance ] = useState("");
    const [ editCatId, setEditCatId ] = useState("");

    // function selectProductById(singleProduct){
    //     setSelectProduct(singleProduct);
    // }

    // Admin - Edit/Update Product
    async function editProduct(singleProduct, event){
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        console.log("singleProduct:")
        console.log(singleProduct)
        try {
            const response = await fetch(`${DATABASE_URL}/products/${singleProduct}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    image: editImage,
                    brand: editBrand,
                    name: editName,
                    description: editDescription,
                    price: editPrice,
                    sale: editSale,
                    clearance: editClearance,
                    category_id: editCatId
                })
            
            });
            const transData = await response.json();
                console.log("Edit Product TransData:")
                console.log(transData);

            if (!transData){
                alert("Product was not updated. Please try again. ");
            } else {
                function updateProductData(){
                    let updateArr = [];
                    let updateSearchArr = [];
                    for(let i=0; i<productData.length; i++){
                        let currentProduct = productData[i];
                        if(currentProduct.id !== singleProduct){
                            updateArr.push(currentProduct);
                        } else{
                            updateArr.push(transData);
                        }
                        if(currentProduct.id === singleProduct){
                            updateSearchArr.push(transData);
                        } else {
                        updateSearchArr.push(currentProduct);
                        }                  
                    }
                    setSearchAdmin(updateSearchArr);
                    return updateArr
                };
                const newProductData = updateProductData();
                setProductData(newProductData);
                alert("Product was successfully Updated.");
// reset form
                setEditProductBtn(false);
                setEditImage("");
                setEditBrand("");
                setEditName("");
                setEditDescription("");
                setEditPrice("");
                setEditSale("");
                setEditClearance("");
                setEditCatId("");
                // nav("/profile");
                return getProductData();
            }
        } catch (error){
            console.log(error);
        }
    };  

    return(
        <div >
            <div>
                {   
                    editProductBtn ? (
                        <div style={{ backgroundColor: 'grey' }} className="form">
{/* SEARCHBOX */}
                            <div>
                                <h3>ID selected: { selectProduct.id } </h3> 
                                <input className="searchbox"
                                type="text"
                                placeholder="Search..."
                                onChange={(event) => {
                                setSearchAdmin(
                                    props.productData.filter((singleProduct) => singleProduct.name.toLowerCase().includes(event.target.value.toLowerCase()) 
                                        || singleProduct.brand.toLowerCase().includes(event.target.value.toLowerCase()) 
                                    ));
                                document.getElementById('search').style.visibility = 'visible'
                                }} />
                                <ul id="search">
                                    { searchAdmin.map((singleProduct) => {
                                        return(
                                            <li className="indSearchItem" key={singleProduct.id}>
                                                <button onClick={() => selectProductById(singleProduct) }>
                                                    <h3>{singleProduct.id}</h3>
                                                    <h3>{singleProduct.brand}</h3>
                                                    <img src={singleProduct.image} className="indSearchPic" /> 
                                                    
                                                    <br></br>
                                                </button>
                                                {/* <Link to={`/single/${singleProduct.id}`}> {singleProduct.brand} {singleProduct.name}</Link> */}
                                            </li>
                                    )})}
                                </ul>
                                {/* <h3>Product ID selected: { selectProduct.id }</h3> */}
                            </div>
{/* EDIT/UPDATE FORM */}               
                            <div>           
                                <div className="form__title">Edit/Update Product</div>
                                <form action="" onSubmit={ (event) => editProduct(selectProduct.id, event) }>
                                    <div className="form__input">
                                        <input 
                                            type="text"
                                            value={ editImage }
                                            onChange={(event)=>{
                                                setEditImage(event.target.value);
                                            }}
                                            placeholder={ selectProduct.image }
                                        />
                                    </div>    
                                    <div className="form__input">
                                        <input 
                                            type="text"
                                            value={ editBrand }
                                            onChange={(event)=>{
                                                // setEditBrand(event.target.value);
                                                if(event.target.value === "" ){
                                                    setEditBrand(selectProduct.brand)
                                                } else{ 
                                                    setEditBrand(event.target.value) 
                                                }
                                            }}
                                            
                                            placeholder={ selectProduct.brand } 
                                        />
                                    </div>
                                    <div className="form__input">
                                        <input 
                                            type="text"
                                            value={ editName }
                                                // === "" ? selectProduct.name : editName} 
                                            onChange={(event)=>{
                                                setEditName(event.target.value)
                                            }}
                                            placeholder={ selectProduct.name }
                                        />
                                    </div>
                                    <div className="form__input">
                                        <textarea 
                                            type="text"
                                            rows="4"
                                            cols="75"
                                            value={ editDescription }
                                            // === "" ? selectProduct.name : editDescription} 
                                            onChange={(event)=>{
                                                setEditDescription(event.target.value)
                                            }}
                                            placeholder={ selectProduct.description }
                                        />
                                    </div>
                                    <div className="form__input">
                                        <input 
                                            type="number"
                                            value={ editPrice }
                                            //  === "" ? selectProduct.price : editPrice } 
                                            onChange={(event)=>{
                                                setEditPrice(event.target.value)
                                            }}
                                            placeholder={ selectProduct.price }
                                        />
                                    </div>
                                    <div className="form__input">
                                        <input 
                                            type="text"
                                            value={ editSale }
                                            // === "" ? selectProduct.sale : editSale } 
                                            onChange={(event)=>{
                                                setEditSale(event.target.value)
                                            }}
                                            placeholder={ selectProduct.sale ? "true" : "false" }
                                        />
                                    </div>
                                    <div className="form__input">
                                        <input 
                                            type="text"
                                            value={ editClearance }
                                            // === "" ? selectProduct.clearance : editClearance} 
                                            onChange={(event)=>{
                                                setEditClearance(event.target.value)
                                            }}
                                            placeholder={ selectProduct.clearance ? "true" : "false"  }
                                        />
                                    </div>
                                    <div className="form__input">
                                        <input 
                                            type="number"
                                            value={ editCatId }
                                            // === "" ? selectProduct.category_id : editCatId} 
                                            onChange={(event)=>{
                                                setEditCatId(event.target.value)
                                            }}
                                            placeholder={ selectProduct.category_id }
                                        />
                                    </div>
                                    <button type="submit" className="form__button" >Submit</button>
                                </form>
                            </div> 
                        </div>    
                    ): ""
                }
            </div>
        </div>
    )
}

export default AdminEditProduct;