import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
export default function Dashboard() {
  const [posts, setPosts] = useState(null);
  const [pages, setPages] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [tags, setTags] = useState(null);
  const [latestPosts, setLatestPost] = useState([]);
  const [postMonth, setPostMonth] = useState([]);
  const [postPerMonth, setPostPerMonth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function postData() {
      try {
        const post = await axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
        );
        const totalPosts = post.data.posts.length;
        setPosts(totalPosts);
        const sorted = post.data.posts.sort(
          (a, b) => b.created_at - a.created_at
        );
        const topPost = sorted.slice(0, 5).map((post) => ({
          title: post.title,
          url: post.url,
        }));
        setLatestPost(topPost);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const postMonth = sorted.map((post) => ({
          month: new Date(post.created_at).getMonth(),
          monthName: monthNames[new Date(post.created_at).getMonth()],
        }));
        let counts = postMonth.reduce((acc, curr) => {
          const str = JSON.stringify(curr);
          acc[str] = (acc[str] || 0) + 1;
          return acc;
        }, {});
        var totalMonths = [];
        for (var i = 0; i < Object.keys(counts).length; i++) {
          totalMonths.push(counts[Object.keys(counts)[i]]);
        }
        setPostPerMonth(totalMonths);
        var months = [];
        for (const [key] of Object.entries(counts)) {
          var newkey = JSON.parse(key);
          months.push(monthNames[newkey.month]);
        }
        setPostMonth(months);
        const page = await axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/pages/?key=22444f78447824223cefc48062"
        );
        const totalPages = page.data.pages.length;
        setPages(totalPages);
        const author = await axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/authors/?key=22444f78447824223cefc48062"
        );
        const totalAuthors = author.data.authors.length;
        setAuthors(totalAuthors);
        const tag = await axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/tags/?key=22444f78447824223cefc48062"
        );
        const totalTags = tag.data.tags.length;
        setTags(totalTags);
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
          <h1 className="header">Dashboard</h1>
          <br />
          <div>
            <Link to="/postpage" className="button">
              Go To Post Page
            </Link>
          </div>
          <br />
          <br />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="Container">
              <h2>Totol Number of Posts</h2>
              <h3>{posts}</h3>
            </div>
            <br />
            <div className="Container">
              <h2>Totol Number of Pages</h2>
              <h3>{pages}</h3>
            </div>
            <br />
            <div className="Container">
              <h2>Totol Number of Authors</h2>
              <h3>{authors}</h3>
            </div>
            <br />
            <div className="Container">
              <h2>Totol Number of Tags</h2>
              <h3>{tags}</h3>
            </div>
          </div>
          <br />
          <div className="top5">
            <h2>Latest 5 Published posts List</h2>
            {latestPosts.map((post) => (
              <div key={post.id}>
                <a href={post.url} target="_blank" rel="noreferrer">
                  {post.title}
                </a>
                <br />
              </div>
            ))}
          </div>
          <br />
          <div className="bar">
            <Bar
              data={{
                labels: postMonth,
                datasets: [
                  {
                    data: postPerMonth,
                    label: "Posts per month Chart",
                  },
                ],
              }}
              width={50}
              height={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}
