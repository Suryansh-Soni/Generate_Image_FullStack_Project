import React from "react";
import styled from "styled-components";
import Button from "./button.jsx";
import TextInput from "./TextInput.jsx";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
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

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setGenerateImageLoading,
  setCreatePostLoading,
  generateImageLoading,
}) => {
  // const navigate = useNavigate();
  // const [error, setError] = useState("");

  const generateImage = async () => {
    setGenerateImageLoading(true);
    // setError("");
    // await GenerateImageFromPrompt({ prompt: post.prompt })
    //   .then((res) => {
    //     setPost({
    //       ...post,
    //       photo: `data:image/jpeg;base64,${res?.data?.photo}`,
    //     });
    //     setGenerateImageLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error?.response?.data?.message);
    //     setGenerateImageLoading(false);
    //   });
  };
  const createPost = async () => {
    setcreatePostLoading(true);
    // setError("");
    // await CreatePost(post)
    //   .then((res) => {
    //     navigate("/");
    //     setcreatePostLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error?.response?.data?.message);
    //     setcreatePostLoading(false);
    //   });
  };

  return (
    <Form>
      <Top>
        <Title>Generate img by prompting </Title>
        <Desc>Write your prompt </Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image"
          name="prompt"
          textArea
          rows="8"
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {/* {error && <div style={{ color: "red" }}>{error}</div>}* You can post the
        AI Generated Image to showcase in the community! */}
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          flex
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={(e) => generateImage()}
        />
        <Button
          text="Post Image"
          leftIcon={<CreateRounded />}
          type="secondary"
          flex
          isDisabled={
            post.name === "" || post.photo === "" || post.prompt === ""
          }
          isLoading={createPostLoading}
          onClick={() => createPost()}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
