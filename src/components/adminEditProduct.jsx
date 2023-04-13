import { useState, useEffect } from 'react';

const DATABASE_URL = 'https://gutterballs-back.onrender.com/api';

const AdminEditProduct = (props) => {
    const { productData, setProductData, getProductData, editProductBtn, setEditProductBtn, setIsLoggedIn, getUserData, userData  } = props;

    const [searchAdmin, setSearchAdmin] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);

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
                return getProductData();
            }
        } catch (error){
            console.log(error);
        }
    };  

    return(
        <div >
            <div className='del-prod-form-cont'>
                {   
                    editProductBtn ? (
                        <div className="del-prod-form" onMouseLeave={() => document.getElementsByClassName('adm-search')[0].style.visibility = 'hidden'}>
{/* SEARCHBOX */}
                            <div className='adm-del'>
                                <h5>Choose an item to edit/update:</h5>
                                <div> 
                                    <input className="adm-searchbox"
                                    type="search"
                                    placeholder="Search..."
                                    onChange={(event) => {
                                    setSearchAdmin(
                                        props.productData.filter((singleProduct) => singleProduct.name.toLowerCase().includes(event.target.value.toLowerCase()) 
                                            || singleProduct.brand.toLowerCase().includes(event.target.value.toLowerCase()) 
                                        ));
                                    document.getElementsByClassName('adm-search')[0].style.visibility = 'visible'
                                    }} />
                                    <ul className="adm-search">
                                        { searchAdmin.map((singleProduct) => {
                                            return(
                                                <li className="adm-indSearchItem" key={singleProduct.id}>
                                                    <button onClick={() => { selectProductById(singleProduct), document.getElementsByClassName('adm-search')[0].style.visibility = 'hidden' }} className='admin-upd-sb-res'>
                                                            {singleProduct.id}
                                                            {' '}
                                                            {singleProduct.brand}
                                                            {' '}
                                                            {singleProduct.name}
                                                            <img src={singleProduct.image} className="adm-indSearchPic" /> 
                                                        </button>
                                                </li>
                                        )})}
                                    </ul>
                                </div>
                            </div>
{/* EDIT/UPDATE FORM */}               
                            <div>           
                                <div className="form__title">
                                    Editing/Updating:  {selectProduct.brand}{' '}{selectProduct.name} 
                                </div>
                                <hr />
                                <div className='e-u-form'>
                                    <form action="" onSubmit={ (event) => editProduct(selectProduct.id, event) } className=''>
                                    <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                        Image: (I.e. https://www.stormbowling.com/medias/ABSOLUTE_00000.png)</label>
                                        <div className="e-u-form-input">
                                            <input 
                                                type="text"
                                                value={ editImage }
                                                onChange={(event)=>{
                                                    setEditImage(event.target.value);
                                                }}
                                                placeholder={ selectProduct.image }
                                            />
                                        </div>
                                        <hr />
                                        <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                            Brand:</label>
                                        <div className="e-u-form-input">
                                            <input 
                                                type="text"
                                                value={ editBrand }
                                                onChange={(event)=>{
                                                    if(event.target.value === "" ){
                                                        setEditBrand(selectProduct.brand)
                                                    } else{ 
                                                        setEditBrand(event.target.value) 
                                                    }
                                                }}
                                                placeholder={ selectProduct.brand } 
                                            />
                                        </div>
                                        <hr />
                                        <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                            Name:</label>
                                        <div className="e-u-form-input">
                                            <input 
                                                type="text"
                                                value={ editName }
                                                onChange={(event)=>{
                                                    setEditName(event.target.value)
                                                }}
                                                placeholder={ selectProduct.name }
                                            />
                                        </div>
                                        <hr />
                                        <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                            Description:</label>
                                        <div className="e-u-form-input">
                                            <textarea 
                                                type="text"
                                                rows="4"
                                                cols="75"
                                                value={ editDescription }
                                                onChange={(event)=>{
                                                    setEditDescription(event.target.value)
                                                }}
                                                placeholder={ selectProduct.description }
                                            />
                                        </div>
                                        <hr />
                                        <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                            Price: (No symbols, dollars.cents)</label>
                                        <div className="e-u-form-input">
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
                                        <hr />
                                        <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                            On Sale? (True = Yes, False = No)</label>
                                        <div className="e-u-form-input">
                                            <input 
                                                type="text"
                                                value={ editSale }
                                                onChange={(event)=>{
                                                    setEditSale(event.target.value)
                                                }}
                                                placeholder={ selectProduct.sale ? "true" : "false" }
                                            />
                                        </div>
                                        <hr />
                                        <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                            Clearance? (True = Yes, False = No)</label>
                                        <div className="e-u-form-input">
                                            <input 
                                                type="text"
                                                value={ editClearance }
                                                onChange={(event)=>{
                                                    setEditClearance(event.target.value)
                                                }}
                                                placeholder={ selectProduct.clearance ? "true" : "false"  }
                                            />
                                        </div>
                                        <hr />
                                        <label htmlFor='e-u-form-input' className='e-u-form-label'>
                                            Category ID: (1 = Balls, 2 = Bags, 3 = Shoes, 4 = Accessories)</label>
                                        <div className="e-u-form-input">
                                            <input 
                                                type="number"
                                                value={ editCatId }
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
                        </div>    
                    ): ""
                }
            </div>
        </div>
    )
}

export default AdminEditProduct;