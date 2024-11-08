import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import Overview from './Overview';
import DetailsSection from './DetailsSection';
import ParticipantsCard from './ParticipantsCard';

const TournamentDetails = () => {
    document.title = "Tournament Details | Skote - React Admin & Dashboard Template";

    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState(null);
    const [participants, setParticipants] = useState([]);

    // Fetch tournament data
    useEffect(() => {
        const fetchTournamentData = async () => {
            try {
                const response = await fetch(
                    `https://thingproxy.freeboard.io/fetch/https://api.challonge.com/v1/tournaments/${tournamentId}.json?api_key=sBjIu7L8vcj2owFPrttbLlpN4zlXyvgVBzviXd6r`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setTournament(data.tournament);
                } else {
                    console.error("Failed to fetch tournament details.");
                }
            } catch (error) {
                console.error("Error fetching tournament data:", error);
            }
        };

        if (tournamentId) {
            fetchTournamentData();
        }
    }, [tournamentId]);

    // Fetch participants data
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(
                    `https://thingproxy.freeboard.io/fetch/https://api.challonge.com/v1/tournaments/${tournamentId}/participants.json?api_key=sBjIu7L8vcj2owFPrttbLlpN4zlXyvgVBzviXd6r`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setParticipants(data.map(participant => participant.participant));
                } else {
                    console.error("Failed to fetch participants.");
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        };

        if (tournamentId) {
            fetchParticipants();
        }
    }, [tournamentId]);

    if (!tournament) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tournament" breadcrumbItem="Tournament Details" />
                    <Link to="/tournaments" className="btn btn-primary">
                        Back
                    </Link>
                    <Row>
                        <Overview tournament={tournament} />
                        <DetailsSection tournament={tournament} />
                    </Row>
                    <Row>
                        <h3>Participants</h3>
                        <ParticipantsCard participants={participants} />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TournamentDetails;
