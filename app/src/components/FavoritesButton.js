import React from 'react';
import { Button } from 'reactstrap';


const FavoritesButton = (props) => {

    if(props.fromFavorites) {
        return (
            <React.Fragment>
            <React.Fragment>
                <Button className="btn btn-danger btn-sm" onClick={() => props.deleteFavorite(props.dealId)} color="outline-danger" outline ><i class="fa fa-heart" /></Button>
            </React.Fragment>
        </React.Fragment>
        )
    } else if (!props.auth.isAuthenticated || props.isFavoritesLoading || props.favoriteserrMess) {
        return (
            <React.Fragment>
            <React.Fragment>
                <Button className="btn btn-outline-danger btn-sm" color="outline-danger" outline disabled={true}><i class="fa fa-heart" /></Button>
            </React.Fragment>
        </React.Fragment>
        )
    } else {
        if (props.favorites != null) {
            if (props.favorites.deals.filter((deal) => deal._id == props.dealId).length) {
                return (
                    <React.Fragment>
                        <React.Fragment>
                            <Button className="btn btn-danger btn-sm" onClick={() => props.deleteFavorite(props.dealId)} color="outline-danger" outline ><i class="fa fa-heart" /></Button>
                        </React.Fragment>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <React.Fragment>
                            <Button className="btn btn-outline-danger btn-sm" onClick={() => props.postFavorite(props.dealId)} color="outline-danger" outline ><i class="fa fa-heart" /></Button>
                        </React.Fragment>
                    </React.Fragment>
                )
            }
        } else {
            return (
                <React.Fragment>
                    <Button className="btn btn-outline-danger btn-sm" onClick={() =>props.postFavorite(props.dealId)} color="outline-danger" outline ><i class="fa fa-heart" /></Button>
                </React.Fragment>
            )
        }

    }
}


export default FavoritesButton;