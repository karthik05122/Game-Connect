import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Alert,
} from "reactstrap";
import Select from "react-select";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const CreateTournament = () => {
  document.title = "Create Tournament | Skote - React Admin & Dashboard Template";

  const navigate = useNavigate();

  const API_KEY = "sBjIu7L8vcj2owFPrttbLlpN4zlXyvgVBzviXd6r";
  console.log(API_KEY)

  const [tournamentData, setTournamentData] = useState({
    name: "",
    tournament_type: "single elimination",
    description: "",
    open_signup: false,
    hold_third_place_match: false,
    pts_for_match_win: 5.0,
    pts_for_match_tie: 2.5,
    signup_cap: 20,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const tournamentTypeOptions = [
    { value: "single elimination", label: "Single Elimination" },
    { value: "double elimination", label: "Double Elimination" },
    { value: "round robin", label: "Round Robin" },
    { value: "swiss", label: "Swiss" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTournamentData({
      ...tournamentData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setTournamentData({
      ...tournamentData,
      tournament_type: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://api.challonge.com/v1/tournaments.json?api_key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournament: tournamentData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Tournament created successfully!");
        setTimeout(() => {
          navigate(`/projects-grid`);
        }, 2000);
      } else {
        alert("Failed to create tournament.");
      }
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tournament" breadcrumbItem="Create Tournament" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Basic Information</CardTitle>
                  <p className="card-title-desc mb-4">
                    Fill all information below
                  </p>

                  {successMessage && <Alert color="success">{successMessage}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="name">Tournament Name</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={tournamentData.name}
                            onChange={handleChange}
                            placeholder="Tournament Name"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            name="description"
                            type="textarea"
                            value={tournamentData.description}
                            onChange={handleChange}
                            placeholder="Brief description of the tournament"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="signup_cap">Signup Cap</Label>
                          <Input
                            id="signup_cap"
                            name="signup_cap"
                            type="number"
                            value={tournamentData.signup_cap}
                            onChange={handleChange}
                            placeholder="Max Participants"
                          />
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="tournament_type">Tournament Type</Label>
                          <Select
                            id="tournament_type"
                            value={tournamentTypeOptions.find(option => option.value === tournamentData.tournament_type)}
                            options={tournamentTypeOptions}
                            onChange={handleSelectChange}
                            placeholder="Select Tournament Type"
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                          <Input
                            id="open_signup"
                            name="open_signup"
                            type="checkbox"
                            checked={tournamentData.open_signup}
                            onChange={handleChange}
                            className="me-2"
                          />
                          <Label htmlFor="open_signup" className="m-0">Open Signup</Label>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="pts_for_match_win">Points for Match Win</Label>
                          <Input
                            id="pts_for_match_win"
                            name="pts_for_match_win"
                            type="number"
                            step="0.1"
                            value={tournamentData.pts_for_match_win}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="pts_for_match_tie">Points for Match Tie</Label>
                          <Input
                            id="pts_for_match_tie"
                            name="pts_for_match_tie"
                            type="number"
                            step="0.1"
                            value={tournamentData.pts_for_match_tie}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary">
                        Create Tournament
                      </Button>
                      <Button type="button" color="secondary" onClick={() => navigate("/tournaments")}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateTournament;