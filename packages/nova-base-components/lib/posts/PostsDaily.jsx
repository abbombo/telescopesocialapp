import Telescope from "meteor/nova:lib";
import React, { PropTypes, Component } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import { withRouter } from 'react-router'
import { FormattedMessage } from "react-intl";

class PostsDaily extends Component{

  constructor(props) {
	//  console.log("post daily called",props);
    super(props);
    this.loadMoreDays = this.loadMoreDays.bind(this);
    this.state = {days: props.days};
    const query = _.clone(props.router.location.query);

    var itemPriceCountry = {};
    if (typeof window === 'object') {
      if(query.hasOwnProperty("country")){
        if(query.country.length > 0){
          window.localStorage.setItem("userCountry",query.country);
        }  
      }
    }       
  }


  componentWillReceiveProps(props){
     const query = _.clone(props.router.location.query);
      if (typeof window === 'object') {
      if(query.hasOwnProperty("country")){
        if(query.country.length > 0){
          window.localStorage.setItem("userCountry",query.country);
        }  
      }
    } 
  }

  // for a number of days "n" return dates object for the past n days
  getLastNDates(n) {
    return _.range(n).map(
      i => moment().subtract(i, 'days').startOf('day').toDate()
    );
  }

  loadMoreDays(e) {
    e.preventDefault();
    this.setState({
      days: this.state.days + this.props.increment
    });
  }

  render() {
    const locQuery = _.clone(this.props.router.location.query);
    var userLocation = locQuery.country ? locQuery.country :'';
  
    return (
      <div className="posts-daily">
        <Telescope.components.PostsListHeader />
        {this.getLastNDates(this.state.days).map((date, index) => <Telescope.components.PostsDay key={index} date={date} userCountry={userLocation} locQuery={locQuery} number={index}/>)}
        <button className="posts-load-more" onClick={this.loadMoreDays}><FormattedMessage id="posts.load_more_days"/></button>
      </div>
    )
  }
}

PostsDaily.propTypes = {
  days: React.PropTypes.number,
  increment: React.PropTypes.number
};

PostsDaily.defaultProps = {
  days: 5,
  increment: 5
};

module.exports = withRouter(PostsDaily)   ;
export default withRouter(PostsDaily);
