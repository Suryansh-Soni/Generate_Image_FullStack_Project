import React, { useState } from "react";
import styled from "styled-components";
import Button from "./button.jsx";
import TextInput from "./TextInput.jsx";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CreatePost, GenerateImage } from "../api/index.js";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
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
        <Title>Generate image using a prompt</Title>
        <Desc>Describe the image you want to generate.</Desc>
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
          placeholder="Write a detailed image prompt"
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

        <div>You can post the generated image to the community showcase.</div>
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
          text="Post Image"
          leftIcon={<CreateRounded />}
          type="secondary"
          flex
          isDisabled={!post.name.trim() || !post.photo || !post.prompt.trim()}
          isLoading={createPostLoading}
          onClick={createPost}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
