import React, {Component, useContext} from 'react';
import Modal from "react-responsive-modal";
import {BASE_URL} from "../Utils/Constants";
import ProductContext from "../Context/Product_Context";
import Swal from 'sweetalert';


function AddToCart (props) {
    const stt = useContext(ProductContext);

    const user = JSON.parse(localStorage.getItem('user'));

    if (user === null){
        return (
            <a href="#" onClick={() => {
                Swal({icon: 'warning', text: 'Debes de iniciar sesión para poder hacer el pedido' ,type:'warning', timer:2000});
                props.closeModal();
            }} className="btn btnTheme">Agregar al carrito</a>
        );
    }else {

        if(props.qty === "" || props.product.unit === ""){
            return (
                <a href="#" onClick={()=> {
                    Swal({icon: 'warning', text: 'Para agregar productos al carrito es necesario seleccionar una unidad de medida y agregar una cantidad' ,type:'warning', timer:2000});
                }}  className="btn btnTheme">Agregar al carrito</a>
            );
        }else{

            if (props.qty < 50 && parseInt(props.product.unit_id) === 8){
                return (
                    <a href="#" onClick={() => {
                        Swal({icon: 'warning', text: 'Compra mínima de 50 grs' ,type:'warning', timer:2000});
                    }} className="btn btnTheme">Agregar al carrito</a>
                );
            }else{

                
               return (
                    <a href="#" onClick={()=> {
                        stt.addNew(props.product,props.qty);
                        Swal({icon: 'success', text: 'Producto agregado' ,type:'success', timer:2000});
                        props.closeModal();
                    }} className="btn btnTheme">Agregar al carrito</a>
                ); 
            }
           
        }
    }
}

class ModalUnits extends Component {

    
    state = {
        open: false,
        optionChecked:0,
        qty:"",
        //price:0,
        //unitPriceSelected:0,
        unitName:"",
        unitID:0,
        keyPorduct:"",
        placeholder:""
        
    };

    componentDidMount(){
          
        this.setState({qty:""});
        const product = this.props.product.units;
        if(product.length > 0){            
            this.setState({
                // price: 0,
                qty:"",
                // unitPriceSelected: product[0].price,
                unitName: product[0].name,
                unitID: product[0].unit_id,
                keyPorduct:product[0].product_key,
                placeholder: product[0].unit_id === 8 ? 'Mínimo 50 grs' : '',
            });
        }
    }

    onOpenModal = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            Swal({icon: 'warning', text: 'Debes de iniciar sesión para poder agregar productos al carrito' ,type:'warning', timer:2000});
        }else{
            this.setState({ open: true });
        }
        
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onUnitChanged = (e) => {

        const filtered = this.props.product.units.filter(i => {
            return parseInt(i.unit_id) ===  parseInt(e.currentTarget.value);
        });

        this.setState({
            //price: 0,
            qty:"",
            //unitPriceSelected: filtered[0].price,
            unitName: filtered[0].name,
            unitID: filtered[0].unit_id,
            keyPorduct:filtered[0].product_key,
            placeholder: filtered[0].unit_id === 8 ? 'Mínimo 50 grs' : ''
        });
    };

    onQtyChanged = (e) => {
        //console.log(e.currentTarget.value);
        this.setState({qty: e.currentTarget.value});
    };

    render() {
        const { open } = this.state;

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          });

          const productObject = {
            id: this.props.product.id,
            name: this.props.product.name,
            image: this.props.product.image,
            key: this.state.keyPorduct,
            unit: this.state.unitName,
            unit_id: this.state.unitID,
            // unit_price: this.state.unitPriceSelected,
            // productSelectedPrice:this.state.price

          };

        const user = JSON.parse(localStorage.getItem('user'));
        // const priceVisible = formatter.format(this.props.product.price)+" / "+ this.props.product.unitNameSelected;

        return (
            <div >
                <div className="price-modal">

                    <div className={this.props.type === 1 ? "extrainput showPrice" : "hidePrice"} >
                        {/* {user === null ? "" : priceVisible} */}
                    </div>
                    <button type="button" className="add-cart" onClick={this.onOpenModal}>
                        <i className={this.props.type === 1 ? "fas fa-shopping-cart" : "fas fa-info-circle"}/>
                    </button>
                </div>

                <Modal center open={open} onClose={this.onCloseModal} classNames={{ modal: 'login-form' }} >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <img className="img-responsive" src={BASE_URL + this.props.product.image} alt="a" />
                            </div>
                            <div className="col-md-9">
                                <h2>{this.props.product.name}</h2>
                                <p>{this.props.product.description}</p>
                                <div className="unitsData">
                                <ul className="listUnits" style={{listStyle:"none"}}>
                                    {   
                                        this.props.product.units.map((unit,index) =>
                                            <li key={index}>
                                                {unit.name}
                                                <br />
                                                <input type="radio" name="site_name" 
                                                    value={unit.unit_id} 
                                                    defaultChecked={index === 0 ? true : false}
                                                    onChange={this.onUnitChanged} />
                                            </li>
                                        )
                                    }
                                </ul>
                                </div>
                                <label>Cantidad: </label>
                                <div className="extrainput">
                                    <input type="number" name="quantity" value={this.state.qty} onChange={this.onQtyChanged} placeholder={this.state.placeholder}/>
                                </div>
                                <br />
                                <br />
                                
                                {/* <label>Precio: {formatter.format(this.state.price)}</label> */}
                                
                                <div className="cartBtn" style={{textAlign:'left'}}>
                                    <AddToCart product={productObject} qty={this.state.qty}  closeModal={this.onCloseModal}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
};

export default ModalUnits;