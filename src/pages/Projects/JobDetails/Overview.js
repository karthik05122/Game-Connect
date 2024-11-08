import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const Overview = ({ tournament }) => {
    return (
        <React.Fragment>
            <Col xl={3}>
                <Card>
                    <CardBody>
                        <h5 className="fw-semibold">Overview</h5>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <td scope="col">{tournament?.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Type</th>
                                        <td>{tournament?.tournament_type.replace(/_/g, " ")}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td><span className="badge badge-soft-info">{tournament?.state}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Participants</th>
                                        <td>{tournament?.participants_count}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Created At</th>
                                        <td>{new Date(tournament?.created_at).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Start Date</th>
                                        <td>{tournament?.start_at ? new Date(tournament?.start_at).toLocaleDateString() : "Not Started"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Overview;