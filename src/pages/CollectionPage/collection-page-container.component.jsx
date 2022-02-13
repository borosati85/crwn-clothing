import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsLoaded } from '../../redux/shop/shop-selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPageComponent from './collection-page.component'

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectCollectionsLoaded(state)
})

const CollectionsPageOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPageComponent);

export default CollectionsPageOverviewContainer;