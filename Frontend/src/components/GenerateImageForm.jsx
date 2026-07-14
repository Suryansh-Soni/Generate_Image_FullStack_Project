import React, { useState } from "react";
import styled from "styled-components";
import Button from "./button.jsx";
import TextInput from "./TextInput.jsx";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CreatePost, GenerateImage } from "../api/index.js";

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;

  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
`;

const Desc = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Note = styled.div`
  padding: 14px 18px;
  border-radius: 14px;

  background: ${({ theme }) => theme.hover};
  border: 1px solid ${({ theme }) => theme.border};

  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  border-radius: 12px;

  background: rgba(239, 83, 80, 0.12);
  border: 1px solid rgba(239, 83, 80, 0.35);

  color: ${({ theme }) => theme.red};
  font-size: 14px;
  font-weight: 500;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setGenerateImageLoading,
  setCreatePostLoading,
  generateImageLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const generateImage = async () => {
    try {
      setGenerateImageLoading(true);
      setError("");

      const response = await GenerateImage({
        prompt: post.prompt,
      });

      const mimeType = response.data.mimeType || "image/png";

      setPost((previousPost) => ({
        ...previousPost,
        photo: `data:${mimeType};base64,${response.data.photo}`,
      }));
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to generate image");
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createPost = async () => {
    try {
      setCreatePostLoading(true);
      setError("");

      await CreatePost(post);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to create post");
    } finally {
      setCreatePostLoading(false);
    }
  };

  return (
    <Form>
      <Top>
        <Title>Create AI Artwork</Title>

        <Desc>
          Describe anything you can imagine and let AI generate a unique image.
          When you're happy with the result, share it with the community.
        </Desc>
      </Top>

      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(event) =>
            setPost({
              ...post,
              name: event.target.value,
            })
          }
        />

        <TextInput
          label="Image Prompt"
          placeholder="A futuristic city at sunset with flying cars..."
          name="prompt"
          textArea
          rows="8"
          value={post.prompt}
          handelChange={(event) =>
            setPost({
              ...post,
              prompt: event.target.value,
            })
          }
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Note>
          ✨ Generate your image first, preview it, and then publish it to the
          community showcase.
        </Note>
      </Body>

      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          flex
          isLoading={generateImageLoading}
          isDisabled={!post.prompt.trim()}
          onClick={generateImage}
        />

        <Button
          text="Publish Post"
          leftIcon={<CreateRounded />}
          type="secondary"
          flex
          isLoading={createPostLoading}
          isDisabled={!post.name.trim() || !post.photo || !post.prompt.trim()}
          onClick={createPost}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
