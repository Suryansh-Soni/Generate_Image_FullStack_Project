import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm.jsx";
import GeneratedImageCard from "../components/GeneratedImageCard.jsx";

const Container = styled.div`
  min-height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  padding: 40px 30px 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 20px 14px 40px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;

  display: flex;
  gap: 35px;
  align-items: stretch;

  padding: 28px;
  border-radius: 28px;

  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 18px 45px ${({ theme }) => theme.shadow};

  transition: 0.3s ease;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 20px;
    gap: 25px;
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

        <GeneratedImageCard
          src={post?.photo}
          loading={generateImageLoading}
        />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;