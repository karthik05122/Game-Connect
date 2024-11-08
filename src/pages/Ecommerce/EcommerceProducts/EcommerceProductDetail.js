import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import Breadcrumbs from "components/Common/Breadcrumb";

const PlayerDetail = () => {
    const { username } = useParams();
    const [playerData, setPlayerData] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch player data from Chess.com API
    const fetchPlayerData = async () => {
        try {
            const response = await fetch(`https://api.chess.com/pub/player/${username}`);
            if (response.ok) {
                const data = await response.json();
                setPlayerData(data);

                // Fetch the country name if the country URL is available
                if (data.country) {
                    fetchCountryName(data.country);
                }
            } else {
                console.error("Error fetching player data");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch country name using the provided country URL
    const fetchCountryName = async (countryUrl) => {
        try {
            const response = await fetch(countryUrl);
            if (response.ok) {
                const data = await response.json();
                setCountryName(data.name);
            } else {
                console.error("Error fetching country data");
            }
        } catch (error) {
            console.error("Error fetching country:", error);
        }
    };

    useEffect(() => {
        fetchPlayerData();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!playerData) {
        return <div>No data available</div>;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Player" breadcrumbItem="Player Detail" />
                    <Link to="/leaderboards" className="btn btn-primary">
                        Back
                    </Link>
                    <Row>
                        <Col lg={8} className="mx-auto">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md={4} className="text-center">
                                            <img
                                                src={playerData.avatar || "https://via.placeholder.com/150"}
                                                alt="Avatar"
                                                className="rounded-circle mb-3"
                                                width="150"
                                                height="150"
                                            />
                                            <h4>{playerData.name || playerData.username}</h4>
                                            <p className="text-muted">Title: {playerData.title || "N/A"}</p>
                                            <p className="text-muted">
                                                Status: {playerData.status === "premium" ? "Premium" : "Free"}
                                            </p>
                                            <p className="text-muted">
                                                Verified: {playerData.verified ? "Verified" : "Not Verified"}
                                            </p>
                                            <p className="text-muted">Followers: {playerData.followers}</p>
                                        </Col>

                                        <Col md={8}>
                                            <h5>Player Information</h5>
                                            <hr />
                                            <p><strong>Username:</strong> {playerData.username}</p>
                                            <p><strong>Country:</strong> {countryName || "N/A"}</p>
                                            <p><strong>Joined:</strong> {new Date(playerData.joined * 1000).toLocaleDateString()}</p>
                                            <p><strong>Last Online:</strong> {new Date(playerData.last_online * 1000).toLocaleDateString()}</p>
                                            <p><strong>League:</strong> {playerData.league || "N/A"}</p>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default PlayerDetail;