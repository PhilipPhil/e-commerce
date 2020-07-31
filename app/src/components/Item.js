import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { ITEMS } from '../shared/items';


class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: ITEMS
    };
  }

  render() {
    const menu = this.state.items.map((item) => {
      return (
        <div key={item.id} className="col-12 mt-5">
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
          <Media list>
            {menu}
          </Media>
        </div>
      </div>
    );
  }
}

export default Item;