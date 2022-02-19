import React from "react";
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview-container.component';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop-actions';

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
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
    fetchCollectionsStart: ()=> dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);




