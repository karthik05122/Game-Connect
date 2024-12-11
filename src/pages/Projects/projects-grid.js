import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import Breadcrumbs from "components/Common/Breadcrumb";
import CardTournament from "./card-project";
import Paginations from "components/Common/Pagination";

const ProjectsGrid = (props) => {
  document.title = "eSports Hub Section";

  const [tournaments, setTournaments] = useState([]);

  // Fetch tournaments from the Challonge API as JSON
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/get?url=https://api.challonge.com/v1/tournaments.json?api_key=sBjIu7L8vcj2owFPrttbLlpN4zlXyvgVBzviXd6r&state=all",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const parsedData = JSON.parse(data.contents);
          const tournamentsList = parsedData.map((item) => item.tournament);
          setTournaments(tournamentsList);
        } else {
          console.error("Failed to fetch tournaments.");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=https://api.challonge.com/v1/tournaments/${id}.json?api_key=sBjIu7L8vcj2owFPrttbLlpN4zlXyvgVBzviXd6r`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        // Remove the deleted tournament from the state
        setTournaments(tournaments.filter((tournament) => tournament.id !== id));
      } else {
        console.error("Failed to delete tournament.");
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPageData = 9;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentData = useMemo(
    () => tournaments.slice(indexOfFirst, indexOfLast),
    [tournaments, indexOfFirst, indexOfLast]
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="eSports" breadcrumbItem="Tournaments Hub" />

          <Link to="/add-tournament" className="btn btn-primary mb-3">
            Create New Tournament
          </Link>

          <Row>
            <CardTournament tournaments={currentData} onDelete={handleDelete} />
            <Row>
              <Paginations
                perPageData={perPageData}
                data={tournaments}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isShowingPageLength={false}
                paginationDiv="col-12"
                paginationClass="pagination pagination-rounded justify-content-center mt-2 mb-5"
              />
            </Row>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ProjectsGrid);