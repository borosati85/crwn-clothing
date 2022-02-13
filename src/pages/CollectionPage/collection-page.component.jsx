import React from "react";
import "./collection-page.styles.scss";
import { selectCollections } from "../../redux/shop/shop-selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({ collections }) => {
    const { collectionID } = useParams();
    const collection = collections[collectionID];
    const items = collection.items;

    return (
        <div className="collection-page">
            <h2 className="collection-title">{collection.title}</h2>
            <div className="collection-items">
                {
                    items.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})


export default connect(mapStateToProps)(CollectionPage);

