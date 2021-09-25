import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
export default function PostPage() {
  const [meta, setMeta] = useState([]);
  const [longMeta, setLongMeta] = useState([]);
  const [longURL, setLongURL] = useState([]);
  const [image, setImage] = useState([]);
  const [shortPost, setShortPost] = useState([]);
  const [longPost, setLongPost] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function postData() {
      try {
        const post = await axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
        );
        const allPosts = post.data.posts;
        var metaData = [];
        var longMetaData = [];
        allPosts.forEach((ele) => {
          if (ele.meta_description === null) {
            metaData.push({
              title: ele.title,
              url: ele.url,
            });
          } else {
            longMetaData.push({
              title: ele.title,
              url: ele.url,
            });
          }
        });
        setMeta(metaData);
        setLongMeta(longMetaData);
        var longURLData = [];
        allPosts.forEach((ele) => {
          if (ele.url.length > 100) {
            longURLData.push({
              title: ele.title,
              url: ele.url,
            });
          }
        });
        setLongURL(longURLData);
        var imageData = [];
        allPosts.forEach((ele) => {
          if (ele.feature_image === null) {
            imageData.push({
              title: ele.title,
              url: ele.url,
            });
          }
        });
        setImage(imageData);
        var shortPostData = [];
        allPosts.forEach((ele) => {
          var noSpacesString = ele.html.replace(/ /g, "");
          if (noSpacesString.length < 250) {
            shortPostData.push({
              title: ele.title,
              url: ele.url,
            });
          }
        });
        setShortPost(shortPostData);
        var longPostData = [];
        allPosts.forEach((ele) => {
          var noSpacesString = ele.html.replace(/ /g, "");
          if (noSpacesString.length > 1500) {
            longPostData.push({
              title: ele.title,
              url: ele.url,
            });
          }
        });
        setLongPost(longPostData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    postData();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 className="header">Post Page</h1>
          <br />
          <div>
            <Link to="/" className="button">
              Go To Dashboard
            </Link>
          </div>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }} className="content">
            <div className="ContainerPost">
              <h2>List of Posts without Meta Description</h2>
              {meta.length === 0 ? (
                <p>No Post Found</p>
              ) : (
                meta.map((post) => (
                  <div key={post.id}>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                    <br />
                  </div>
                ))
              )}
            </div>
            <br />
            <div className="ContainerPost">
              <h2>Too long Meta Description</h2>
              {longMeta.length === 0 ? (
                <p>No Post Found</p>
              ) : (
                longMeta.map((post) => (
                  <div key={post.id}>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                    <br />
                  </div>
                ))
              )}
            </div>
            <br />
            <div className="ContainerPost">
              <h2>Too long URL, more than 100 chars</h2>
              {longURL.length === 0 ? (
                <p>No Post Found</p>
              ) : (
                longURL.map((post) => (
                  <div key={post.id}>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                    <br />
                  </div>
                ))
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop:"5%" }} className="content">
            <br />
            <div className="ContainerPost">
              <h2>List of Posts without Featured Image</h2>
              {image.length === 0 ? (
                <p>No Post Found</p>
              ) : (
                image.map((post) => (
                  <div key={post.id}>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                    <br />
                  </div>
                ))
              )}
            </div>
            <br />
            <div className="ContainerPost">
              <h2>Too Short Posts, Below 250 words</h2>
              {shortPost.length === 0 ? (
                <p>No Post Found</p>
              ) : (
                shortPost.map((post) => (
                  <div key={post.id}>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                    <br />
                  </div>
                ))
              )}
            </div>
            <br />
            <div className="ContainerPost">
              <h2>Too Long Posts, More than 1500 words</h2>
              {longPost.length === 0 ? (
                <p>No Post Found</p>
              ) : (
                longPost.map((post) => (
                  <div key={post.id}>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                    <br />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
