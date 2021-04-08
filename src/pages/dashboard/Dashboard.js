import React from "react";
import { Row } from "reactstrap";


import s from "./Dashboard.module.scss";

import park1 from "../../assets/park/park1.png";
import park2 from "../../assets/park/park2.png";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          주차장의 빈자리를 미리 확인해보세요 &nbsp;
          <small>
            <small>made by Team 9</small>
          </small>
        </h1>

        <Row>
          <img
              src={park1}
              alt="..."
              className={s.parkleft}
              // 
            />
          {/* <span>hello</span> */}
            <img
              src={park2}
              alt="..."
              className={s.parkright}
              // 
            />
            {/* <span>hello</span> */}
        </Row>
      </div>
    );
  }
}

export default Dashboard;
