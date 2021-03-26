import React, {Component} from "react";
import { fetchPost } from "../Utils/Constants";
import Swal from 'sweetalert';
import MetaTags from 'react-meta-tags';
import Modal from 'react-responsive-modal';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {Animated} from "react-animated-css";
import Loader from '../components/Loader';

class Seller extends Component{

    constructor(props) {
        super(props);
        this.state = { message: '', name: '', phone: '',user_id : null,open:false,show:false , loading:false};
    }

    componentDidMount(){

        this.setState({loading:true});
        if (this.props.match.params.seller_id !== undefined) {
            const formData = new FormData();
            formData.append('tok', this.props.match.params.seller_id);

            fetchPost('getSellerData', formData)
            .then(response => {
     
                if (response.error) {
                    Swal({icon: 'error',text: response.message,type:'error', timer:2000});
                } else {
                    this.setState({ message: response.message, name: response.name, phone: response.phone, user_id: response.user_id});
                    localStorage.setItem('usrI', response.user_id);
                }

                this.setState({loading:false});
            }).catch(error => {
                console.log(error);
                this.setState({loading:false});
            });
        }
    }

    componentWillUnmount(){
        localStorage.removeItem('usrI');
    }

     onOpenModal() {
        this.setState({ open:true});
    }

     onCloseModal() {
        this.setState({ open:false});
    }

     toggleView(){

        let state = !this.state.show;
        this.setState({ show: state});
        
    };


    render(){

        return(
            <>
            {this.state.loading ?   <Loader property={this.state.loading} /> 
            :<>
            <section className="naturalInner">
                <MetaTags>
                    <meta name="description" content={"Hola soy " + this.state.name+  " Cel. "+ this.state.phone} />
                    
                </MetaTags>
                <div className="container">
                    <div className="row">
                        <div className="headingOther">
                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="cart-back table-responsive" style={{height:"433px",textAlign:"center",position:"relative"}}>
                            <div className="text-seller">
                                <p>{this.state.message}</p>
                                <p>Vendedor: {this.state.name}</p>
                                <p>Teléfono: {this.state.phone}</p>

                                <div className="cartBtn" style={{textAlign:"inherit"}}>
                                    <button className="btn btnTheme" onClick={ () => this.onOpenModal() }>Registrate</button>
                                </div>
                            </div>

                            <br/>
                            <br/>
            
                        </div>
                        
                    </div>
                    
                </div>
            </section>


            <Modal center open={this.state.open} onClose={() => this.onCloseModal()} classNames={{modal:'login-form'}}>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.show} style={{display: this.state.show ? 'block' : 'none'}}>
                    <LoginForm toggle={() => this.toggleView()} onClose={() => this.onCloseModal} />
                </Animated>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!this.state.show} style={{display: this.state.show ? 'none' : 'block'}}>
                    <RegisterForm toggle={() => this.toggleView()} onClose={() => this.onCloseModal()}/>
                </Animated>
            </Modal>
            </>}
            </>
        );
    }
}

export default Seller;