import React from "react";
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview-container.component';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop-actions';

class ShopPage extends React.Component {

    componentDidMount() {
        this.props.fetchCollectionsAsync();
    }

    render() {
        return (
            <div className="shop-page">
                <CollectionsOverviewContainer/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsAsync: ()=> dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);




