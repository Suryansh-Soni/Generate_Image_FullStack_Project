import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar.jsx";
import ImageCard from "../components/ImageCard.jsx";
import { GetPost } from "../api";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Home = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterPost, setFilterPost] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    await GetPost()
      .then((res) => {
        setPost(res?.data?.data);
        setFilterPost(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      setFilterPost(post);
      return;
    }

    const filteredPosts = post.filter((item) => {
      const promptMatch = item?.prompt?.toLowerCase().includes(searchTerm);
      const nameMatch = item?.name?.toLowerCase().includes(searchTerm);

      return promptMatch || nameMatch;
    });

    setFilterPost(filteredPosts);
  }, [post, search]);
  useEffect(() => {
    console.log("Search:", search);
  }, [search]);
  return (
    <Container>
      <Headline>Explore Popular Post !</Headline>
      <Span>Generate With AI</Span>
      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filterPost.length > 0 ? (
              <>
                {filterPost
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <ImageCard key={item._id} item={item} />
                  ))}
              </>
            ) : (
              <>No Posts Found !!</>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
