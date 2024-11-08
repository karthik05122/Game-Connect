import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const DetailsSection = ({ tournament }) => {
    return (
        <React.Fragment>
            <Col xl={9}>
                <Card>
                    <CardBody className="border-bottom">
                        <h5 className="fw-semibold">Tournament Details</h5>
                        <ul className="list-unstyled hstack gap-2 mb-0">
                            <li>
                                <i className="bx bx-building-house"></i> <span className="text-muted">URL:</span> <a href={tournament.full_challonge_url} target="_blank" rel="noopener noreferrer">{tournament.url}</a>
                            </li>
                            <li>
                                <i className="bx bx-calendar"></i> <span className="text-muted">Created On:</span> {new Date(tournament.created_at).toLocaleDateString()}
                            </li>
                        </ul>
                    </CardBody>
                    <CardBody>
                        <h5 className="fw-semibold mb-3">Description</h5>
                        <p className="text-muted">{tournament.description || "No description provided."}</p>

                        <h5 className="fw-semibold mb-3">Details</h5>
                        <ul className="vstack gap-3">
                            <li><strong>Require Score Agreement:</strong> {tournament.require_score_agreement ? "Yes" : "No"}</li>
                            <li><strong>Notify Users When Matches Open:</strong> {tournament.notify_users_when_matches_open ? "Yes" : "No"}</li>
                            <li><strong>Hold Third Place Match:</strong> {tournament.hold_third_place_match ? "Yes" : "No"}</li>
                            <li><strong>Progress Meter:</strong> {tournament.progress_meter}%</li>
                            <li><strong>Ranked By:</strong> {tournament.ranked_by}</li>
                            <li><strong>Grand Finals Modifier:</strong> {tournament.grand_finals_modifier}</li>
                        </ul>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default DetailsSection;