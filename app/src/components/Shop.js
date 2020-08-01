import React, { Component } from 'react';
import { Media } from 'reactstrap';


class Shop extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const menu = this.props.items.map((item) => {
      return (
        <div className="row" key={item.id} className="col-12 mt-5">
          <Media tag="li">
            <Media left middle>
              <Media object src={item.image} alt={item.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading>{item.name}</Media>
              <p>{item.description}</p>
            </Media>
          </Media>
        </div>
      );
    });

    return (
      <div className="container">

        <div className="row">
          <div className="col">
            <h4>Shop</h4>
            <p>This will be the Shop page</p>
          </div>
        </div>

          {menu}

      </div>
    );
  }
}

export default Shop;