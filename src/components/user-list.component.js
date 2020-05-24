import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => ( // functional react component
  <tr>
    <td>{props.user.username}</td>
    <td>
      <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a> 
      {/* ^^ do this as a button */}
    </td>
  </tr>
)

export default class UsersList extends Component { // class component
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)

    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== id) // only return elements that do not have specified id (_id from MongoDB)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Registered Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              {/* <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th> */}
              <th>Actions</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}