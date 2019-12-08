import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

class Loader extends React.Component {
    render() {
        return (
            <div className={classNames('loader', {'opened': this.props.isShowing})}>
                <span className="loader-square">
                    <span className="loader-square-inner">&nbsp;</span>
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isShowing: state.generalStore.numShouldLoadCallsInProgress > 0 || state.generalStore.internalLoadingsInProgress > 0
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
