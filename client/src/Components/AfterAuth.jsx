import React, { Component } from 'react';

class AfterAuth extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        fetch("/api/users", {
          method: "GET"
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ users: data });
          })
          .catch(console.log);
      }
    
    render(){
        const { users } = this.state
    return(
        <div className="container">
            <h1 className="text-center mt-5">USERS</h1>
        <div className="row">
        {users.length >= 1 ? (
          users.map(user => (
            <div key={user._id} className="product-box">
              
              <div className="card-body">
                <h3 className="card-header">{user.firstName} {user.lastName}</h3>
                <p className="card-subtitle">{user.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-result">No results found...</p>
        )}
      </div>
      </div>

    )
    }
}

export default AfterAuth;