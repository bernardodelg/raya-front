import React, { useState } from 'react';
import ProductContext from "./Product_Context";

//global store for our app we can create multiple stores if needed

function Store({children}){

 // localStorage.clear();

    // the app's initial state
    const initialState = {
      cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
      cartCount: localStorage.getItem('count') ? localStorage.getItem('count'): 0,
      cartTotal: localStorage.getItem('total') ? localStorage.getItem('total'): 0,
      isLogged: localStorage.getItem('isLogged') ? localStorage.getItem('isLogged'): 0,
      cartDiscount: localStorage.getItem('discount') ? localStorage.getItem('discount') : 0,
      addNew: addNew,
      removePd: removePd,
      removeAllItems:removeAllItems,
      resQty: resQty,
      setDiscount: setDiscount,
      };

      //initiate app state with initialstates
      const [ appstate, setState ] = useState(initialState);
      // pass the state as context's value
    return(
      <ProductContext.Provider value={appstate}>
        {children}
      </ProductContext.Provider>
    );

    function setDiscount(c) {
      let newList = appstate.cart;
      localStorage.setItem('discount',c);

      setState({...appstate, cart:newList, cartCount:getCartCount(), cartTotal:getCartTotal(), cartDiscount: c});
    }

    ////// add new product to cart and update cart count
    function addNew(pd, qty=1){
        let newList = appstate.cart;

        const filtered = newList.filter(i =>{
          return parseInt(i.id) === parseInt(pd.id) &&  parseInt(i.unit_id) === parseInt(pd.unit_id);
        });

      
        if(filtered.length > 0){
          const pos = newList.map(i => { return i.id; }).indexOf(pd.id);

          newList.map(i => { 

            if(parseInt(i.id) === parseInt(pd.id) &&  parseInt(i.unit_id) === parseInt(pd.unit_id)){
              let cant = parseFloat(i.count);
              cant += parseFloat(qty);
              i.count = cant;
              //let price = i.unit_price;
              //i.productSelectedPrice =  cant * price;
              localStorage.setItem('count', i.count);
              return;
            }
            
          });

          localStorage.setItem('cart', JSON.stringify(newList));

        }else{

          let unitPriceNew = 0;
          if (pd.unit_id === 8){
            let decimalQuantity = qty / 1000;
            unitPriceNew = pd.unit_price * decimalQuantity;
          }else{
            unitPriceNew = pd.productSelectedPrice;
          }

          const newItem = {
            count:qty,
            id:pd.id,
            name:pd.name,
            image:pd.image,
            sku:pd.key,
            unit:pd.unit,
            unit_id:pd.unit_id,
            unit_price: pd.unit_price, //precio unitario
            productSelectedPrice: unitPriceNew  //total
          };

          newList.push(newItem);
          localStorage.setItem('cart', JSON.stringify(newList));
       }

        setState({...appstate, cart:newList, cartCount:getCartCount(), cartTotal:getCartTotal()});
      }

      function resQty(pd) {
        let newList = appstate.cart;

        if(pd.count > 1){
          const pos = newList.map(i => { return i.id; }).indexOf(pd.id);
          newList[pos].count -= 1;

          setState({...appstate, cart:newList, cartCount:getCartCount(), cartTotal:getCartTotal()});
        }
      }

      ////// remove product from cart and update cart count
      function removePd(indx){
        const cartList = appstate.cart;
        cartList.splice(indx,1);
        localStorage.setItem('cart', JSON.stringify(cartList));
        setState({...appstate, cart:cartList, cartCount:getCartCount(), cartTotal:getCartTotal()});
      }

      function removeAllItems() {
        const cartList = appstate.cart;
        cartList.splice(0,cartList.length);
        localStorage.setItem('cart', JSON.stringify(cartList));
        setState({...appstate, cart:cartList, cartCount:getCartCount(), cartTotal:getCartTotal()});
        window.location.reload();
      }

      ////// function to get the number of products in cart
      function getCartCount(){
        let cnt = 0;
        const cart = appstate.cart;
        if(cart.length > 0){
          cart.forEach(item => {
           cnt = cnt + parseInt(item.count);
          });
        }

        localStorage.setItem('count', cart.length);
        return cart.length;

      }

      function getCartTotal() {
        let total = 0;
      
        const cart = appstate.cart;
        cart.forEach(item=>{

          if (item.unit_id === 8) {
            let decimalQuantity = item.count / 1000;
            total += item.unit_price * decimalQuantity;
          } else {
            total += item.unit_price * item.count;
          }

        });

        localStorage.setItem('total', total);
        return total;
      }
}

export default Store;
