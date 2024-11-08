import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const ParticipantsCard = ({ participants }) => {
    return (
        <Row>
            {(participants || []).map((participant, index) => (
                <Col xl={3} md={6} key={index}>
                    <Card>
                        <CardBody>
                            <div className="favorite-icon">
                                <Link to="#"><i className="uil uil-heart-alt fs-18"></i></Link>
                            </div>
                            <img 
                                src={participant.portrait_url || "https://via.placeholder.com/50"} 
                                alt="Participant" 
                                height="50" 
                                className="mb-3" 
                            />
                            <h5 className="fs-17 mb-2">
                                <Link to="#" className="text-dark">{participant.display_name}</Link>
                            </h5>
                            <ul className="list-inline mb-0">
                                {participant.display_name_with_invitation_email_address && (
                                    <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-1"><i className="mdi mdi-email"></i> {participant.display_name_with_invitation_email_address}</p>
                                    </li>
                                )}
                                <li className="list-inline-item">
                                    <p className="text-muted fs-14 mb-0"><i className="mdi mdi-numeric"></i> Seed: {participant.seed}</p>
                                </li>
                                {participant.country_icon && (
                                    <li className="list-inline-item">
                                        <img src={participant.country_icon} alt="Country" width="20" className="me-1" />
                                        <span className="text-muted fs-14 mb-0">{participant.country}</span>
                                    </li>
                                )}
                            </ul>
                            <div className="mt-3 hstack gap-2">
                                <span className="badge rounded-pill badge-soft-primary">Active</span>
                                {participant.invitation_pending && <span className="badge rounded-pill badge-soft-warning">Pending</span>}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ParticipantsCard;