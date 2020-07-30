import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
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