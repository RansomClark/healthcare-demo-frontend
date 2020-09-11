import React from "react";
import { Card, Button, Spinner } from 'react-bootstrap';


export default class Patients extends React.Component {

constructor(props) {
  super(props);

 this.state = {
    loading: true,
    oops: "",
    patients: [],
  };

}

  async getPatients() {
    let init = {
      method: 'GET',
      headers: new Headers({
      'Content-Type': 'application/json',
      'mode': 'cors',
    }),
  };

  let url2 = `http://localhost:8080/patients/`;
  let response2 = await fetch(url2, init);
  if (!response2.ok) {
    return null;
  }
  else{
  let data2 = await response2.json();
  return data2;
  }
  }

  /**
   * makes a GET all call to the backend, if succesful passes all rooms into state, if unsuccesful displays an error message
   */
  async componentDidMount() {
    await this.getPatients().then((data => {
      if (data) {
        this.setState({patients: data, loading: false})
      }
      else {
        this.setState({oops: 'Something went wrong on our end, we are working on fixing it', loading: false})
      }
    }))

  }

  render() {

    if (this.state.loading) {
      return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
    }

    if (this.state.oops) {
      return <div style={{color: 'red'}}>{this.state.oops}</div>
    }

    else{

    return (
      <div>
        {
        this.state.patients.map(patient =>
            <Card key={patient.id} style={{ width: '18rem', display: 'inline-block'}}>
            <Card.Body>
            <Card.Title>{patient.firstName + " " + patient.lastName}
            </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Age: {patient.age}</Card.Subtitle>
              <Card.Text style={{display: "-webkit-box", WebkitLineClamp: '9', WebkitBoxOrient: 'vertical', height: '10rem'}}>
                {patient.gender}
              </Card.Text>
            </Card.Body>
            <Button variant="secondary" style={{margin: '2%'}} onClick={()=> window.location.replace(`/patients/${patient.id}`)}>Details</Button>
  
          </Card>
            )}
  
            <Button variant="secondary" style={{margin: '2%', width: '7rem', height: '2.5rem'}}
            onClick={()=> window.location.replace(`/patients/create`)}>New Entry</Button>
        </div>
    );
  }
}
}