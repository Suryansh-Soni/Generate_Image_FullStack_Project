import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar.jsx";
import ImageCard from "../components/ImageCard.jsx";
import { GetPost } from "../api";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

const Container = styled.div`
  min-height: 100%;
  overflow-y: auto;

  background: ${({ theme }) => theme.bg};

  padding: 60px 32px 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  @media (max-width: 768px) {
    padding: 28px 16px 40px;
    gap: 28px;
  }
`;

const Hero = styled.div`
  width: 100%;
  max-width: 900px;

  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Headline = styled.h1`
  margin: 0;

  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;

  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;

const Span = styled.span`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  margin: 0;

  font-size: 16px;
  line-height: 1.8;

  color: ${({ theme }) => theme.text_secondary};
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  min-width: 160px;

  padding: 20px;

  border-radius: 18px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: 0 10px 28px ${({ theme }) => theme.shadow};

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 16px 36px ${({ theme }) => theme.shadow};
  }
`;

const StatNumber = styled.div`
  font-size: 30px;
  font-weight: 800;

  color: ${({ theme }) => theme.primary};
`;

const StatText = styled.div`
  margin-top: 6px;

  font-size: 14px;

  color: ${({ theme }) => theme.text_secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1450px;

  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  width: 100%;

  display: grid;

  gap: 24px;

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

const EmptyState = styled.div`
  width: 100%;

  padding: 80px 20px;

  text-align: center;

  color: ${({ theme }) => theme.text_secondary};

  font-size: 18px;
`;

const ErrorMessage = styled.div`
  width: 100%;

  margin-bottom: 20px;

  padding: 14px 18px;

  border-radius: 14px;

  background: ${({ theme }) => `${theme.red}15`};

  border: 1px solid ${({ theme }) => `${theme.red}40`};

  color: ${({ theme }) => theme.red};

  text-align: center;
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

  return (
    <Container>
      <Hero>
        <Headline>
          Create Stunning Images with <Span>Artificial Intelligence</Span>
        </Headline>

        <Description>
          Explore creative AI-generated artwork from the community or search by
          prompt and creator. Get inspired and generate your own masterpiece.
        </Description>

        <Stats>
          <StatCard>
            <StatNumber>{post.length}</StatNumber>
            <StatText>Total Posts</StatText>
          </StatCard>

          <StatCard>
            <StatNumber>{filterPost.length}</StatNumber>
            <StatText>Showing</StatText>
          </StatCard>
        </Stats>
      </Hero>

      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />

      <Wrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading ? (
          <CircularProgress sx={{ color: "#F97316" }} />
        ) : (
          <CardWrapper>
            {filterPost.length > 0 ? (
              filterPost
                .slice()
                .reverse()
                .map((item) => <ImageCard key={item._id} item={item} />)
            ) : (
              <EmptyState>No posts found.</EmptyState>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
