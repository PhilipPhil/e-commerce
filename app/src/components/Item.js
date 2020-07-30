import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: [
        {
          id: 0,
          name: 'Big Sleeping Mask',
          image: 'assets/images/facemask.jpg',
          category: 'Mask',
          label: 'Hot',
          price: '19.99',
          description: 'The mask itself is little more than foam glued to a piece of plastic. It will provide your eyes with total blackness.'
        },
        {
          id: 1,
          name: 'Wax Ear Plugs',
          image: 'assets/images/earplugs.png',
          category: 'Ear Plugs',
          label: '',
          price: '9.99',
          description: 'Comfy Wax Ear Plugs are made from cotton and lanolin. They provide a comfy fit into the ear canal while creating a snug seal against noise or water entry. Ideal for sleep, study, travel or noisy workplaces.'
        }
      ],
    };
  }

  render() {
    const menu = this.state.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 mt-5">
          <Media tag="li">
            <Media left middle>
              <Media object src={dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading>{dish.name}</Media>
              <p>{dish.description}</p>
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