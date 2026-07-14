import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm.jsx";
import GeneratedImageCard from "../components/GeneratedImageCard.jsx";

const Container = styled.div`
  min-height: 100%;
  overflow-y: auto;

  background: ${({ theme }) => theme.bg};

  padding: 60px 32px 80px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 900px) {
    padding: 28px 16px 40px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1350px;

  display: flex;
  gap: 36px;
  align-items: stretch;

  padding: 32px;

  border-radius: 28px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: 0 16px 40px ${({ theme }) => theme.shadow};

  transition: all 0.35s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 22px 50px ${({ theme }) => theme.shadow};
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 22px;
    gap: 28px;
  }

  @media (max-width: 600px) {
    padding: 18px;
    border-radius: 22px;
  }
`;

const CreatePost = () => {
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          setGenerateImageLoading={setGenerateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
          generateImageLoading={generateImageLoading}
        />

        <GeneratedImageCard src={post?.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
