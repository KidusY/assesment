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
   
    response.data.students.map((student) => student.tags = [])
    this.setState({ data: response.data.students })

  }

  addTag = (email, tag) => {
    let newData = [...this.state.data]
    console.log(newData);
   newData.filter((info) => info.email === email).map(studentInfo => studentInfo.tags = [...studentInfo.tags, tag]) 
    this.setState({ data: newData })
  }



  render() {
   
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
              <div> {this.state.data.filter((student) => {
                if (this.state.inputTag !== '' && this.state.input === '' && student.tags.includes(this.state.inputTag)){
                 console.log("1")
                  return student
                }
                else if (this.state.input !== '' && this.state.inputTag === '' && (student.firstName.toLowerCase().includes(this.state.input) || student.lastName.toLowerCase().includes(this.state.input)))
                {
                  console.log("2")
                  return student;
                }
                else if (this.state.input === '' && this.state.inputTag === ''){
                  console.log("3")
                  return student
                }
                else if ((this.state.input !== '' && this.state.inputTag !== '')){
                  console.log("4")
                  if ((student.firstName.toLowerCase().includes(this.state.input) || student.lastName.toLowerCase().includes(this.state.input)) && student.tags.includes(this.state.inputTag) ){
                    console.log("5")
                  return student
                  }
                }
                

                }).map((student, i) => <StudentCard key={i} {...student} addTag={this.addTag} />)} </div>
              : <div />
          }


        </div>
      </div>
    );
  }
}

export default App;
