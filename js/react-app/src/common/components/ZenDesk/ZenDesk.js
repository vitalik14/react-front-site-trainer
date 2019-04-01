import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class ZenDesk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zopim: false,
      interval: null
    };

    this.checkVarZopim = this.checkVarZopim.bind(this);
  }

  componentDidMount() {
    if (!this.state.zopim) {
      let interval = setInterval(this.checkVarZopim, 1000);
      this.setState({ interval });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  checkVarZopim() {
    const {
      currentUser: { name, id, email }
    } = this.props;

    if (window.$zopim) {
      this.setState({ zopim: true });
      clearInterval(this.state.interval);

      if (id) {
        $zopim(function() {
            $zopim.livechat.setName(name);
            $zopim.livechat.setEmail(email);
            $zopim.livechat.addTags("KdNr.: " + id);
        });
      }
    }
  }

  render() {
    const style = {
      display: "none"
    };
    
    return <div style={style}>test</div>;
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

ZenDesk.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ZenDesk);
