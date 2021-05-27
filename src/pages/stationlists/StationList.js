import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import Widget from '../../components/Widget';
import s from './StationList.module.scss';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apiActions from '../../actions/getAPI';
import StationItem from './StationItem';

class StationLists extends React.Component {
  componentDidMount() {
    const { APIActions } = this.props;
    APIActions.getStations();
  }

  render() {
    const { stations, error, loading } = this.props;

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
                  제주대학교 내 주차장 목록
                  <span className="fw-semi-bold"></span>
                </h5>
              }
              bodyClass={s.mainTableWidget}
            >
              <Table striped className={s.table}>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th>Picture</th>
                    <th>Name</th>
                    <th className="hidden-sm-down">Location</th>
                    <th className="hidden-sm-down">Number of parking spaces</th>
                    <th className="hidden-sm-down">Favorite</th>
                    <th className="hidden-sm-down">
                      Check the number of vacancy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stations.map((station) => (
                    <StationItem
                      key={`${station.id}${uuid()}`}
                      {...station}
                      // onClick={console.log(station.id)}
                    ></StationItem>
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

export default connect(
  //mapStateToProps와 같은것
  (state) => ({
    stations: state.apis.data,
    loading: state.apis.pending,
    error: state.apis.error,
  }),
  //mapDispatchToProps와 같은것
  (dispatch) => ({
    APIActions: bindActionCreators(apiActions, dispatch),
  })
)(StationLists);
