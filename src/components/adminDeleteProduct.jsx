import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const DATABASE_URL = 'http://localhost:1337/api';

const AdminDeleteProduct = (props) => {
    const { productData, setProductData, getProductData, setIsLoggedIn, getUserData, getOrderHistory, getAllUsersData, userData, deleteProductBtn, setDeleteProductBtn  } = props;

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
    }

// Admin - Delete Product
    const deleteProduct = async (singleProduct, event) => {
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        console.log("singleProduct:")
        console.log(singleProduct)
        try {
            const response = await fetch(`${DATABASE_URL}/products/${ singleProduct }`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                }
            });
            const transData = await response.json();
                console.log("Delete Product TransData:")
                console.log(transData);

            if (!transData){
                alert("Product was not deleted. Please try again. ");
            } else {
                function updateProductData(){
                    let updateArr = [];
                    let updateSearchArr = [];
                    for(let i=0; i<productData.length; i++){
                        let currentProduct = productData[i];
                        if(currentProduct.id !== singleProduct){
                            updateArr.push(currentProduct);
                            if(searchAdmin.id !== currentProduct.id){
                                updateSearchArr.push(currentProduct);
                            }
                        }else{
                            console.log(transData);
                            // updateArr.push(transData);
                        }
                    }
                    setSearchAdmin(updateSearchArr);
                    return updateArr
                };
                const newProductData = updateProductData();
                setProductData(newProductData);
                alert("Product was successfully Deleted.");
                nav("/profile");
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
                    deleteProductBtn ? (
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
                            </div>
{/* DELETE FORM */}               
                            <div>
                                <span className="form__title">Delete Product</span>
                                <form action="" onSubmit={ (event) => deleteProduct(selectProduct.id, event) } >
                                    <div className="form__button">Are you sure you want to delete {selectProduct.name}? Click Delete to confirm selection. </div>
                                    <button type="submit" className="form__button" >Delete</button>
                                </form>                                
                            </div> 
                        </div>    
                    ): ""
                }
            </div>
        </div>
    )
}


export default AdminDeleteProduct;