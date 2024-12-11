import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, CardBody, Col, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const parseCustomTags = (content) => {
  return content
    .replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1" alt="Blog Visual" />')
    .replace(/\[h2\](.*?)\[\/h2\]/g, "<h2>$1</h2>")
    .replace(/^\[img\].*?\[\/img\]\s*/g, "")
    .replace(/\[h3\](.*?)\[\/h3\]/g, "<h3>$1</h3>")
    .replace(/\[b\](.*?)\[\/b\]/g, "<b>$1</b>")
    .replace(/\[i\](.*?)\[\/i\]/g, "<i>$1</i>")
    .replace(/\[list\](.*?)\[\/list\]/gs, "<ul>$1</ul>")
    .replace(/\[\*\](.*?)\[\/\*\]/g, "<li>$1</li>")
    .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>');
};

const BlogDetails = () => {
  document.title = "Game News | Skote - React Admin & Dashboard Template";
  const { appid } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002?appid=${appid}`
        );
        const data = await response.json();
        const parsedData = JSON.parse(data.contents);
        const newsItems = parsedData?.appnews?.newsitems;

        if (newsItems && newsItems.length > 0) {
          // Find the first item with an image
          const validNewsItem = newsItems.find((item) =>
            item.contents && item.contents.match(/\[img\](.*?)\[\/img\]/)
          );

          if (validNewsItem) {
            setNewsItem(validNewsItem);
          } else {
            console.log("No valid news items found.");
          }
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, []);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  // Function to convert UNIX timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const parsedContent = parseCustomTags(newsItem.contents);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Game" breadcrumbItem="Game News" />
          <Link to="/blog-game" className="btn btn-primary">
            Back
          </Link>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row justify-content-center">
                      <div className="col-xl-8">
                        <div>
                          <div className="text-center">
                            <div className="mb-4">
                              {newsItem.is_external_url ? (
                                <a
                                  href={newsItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="badge bg-light font-size-12"
                                >
                                  <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                  {newsItem.feedlabel}
                                </a>
                              ) : (
                                <Link to="#" className="badge bg-light font-size-12">
                                  <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                  {newsItem.feedlabel}
                                </Link>
                              )}
                            </div>
                            <h4>{newsItem.title}</h4>
                            <p className="text-muted mb-4">
                              <i className="mdi mdi-calendar me-1"></i>{" "}
                              {formatDate(newsItem.date)}
                            </p>
                          </div>

                          <hr />

                          <div className="text-center">
                            <Row>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">Categories</p>
                                  <h5 className="font-size-15">{newsItem.feedname}</h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Date</p>
                                  <h5 className="font-size-15">{formatDate(newsItem.date)}</h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Post by</p>
                                  <h5 className="font-size-15">{newsItem.author}</h5>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <hr />

                          <div className="my-5">
                            {newsItem.contents && (
                              <img
                                src={
                                  newsItem.contents.match(/\[img\](.*?)\[\/img\]/)
                                    ? newsItem.contents.match(/\[img\](.*?)\[\/img\]/)[1].replace(
                                      "{STEAM_CLAN_IMAGE}",
                                      "https://clan.akamai.steamstatic.com/images"
                                    )
                                    : "fallback-image-url.jpg" // Replace with a fallback image URL if needed
                                }
                                alt="Blog Visual"
                                className="img-thumbnail mx-auto d-block"
                              />
                            )}
                          </div>

                          <hr />

                          <div className="mt-4">
                            <blockquote className="p-4 border-light border rounded mb-4">
                              <div className="me-3">
                                <i className="bx bxs-quote-alt-left text-dark font-size-24"></i>
                              </div>
                              <div
                                className="blog-post"
                                dangerouslySetInnerHTML={{ __html: parsedContent }}
                              />
                            </blockquote>

                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BlogDetails;