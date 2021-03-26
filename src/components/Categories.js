import React from 'react';
import { BASE_URL } from "../Utils/Constants";

const Categories = ({ filterCategory, categorieSelected, categories}) => {

  // const categories = [
  //   {id:0, name:'Todos', image:'/images/all-icon-01.png'},
  //   {id:1, name:'Fruta', image:'/images/all-icon-01.png'},
  //   {id:2, name:'Verdura', image:'/images/all-icon-02.png'},
  //   {id:3, name:'Cereales, semillas y secos', image:'/images/all-icon-03.png'},
  //   {id:4, name:'Cremería', image:'/images/all-icon-05.png'},
  //   {id:5, name:'Carne', image:'/images/all-icon-07.png'},
  //   {id:6, name:'Pollo', image:'/images/Pollo.png'},
  //   {id:7, name:'Abarrotes', image:'/images/all-icon-09.png'},
  //   {id:8, name:'Varios', image:'/images/all-icon-10.png'},
  //   {id:9, name:'Pescado', image:'/images/Pescado.png'},
  //   {id:11, name:'Otates', image:'/images/Logo-Otates.png'},
  //   {id:12, name:'Retto', image:'/images/Logo-Retto.png'},
  //   {id:10, name:'Favoritos', image:'/images/corazon.png'}
  // ];

  const rows = [];

  let fontSize = "17px";

  var mql = window.matchMedia("(orientation: portrait)");
  
  if(mql.matches) {  // Portrait orientation
    if(window.screen.height < 900){
      fontSize = "12px";
    }
  } else {  // Landscape orientation
    if(window.screen.height < 500){
      fontSize = "12px";
    }
  }

  let completeRow = categories.length % 5;
  completeRow = completeRow - 5;

  for(let i = 0; i < completeRow * -1; i++){
    rows.push({id: 99 + i});
  }

  return (
    <section className="naturalInner" >
      <div className="container">
        <div className="row">
          <div className="headingOther">
            <h2>NUESTROS <span>PRODUCTOS</span></h2>
          </div>
        </div>
        <div className="row">
          <div className="contentnatural" style={{textAlign: "center"}}>
            <ul >
              {
                categories.map((category,index) => {
            
                  return (
                    <li key={index} className="wow fadeInLeft"
                      onClick={() => filterCategory(category.id)}>
                      <figure style={{ marginLeft: "10px", width: "50px", height: "50px"}}>
                        <img className="img-responsive" src={BASE_URL + category.image} alt="" />
                      </figure>
                      <br/>

                      <article><p style={{fontSize:category.name !== "Cereales, semillas y secos" ? "17px"  :fontSize}}>{category.name} </p></article>
                      <hr className={parseInt(categorieSelected) === category.id ? "product-selected" : "wow fadeInLeft"}
                        style={{ marginLeft: "10px"}} />
                    </li>
                  )
                })
              }


              {
                rows.map((row,index) => {
                  return (
                    <li key={row.id} className="wow fadeInLeft" />
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Categories;
