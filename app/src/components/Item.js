import React from 'react';

function Item(props) {
    return(
      <div className="container">
        <h1>items page</h1>
        <p>{props.item.id}</p>
        <p>{props.item.name}</p>
        <p>{props.item.category}</p>
        <p>{props.item.price}</p>
        <p>{props.item.comments[0].rating} : {props.item.comments[0].comment}</p>
      </div>
    );
}

export default Item;   