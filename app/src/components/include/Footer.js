import React from 'react';
import { Link } from 'react-router-dom';

const FooterComponent = (props) => {
    return (
        <div className="footer">

            <div className="top-footer">
                <div className="container">
                    <div className="row justify-content-center top-footer">

                        <div className="col-12 col-md-7 mt-3">
                            <h5>Deal Alchemist</h5>
                            <p>
                                If you have questions or would like us to have your business on our website please contact us!
                        </p>
                        </div>

                        <div className="col-auto mt-3">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><Link exact to='/'>Deals</Link></li>
                                <li><Link to='/about'>About</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-3 align-self-center">
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/"><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                            <Link to='/contact' className="btn btn-social-icon btn-reddit"><i className="fa fa-envelope-o"></i></Link>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bottom-footer">
                <div className="container">
                    <div className="row justify-content-center bottom-footer">
                        <div className="col-auto align-self-center">
                            <p>&copy; COPYRIGHT DEAL ALCHEMIST {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Footer(props) {
    return (

        <FooterComponent />

    )
}

export default Footer;
