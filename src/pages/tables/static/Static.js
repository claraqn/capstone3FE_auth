import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
} from "reactstrap";

import Widget from "../../../components/Widget";
import s from "./Static.module.scss";

class Static extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [
        {
          id: 1,
          picture: require("../../../assets/tables/1.png"), // eslint-disable-line global-require
          description: "공대4호관 주차장",
          info: {
            type: "JPEG",
            dimensions: "200x150",
          },
          label: {
            colorClass: "primary",
            text: "Accessible",
          },
          date: new Date("September 14, 2012"),
          size: "45.6 KB",
          progress: {
            percent: 29,
            colorClass: "success",
          },
        },
        {
          id: 2,
          picture: require("../../../assets/tables/2.png"), // eslint-disable-line global-require
          description: "공대2호관 주차장",
          info: {
            type: "PSD",
            dimensions: "2400x1455",
          },
          date: new Date("November 14, 2012"),
          size: "15.3 MB",
          progress: {
            percent: 33,
            colorClass: "warning",
          },
        },
        {
          id: 3,
          picture: require("../../../assets/tables/3.png"), // eslint-disable-line global-require
          description: "본관 앞 주차장",
          
          info: {
            type: "JPEG",
            dimensions: "200x150",
          },
          date: new Date("September 14, 2012"),
          size: "49.0 KB",
          progress: {
            percent: 38,
            colorClass: "inverse",
          },
        },
        {
          id: 4,
          picture: require("../../../assets/tables/4.png"), // eslint-disable-line global-require
          description: "체육관 주차장",
          info: {
            type: "PNG",
            dimensions: "210x160",
          },
          date: new Date("September 15, 2012"),
          size: "69.1 KB",
          progress: {
            percent: 17,
            colorClass: "danger",
          },
        },
        {
          id: 5,
          picture: require("../../../assets/tables/5.png"), // eslint-disable-line global-require
          description: "정보통신원 주차장",
          info: {
            type: "JPEG",
            dimensions: "1452x1320",
          },
          date: new Date("October 1, 2012"),
          size: "2.3 MB",
          progress: {
            percent: 41,
            colorClass: "primary",
          },
        },
      ],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };

    this.checkAll = this.checkAll.bind(this);
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Parking Lot <span className="fw-semi-bold">List</span>
          <small className={s.small}> 주차장 목록을 확인합니다.</small>
        </h1>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  제주대학교 내 주차장 목록<span className="fw-semi-bold"></span>
                </h5>
              }
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th>Picture</th>
                    <th>Name</th>
                    <th className="hidden-sm-down">Location</th>
                    <th className="hidden-sm-down">Number of parking spaces</th>
                    <th className="hidden-sm-down">Favorite</th>
                    <th className="hidden-sm-down">Check the number of vacancy</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableStyles.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        <img
                          className="img-rounded"
                          src={row.picture}
                          alt=""
                          height="50"
                        />
                      </td>
                      <td>
                        {row.description}
                        {row.label && (
                          <div>
                            <Badge color={row.label.colorClass}>
                              {row.label.text}
                            </Badge>
                          </div>
                        )}
                      </td>
                      <td>
                        <p className="mb-0">
                          <small>
                            Type:
                            <span className="text-muted fw-semi-bold">
                              &nbsp; {row.info.type}
                            </span>
                          </small>
                        </p>
                        <p>
                          <small>
                            Dimensions:
                            <span className="text-muted fw-semi-bold">
                              &nbsp; {row.info.dimensions}
                            </span>
                          </small>
                        </p>
                      </td>
                      <td className="text-muted">{this.parseDate(row.date)}</td>
                      <td className="text-muted">{row.size}</td>
                      <td className="width-150">
                        <Progress
                          color={row.progress.colorClass}
                          value={row.progress.percent}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Static;
