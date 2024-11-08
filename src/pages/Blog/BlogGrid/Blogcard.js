import React from "react";
import { Card, Col } from "reactstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ title, releaseDate, image, platforms, detailsLink, numberOfPlayers }) => {
  return (
    <Col sm={6}>
      <Card className="p-1 border shadow-none">
        <div className="p-3">
          <h5>
            <Link to={detailsLink} className="text-dark">
              {title}
            </Link>
          </h5>
          <p className="text-muted mb-0">Released: {releaseDate}</p>
        </div>
        <div className="position-relative">
          <img src={image} alt="" className="img-thumbnail" />
        </div>
        <div className="p-3">
          <ul className="list-inline">
            <li className="list-inline-item me-3">
              <Link to="#" className="text-muted">
                Platforms :
                {platforms.map((platform, index) => (
                  <span key={index}>
                    <i className="align-middle me-1">{platform.icon}</i>
                    {platform.name}
                    {index < platforms.length - 1 && ", "}
                  </span>
                ))}
              </Link>
            </li>
          </ul>
          Number of players: {numberOfPlayers}
          <div>
            <Link to={detailsLink} className="text-primary">
              View Details <i className="mdi mdi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default BlogCard;