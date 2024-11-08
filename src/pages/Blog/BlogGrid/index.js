import React, { useState, useEffect } from "react";
import { Card, Col, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import BlogCard from "./Blogcard";
import img1 from "../../../assets/images/small/img-1.png";
import img4 from "../../../assets/images/small/img-4.png";
import img3 from "../../../assets/images/small/img-3.png";
import img5 from "../../../assets/images/small/img-5.png";
import img6 from "../../../assets/images/small/img-6.png";
import img7 from "../../../assets/images/small/img-7.png";
import img8 from "../../../assets/images/small/img-8.png";
import { Link } from "react-router-dom";

const BlogGrid = () => {
  const [activeTab, toggleTab] = useState("1");
  const [playerCounts, setPlayerCounts] = useState({});
  const API_KEY = process.env.REACT_APP_APIKEY;

  const toggle = (tab) => {
    if (activeTab !== tab) toggleTab(tab);
  };

  // Fetch player counts
  const fetchPlayerCount = async (appid) => {
    try {
      const response = await fetch(`https://thingproxy.freeboard.io/fetch/http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${appid}&key=${API_KEY}`);
      const data = await response.json();
      return data.response.player_count || 0;
    } catch (error) {
      console.error("Error fetching player count:", error);
      return 0;
    }
  };

  // Fetch player counts for all games
  useEffect(() => {
    const fetchAllPlayerCounts = async () => {
      const gameAppIds = [570, 730, 578080, 1203220, 440, 1172470, 2923300, 2429640]; // App IDs of games
      const counts = {};
      for (const appid of gameAppIds) {
        const count = await fetchPlayerCount(appid);
        counts[appid] = count;
      }
      setPlayerCounts(counts);
    };

    fetchAllPlayerCounts();
  }, []);

  const games = [
    {
      title: "Dota 2",
      releaseDate: "9 July 2013",
      image: img1,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/570",
      appid: 570,
    },
    {
      title: "Counter-Strike 2",
      releaseDate: "21 August 2012",
      image: img4,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/730",
      appid: 730,
    },
    {
      title: "PUBG: BATTLEGROUNDS",
      releaseDate: "21 December 2017",
      image: img1,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/578080",
      appid: 578080,
    },
    {
      title: "NARAKA: BLADEPOINT",
      releaseDate: "12 August 2021",
      image: img3,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/1203220",
      appid: 1203220,
    },
    {
      title: "Team Fortress 2",
      releaseDate: "10 October 2007",
      image: img5,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/440",
      appid: 440,
    },
    {
      title: "Apex Legends™",
      releaseDate: "5 November 2020",
      image: img6,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/1172470",
      appid: 1172470,
    },
    {
      title: "Banana",
      releaseDate: "23 April 2024",
      image: img7,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/2923300",
      appid: 2923300,
    },
    {
      title: "THRONE AND LIBERTY",
      releaseDate: "1 October 2024",
      image: img8,
      platforms: [
        { name: "Windows", icon: <WindowsIcon /> },
        { name: "Mac OS", icon: <MacOSIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
      ],
      detailsLink: "/game-news/2429640",
      appid: 2429640,
    },
  ];

  return (
    <React.Fragment>
      <Col xl={9} lg={8}>
        <Card>
          <ul
            className="nav nav-tabs nav-tabs-custom justify-content-center pt-2"
            role="tablist"
          >
            <NavItem>
              <NavLink
                to="#"
                className={classnames({
                  active: activeTab === "1",
                })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Team-Up
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="#"
                className={classnames({
                  active: activeTab === "2",
                })}
                onClick={() => {
                  toggle("2");
                }}
              >
                History
              </NavLink>
            </NavItem>
          </ul>
          <TabContent className="p-4" activeTab={activeTab}>
            <TabPane tabId="1">
              <div>
                <Row className="justify-content-center">
                  <Col xl={8}>
                    <div>
                      <h5 className="mb-0">Latest News</h5>
                      <hr className="mb-4" />
                      <Row>
                        {games.map((game, index) => (
                          <BlogCard
                            key={index}
                            title={game.title}
                            releaseDate={game.releaseDate}
                            image={game.image}
                            platforms={game.platforms}
                            detailsLink={game.detailsLink}
                            numberOfPlayers={playerCounts[game.appid] || "Loading..."}
                          />
                        ))}
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>

            <TabPane tabId="2">
              <div>
                <Row className="justify-content-center">
                  <Col xl={8}>
                    <h5>Archive</h5>
                    {/* Archive content goes here */}
                  </Col>
                </Row>
              </div>
            </TabPane>
          </TabContent>
        </Card>
      </Col>
    </React.Fragment>
  );
};

const WindowsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path d="M1 1v6.6h6.6v-7h-6.6zm7.8 0v7h7.2v-8l-7.2 1zm0 7.8v7l7.2 1v-8h-7.2zm-7.8 0v7h6.6v-7h-6.6z" />
  </svg>
);

const MacOSIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path d="M11.3 0c-.4.5-.9 1.2-1.3 2-.4.8-.6 1.5-.5 2.2 0 .1.1.1.2.1.6 0 1.4-.6 2-1.3.6-.7 1.1-1.5 1.2-2.2 0-.1 0-.1-.2-.1-.6 0-1.5.6-2 1.3zm2.2 6.6c-.5-.6-1.3-1-2.1-1-.8 0-1.5.5-2 1-.1.1-.2.1-.3.1-.6 0-1.2-.5-2-.5-.8 0-1.5.4-2 .9-.6.6-1 1.6-1.2 2.7-.2 1.1.1 2.5.6 3.4.4.7 1 1.6 1.8 1.6.6 0 .8-.4 1.7-.4.9 0 1.1.4 1.7.4.8 0 1.3-.9 1.7-1.6.5-.9.6-1.8.6-1.9v-.1c-.1-.1-.5-.2-.5-.7 0-.3.3-.5.6-.8.5-.3.9-.8 1.1-1.3.2-.6 0-1.3-.3-1.6z" />
  </svg>
);

const LinuxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path d="M5 0c-2 2 1 6.6-3 8 1 .4 2.3-.3 3-.8v.1c0 1-.2 2.8 0 3.6.1 1 1 1.2 1 1.8-.4.5-1.6.7-1.4 1.6h4.8c.3-1-.9-1.2-1.4-1.6 0-.5.9-.8 1-1.8.3-.7.2-2.6.1-3.6v-.1c.7.5 2 1.2 3 .8-4-1.4-1-6-3-8-1 .8-2 0-2 0s-1 .8-2 0z" />
  </svg>
);

export default BlogGrid;