import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './button.css';

export default function GameSettingBtn(props) {
  let timer = null;
  //悔棋
  const handleRetreat = function () {
    clearInterval(timer);
    if (props.recordLength > 3) {
      props.onRetreat(-2);
    }
  };
  const handleReset = function () {
    clearInterval(timer);
    props.onReset();
  };
  const handleMode = function () {
    timer = setInterval(function () {
      if (props.gameOver) clearInterval(timer);
      props.onAddRandom();
    }, 1000);
  };

  return (
    <Row>
      <Col xs lg="2"></Col>
      <Col md="auto">
        <Button className="mr-2" size="lg" variant="secondary">
          score
          <br />
          {props.score}
        </Button>
        <Button className="mr-2" variant="secondary" onClick={handleReset}>
          重新开始
        </Button>
        <Button className="mr-2" variant="secondary" onClick={handleRetreat}>
          悔棋
        </Button>
        <Button variant="secondary" onClick={handleMode}>
          噩梦模式
        </Button>
      </Col>
      <Col xs lg="2"></Col>
    </Row>
  );
}
