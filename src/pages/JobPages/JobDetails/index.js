import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import Overview from './Overview';
import DetailsSection from './DetailsSection';

const TournamentDetails = () => {
    document.title = "Tournament Details | Skote - React Admin & Dashboard Template";

    const { tournamentId } = useParams(); // Get tournamentId from URL parameters
    const [tournament, setTournament] = useState(null);

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

    if (!tournament) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Tournament" breadcrumbItem="Tournament Details" />

                    <Row>
                        <Overview tournament={tournament} />
                        <DetailsSection tournament={tournament} />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TournamentDetails;