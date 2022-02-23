import React, { useEffect } from "react";
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview-container.component';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop-actions';

const ShopPage = ({ fetchCollectionsStart })=> {
    useEffect(()=> {
        fetchCollectionsStart();
    })
    
    return (
        <div className="shop-page">
            <CollectionsOverviewContainer/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: ()=> dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);




