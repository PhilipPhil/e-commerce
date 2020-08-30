import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'


const CarouselComponent = () => {
  return(<Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="assets/images/discover.jpeg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Discover</h3>
        <p>Find the best deals in your area.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="assets/images/community.jpg"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Community</h3>
        <p>Connecting patrons to local businesses.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="assets/images/join.jpg"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Join</h3>
        <p>Grow with the deal alchemist community.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>)
}


const HomeBodyComponent = () => {
  return(
    <div class="container marketing py-4">
    <div class="row justify-content-center">
      <div class="col-lg-4 text-center">
        <img class="mb-2" src="assets/images/logo.png" alt="Generic placeholder image" width="140" height="140" />
        <h2>Who</h2>
        <p>Deal Alchemist is based in Vancouver, formed through the love of a great bargain and helping local businesses.</p>
      </div>
      <div class="col-lg-4 text-center">
        <img class="mb-2" src="assets/images/trophy.png" alt="Generic placeholder image" width="140" height="140" />
        <h2>Goal</h2>
        <p>We bring top deals to patrons and help promote local businesses through customizable campaigns that increase their customer outreach.</p>
      </div>
      <div class="col-lg-4 text-center">
        <img class="mb-2" src="assets/images/flexed-biceps.png" alt="Generic placeholder image" width="140" height="140" />
        <h2>Try</h2>
        <p>Sign up for free and start enjoying the best deals in your area. If you are a business and you would like to promote your deals, please contact us.</p>
      </div>
    </div>

    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-12 align-self-center">
        <h2 class="featurette-heading text-center">First featurette heading. <span class="text-muted">It'll blow your mind.</span></h2>
        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
      </div>
    </div>

    

  </div>
  )
}



class Home extends Component {

  constructor(props) {
    super(props);
  }

  
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  render(){
    return(

      <React.Fragment>

        <CarouselComponent />

        <HomeBodyComponent />

      </React.Fragment>
    );
  }

}

export default Home;   