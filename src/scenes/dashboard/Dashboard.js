import React from 'react';
import {connect} from 'react-redux';
import FloatActionButton from 'material-ui/FloatingActionButton';


class Dashboard extends React.Component {
    render() {
        return (
            <div>
                Dashboard
                <FloatActionButton/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
