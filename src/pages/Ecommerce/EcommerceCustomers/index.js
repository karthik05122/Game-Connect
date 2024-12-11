import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Table } from 'reactstrap';
import Breadcrumbs from "components/Common/Breadcrumb";
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('https://api.chess.com/pub/leaderboards');
            const data = await response.json();
            const dailyPlayers = data.daily;

            // Fetch country names for each player
            const playersWithCountryName = await Promise.all(dailyPlayers.map(async (player) => {
                const countryName = await fetchCountryName(player.country);
                return { ...player, countryName };
            }));

            setPlayers(playersWithCountryName);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch country name using the provided country URL
    const fetchCountryName = async (countryUrl) => {
        if (!countryUrl) return "N/A";
        try {
            const response = await fetch(countryUrl);
            if (response.ok) {
                const data = await response.json();
                return data.name || "N/A";
            }
        } catch (error) {
            console.error("Error fetching country name:", error);
        }
        return "N/A";
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Rankings" breadcrumbItem="Leaders Board" />

                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <h4 className="mb-4">Top Players (Daily)</h4>
                                    <Table className="table align-middle table-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Avatar</th>
                                                <th>Username</th>
                                                <th>Status</th>
                                                <th>Score</th>
                                                <th>Country</th>
                                                <th>Win/Loss/Draw</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {players.map((player, index) => (
                                                <tr key={player.player_id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            src={player.avatar || "https://via.placeholder.com/50"}
                                                            alt="Avatar"
                                                            className="rounded-circle"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="text-primary cursor-pointer"
                                                            onClick={() => navigate(`/player-detail/${player.username}`)}
                                                        >
                                                            {player.username}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${player.status === 'premium' ? 'badge-soft-success' : 'badge-soft-secondary'}`}>
                                                            {player.status}
                                                        </span>
                                                    </td>
                                                    <td>{player.score}</td>
                                                    <td>{player.countryName}</td>
                                                    <td>
                                                        {player.win_count} / {player.loss_count} / {player.draw_count}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Leaderboard;