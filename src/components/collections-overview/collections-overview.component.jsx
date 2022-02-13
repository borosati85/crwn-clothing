import React from "react";
import PreviewCollection from '../../components/preview-collection/preview-collection.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop-selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
        {collections.map(({id, ...otherCollectionProps}) => <PreviewCollection key={id} {...otherCollectionProps} />)}            
    </div>     
)


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
