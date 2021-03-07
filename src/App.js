import React from 'react';
import axios from 'axios';
import StudentCard from './component/studentCard'
import './App.css';

const url = "https://api.hatchways.io/assessment/students"
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: null,
      input: '',
      inputTag: ''

    }
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let response = await axios.get(url)
    //console.log(response.data);
    response.data.students.map((student) => student.tags = [])
    this.setState({ data: response.data.students })

  }

  addTag = (email, tag) => {

    let studentInfo = this.state.data.find((info) => info.email === email)
    let newData = [...this.state.data]
    studentInfo.tags = [...studentInfo.tags, tag]
    newData = [...newData, studentInfo]

    this.setState({ data: newData })
  }



  render() {
    console.log(this.state.inputTag)
    return (
      <div className="App">
        <div className="container">
          <div className="input">

            <input type="text" className="inputText" name="input" placeholder="Search by Name" onInput={(e) => this.setState({ input: e.target.value })} />
            <hr />
            <input type="text" className="inputText" name="inputTag" placeholder="Search by Tag" onInput={(e) => this.setState({ inputTag: e.target.value })} />
            <hr />
          </div>
          {
            this.state.data ?
              <div> {console.log(this.state.inputTag)} {this.state.data.filter((student) => student.tags.includes(this.state.inputTag) || student.firstName.toLowerCase().includes(this.state.input) || student.lastName.toLowerCase().includes(this.state.input) || this.state.inputTag === '' || this.state.input==="").map((student, i) => <StudentCard key={i} {...student} addTag={this.addTag} />)} </div>
              : <div />
          }


        </div>
      </div>
    );
  }
}

export default App;
