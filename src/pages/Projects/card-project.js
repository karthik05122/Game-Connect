import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const CardTournament = ({ tournaments, onDelete }) => {
  return (
    <React.Fragment>
      {tournaments.map((tournament, key) => (
        <Col xl="4" sm="6" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="avatar-md me-4">
                  <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="Tournament Icon"
                      height="30"
                    />
                  </span>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="text-truncate font-size-15">
                    <Link
                      to={`/tournament-details/${tournament.id}`}
                      className="text-dark"
                    >
                      {tournament.name}
                    </Link>
                  </h5>
                  <p className="text-muted mb-4">{tournament.description || "No description provided"}</p>

                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <Badge color="primary">
                      Type: {tournament.tournament_type.replace(/_/g, " ")}
                    </Badge>
                    <Badge color="secondary">
                      Status: {tournament.state}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardBody>

            <div className="px-4 py-3 border-top">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3" id={`createdAt${key}`}>
                  <i className="bx bx-calendar me-1" />
                  Created: {new Date(tournament.created_at).toLocaleDateString()}
                  <UncontrolledTooltip placement="top" target={`createdAt${key}`}>
                    Tournament Creation Date
                  </UncontrolledTooltip>
                </li>
                <li className="list-inline-item me-3" id={`participants${key}`}>
                  <i className="bx bx-group me-1" />
                  {tournament.participants_count || 0} Participants
                  <UncontrolledTooltip placement="top" target={`participants${key}`}>
                    Number of Participants
                  </UncontrolledTooltip>
                </li>
              </ul>

              {/* Delete Button */}
              <Button
                color="danger"
                className="mt-2"
                onClick={() => onDelete(tournament.id)}
              >
                Delete Tournament
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

CardTournament.propTypes = {
  tournaments: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
};

export default CardTournament;
