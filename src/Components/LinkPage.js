/*
import React, { useEffect, useState } from "react";
import axios from "../Utils/axios";
import { Link } from 'react-router-dom';
import "../styles/Dashboard.css";
export default function LinkPage() {
  const [totalLink, setTotalLink] = useState(null);
  const [totalExternalLink, setTotalExternalLink] = useState(null);
  const [totalInternalLink, setTotalInternalLink] = useState(null);
  const [externalLink, setExternalLink] = useState([]);
  const [internalLink, setInternalLink] = useState([]);
  useEffect(() => {
    async function PostWithoutMeta() {
      try {
        const post = await axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
        );
        const allPosts = post.data.posts;
        let linksData = {};
        let allLinks = [];
        let brokenLink = [];
        allPosts.forEach((ele) => {
          var htmlChecker = new HtmlChecker(
            {
              excludeInternalLinks: false,
              excludeExternalLinks: false,
              filterLevel: 0,
              acceptedSchemes: ["http", "https"],
            },
            {
              link: function (result, customData) {
                if (result.broken) {
                  if (
                    result.http.response &&
                    ![undefined, 200].includes(result.http.response.statusCode)
                  ) {
                    brokenLink.push(result.url.original);
                  }
                } else {
                  console.log(result.url.original);
                  allLinks.push(result.url.original);
                }
              },
              end: function () {
                console.log("completed");
              },
            }
          );
          htmlChecker.scan(ele.html, "https://demo.ghost.io");
            linksData.brokenLink = brokenLink;
            linksData.allLinks = allLinks;
        });
        var total = 0;
        total = linksData.allLinks.length + linksData.brokenLink.length;
        setTotalLink(total);
        var data = linksData.allLinks.concat(linksData.brokenLink);
        var internalLinkData = [];
        var externalLinkData = [];
        var len = data.length;
        for (var i = 0; i < len; i++) {
          if (data[i].indexOf("https://demo.ghost.io") == 0) {
            internalLinkData.push(data[i]);
          }
          else{
            externalLinkData.push(data[i]);
          }
        }
        setTotalInternalLink(internalLinkData.length);
        setTotalExternalLink(externalLinkData.length);
        var brokenInternalLinkData = [];
        var brokenExternalLinkData = [];
        var len = linksData.brokenLink.length;
        for (var i = 0; i < len; i++) {
          if (linksData.brokenLink[i].indexOf("https://demo.ghost.io") == 0) {
            brokenInternalLinkData.push(linksData.brokenLink[i]);
          }
          else{
            brokenExternalLinkData.push(linksData.brokenLink[i]);
          }
        }
        setInternalLink(brokenInternalLinkData);
        setExternalLink(brokenExternalLinkData);
      } catch (err) {
        console.log(err);
      }
    }

    PostWithoutMeta();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Link Page</h1>
      <Link to="/" className="button">Go To Dashboard</Link>
      <br />
      <Link to="/postpage" className="button">Go To Post Page</Link>
      <div>
        <h2>Total Number of links</h2>
        <h3>{totalLink}</h3>
      </div>
      <br />
      <div>
        <h2>Total Number of Internal links</h2>
        <h3>{totalInternalLink}</h3>
      </div>
      <br />
      <div>
        <h2>Total Number of External links</h2>
        <h3>{totalExternalLink}</h3>
      </div>
      <br />
      <div>
        <h2>List of Broken Internal Links</h2>
        {internalLink.length === 0 ? (
          <p>No Link Found</p>
        ) : (
          internalLink.map((post) => (
            <div key={post}>
              <a href={post} target="_blank" rel="noreferrer">
                {post}
              </a>
              <br />
            </div>
          ))
        )}
      </div>
      <br />
      <div>
        <h2>List of Broken External Links</h2>
        {externalLink.length === 0 ? (
          <p>No Link Found</p>
        ) : (
          externalLink.map((post) => (
            <div key={post}>
              <a href={post} target="_blank" rel="noreferrer">
                {post}
              </a>
              <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
*/