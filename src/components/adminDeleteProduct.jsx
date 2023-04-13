import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const DATABASE_URL = 'https://gutterballs-back.onrender.com/api';

const AdminDeleteProduct = (props) => {
    const { productData, setProductData, getProductData, setIsLoggedIn, getUserData, userData, deleteProductBtn, } = props;

    const [searchAdmin, setSearchAdmin] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);

    const nav = useNavigate();

        useEffect(() => {
            getProductData();
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            getUserData();
        if(userData.isAdmin === true){
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
            <div className='del-prod-form-cont'>
                {   
                    deleteProductBtn ? (
                        <div className="del-prod-form" onMouseLeave={() => document.getElementsByClassName('adm-search')[0].style.visibility = 'hidden'}>
{/* SEARCHBOX */}
                            <div className='adm-del'>
                                <h5>Choose an item to delete:</h5> 
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
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
{/* DELETE FORM */}         
                            <div>
                                {selectProduct.brand && 
                                <form action="" onSubmit={ (event) => deleteProduct(selectProduct.id, event) } className='del-form'>
                                    <div className="">Are you sure you want to delete
                                        {' '}
                                        {selectProduct.brand}
                                        {' '}
                                        {selectProduct.name}?
                                    </div>
                                    <button
                                    type="submit" className="atc-btn del-btn" >Delete</button>
                                </form>
                                }
                            </div> 
                        </div>    
                    ): ""
                }
            </div>
        </div>
    )
}


export default AdminDeleteProduct;