import React, {Component } from 'react';

class CandidateHomeComponent extends Component {
    constructor() {
        super();
        this.state = {  }
    }

    viewProfile=(event)=>{
        this.props.history.push('/ProfileComponent');
    }

    render() { 
        return (<div>
                <h1>Candidate Dashboard</h1>
                <button className="btn btn-primary" onClick={this.viewProfile}>Profile</button>
                <button className="btn btn-primary" style={{marginLeft: "10px"}}>Status</button>
        </div>
        
        );
    }
}
 
export default CandidateHomeComponent;