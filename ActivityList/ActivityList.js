import React from 'react';
import Form from 'react-bootstrap/Form';

const {useState} = React;

function Child(props) {
  const {caption, counter} = props;
  const {lines, setLines} = props.pstate;
  
  return (
      <div>
    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>{caption} {counter}</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
    <Form.Group controlId="formGridMeetingPoint">
        <Form.Label>{lines}{setLines}</Form.Label>
        <Form.Control defaultValue={this.state.meeting_point} required onBlur={this.handleChange} name="meeting_point" type="text" placeholder="start entering the location" />
    </Form.Group>
    </div>
  );
  /* return <button onClick={() => {
    setLines([...lines, lines.length]);
  }}> 
    {caption}
  </button>; */
}

export function Parent(props) {
  const [lines, setLines] = useState([0]);  
  return lines.map(m => <Child key={m} caption={`Click ${m}`} pstate={{lines, setLines}}/>);
}
