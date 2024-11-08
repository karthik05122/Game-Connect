import React, { useState } from 'react';
import { Card, CardBody, Col, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const DetailsSection = ({ tournament }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [inviteModal, setInviteModal] = useState(false);
    const [participants, setParticipants] = useState([{ name: '', invite_name_or_email: '', seed: '', misc: '' }]);

    // Toggle modal
    const toggleInviteModal = () => setInviteModal(!inviteModal);

    // Handler to add new participant fields
    const handleAddParticipant = () => {
        setParticipants([...participants, { name: '', invite_name_or_email: '', seed: '', misc: '' }]);
    };

    // Handler to update participant information
    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = participants.map((participant, i) => i === index ? { ...participant, [field]: value } : participant);
        setParticipants(updatedParticipants);
    };

    // Handler to start the tournament
    const handleStartTournament = async () => {
        try {
            const response = await fetch(
                `https://thingproxy.freeboard.io/fetch/https://api.challonge.com/v1/tournaments/${tournament.id}/start.json?api_key=sBjIu7L8vcj2owFPrttbLlpN4zlXyvgVBzviXd6r`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                setErrorMessage(null);
                setSuccessMessage("Tournament has been started successfully.");
            } else {
                const errorData = await response.json();
                const errorMsg = errorData.errors?.[0] || "Failed to start the tournament.";
                setErrorMessage(errorMsg);
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error("Error starting tournament:", error);
            setErrorMessage("An error occurred while trying to start the tournament.");
            setSuccessMessage(null);
        }
    };

    // Handler to submit participants
    const handleSubmitParticipants = async () => {
        try {
            const response = await fetch(
                `https://thingproxy.freeboard.io/fetch/https://api.challonge.com/v1/tournaments/${tournament.id}/participants/bulk_add.json?api_key=sBjIu7L8vcj2owFPrttbLlpN4zlXyvgVBzviXd6r`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        participants: participants.map(p => ({
                            name: p.name,
                            invite_name_or_email: p.invite_name_or_email,
                            seed: p.seed,
                            misc: p.misc
                        }))
                    })
                }
            );

            if (response.ok) {
                setErrorMessage(null);
                setSuccessMessage("Participants added successfully.");
                toggleInviteModal(); // Close modal on success
            } else {
                const errorData = await response.json();
                const errorMsg = errorData.errors?.[0] || "Failed to add participants.";
                setErrorMessage(errorMsg);
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error("Error adding participants:", error);
            setErrorMessage("An error occurred while trying to add participants.");
            setSuccessMessage(null);
        }
    };

    return (
        <React.Fragment>
            <Col xl={9}>
                <Card>
                    <CardBody className="border-bottom">
                        <h5 className="fw-semibold">Tournament Details</h5>
                        <ul className="list-unstyled hstack gap-2 mb-0">
                            <li>
                                <i className="bx bx-building-house"></i> <span className="text-muted">URL:</span> <a href={tournament?.full_challonge_url} target="_blank" rel="noopener noreferrer">{tournament.url}</a>
                            </li>
                            <li>
                                <i className="bx bx-calendar"></i> <span className="text-muted">Created On:</span> {new Date(tournament?.created_at).toLocaleDateString()}
                            </li>
                        </ul>
                    </CardBody>
                    <CardBody>
                        <h5 className="fw-semibold mb-3">Description</h5>
                        <p className="text-muted">{tournament?.description || "No description provided."}</p>

                        <h5 className="fw-semibold mb-3">Details</h5>
                        <ul className="vstack gap-3">
                            <li><strong>Require Score Agreement:</strong> {tournament?.require_score_agreement ? "Yes" : "No"}</li>
                            <li><strong>Notify Users When Matches Open:</strong> {tournament?.notify_users_when_matches_open ? "Yes" : "No"}</li>
                            <li><strong>Hold Third Place Match:</strong> {tournament?.hold_third_place_match ? "Yes" : "No"}</li>
                            <li><strong>Progress Meter:</strong> {tournament?.progress_meter}%</li>
                            <li><strong>Ranked By:</strong> {tournament?.ranked_by}</li>
                            <li><strong>Grand Finals Modifier:</strong> {tournament?.grand_finals_modifier}</li>
                        </ul>

                        {/* Alert Messages */}
                        {errorMessage && <Alert color="danger" className="mt-4">{errorMessage}</Alert>}
                        {successMessage && <Alert color="success" className="mt-4">{successMessage}</Alert>}

                        {/* Action Buttons */}
                        <div className="d-flex gap-3 mt-4">
                            <Button color="success" onClick={handleStartTournament}>
                                Start Tournament
                            </Button>
                            <Button color="primary" onClick={toggleInviteModal}>
                                Invite Participants
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            {/* Invite Participants Modal */}
            <Modal isOpen={inviteModal} toggle={toggleInviteModal}>
                <ModalHeader toggle={toggleInviteModal}>Invite Participants</ModalHeader>
                <ModalBody>
                    <Form>
                        {participants.map((participant, index) => (
                            <div key={index}>
                                <h6>Participant {index + 1}</h6>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        value={participant.name}
                                        onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Invite Name or Email</Label>
                                    <Input
                                        type="email"
                                        value={participant.invite_name_or_email}
                                        onChange={(e) => handleParticipantChange(index, 'invite_name_or_email', e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Seed</Label>
                                    <small className="text-muted d-block mb-2">
                                        A seed determines the participant's starting position in the bracket. Higher seeds are usually given to stronger players.
                                    </small>
                                    <Input
                                        type="number"
                                        value={participant.seed}
                                        onChange={(e) => handleParticipantChange(index, 'seed', e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Misc</Label>
                                    <small className="text-muted d-block mb-2">
                                        Optional field for additional information about the participant, such as an internal ID or other custom notes.
                                    </small>
                                    <Input
                                        type="text"
                                        value={participant.misc}
                                        onChange={(e) => handleParticipantChange(index, 'misc', e.target.value)}
                                    />
                                </FormGroup>
                                <hr />
                            </div>
                        ))}
                        <Button color="secondary" onClick={handleAddParticipant} block>Add Another Participant</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitParticipants}>Submit Participants</Button>
                    <Button color="secondary" onClick={toggleInviteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default DetailsSection;