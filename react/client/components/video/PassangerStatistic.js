import React from 'react';
import PropTypes from 'prop-types';
import {Table, Row, Input, Button} from 'react-materialize';


class PassangerStatistic extends React.Component {
  constructor() {
    super();

    this.state = {
      adults: 0,
      children: 0,
      certificates: 0,
      checkbox: '',
      comment: '',
    };
  }

  render() {
    const {adults, children, certificates} = this.state;
    return (
      <div className="passangersStatisticBlock1">
        <div className="passangersStatisticBlock2">
          <h5 className="container">Number of Passangers</h5>
          <Table centered bordered>

            <thead>
            <tr>
              <th>Adults</th>
              <th>Children</th>
              <th>Certificates</th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <td>{adults}</td>
              <td>{children}</td>
              <td>{certificates}</td>
            </tr>
            </tbody>

          </Table>

          <div className="videoComment">
            <Input type='textarea' placeholder="comment" id="videoComment"/>
          </div>

          <Row>
            <Input type='checkbox' label='Help'/>
            <Input type='checkbox' label='Not sure'/>
            <Input type='checkbox' label='Skip at exit'/>
          </Row>


          <div>
            <Button>save</Button>
            <Button>next video</Button>
          </div>
        </div>
      </div>
    );
  }

};

// PassangerStatistic.propTypes = {
//   adults: PropTypes.number,
//   children: PropTypes.number,
//   certificates: PropTypes.number,
//   videoId: PropTypes.string.isRequired,
//   onSave: PropTypes.func.isRequired,
//   onNext: PropTypes.func.isRequired,
// };


export default PassangerStatistic;
