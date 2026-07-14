import React from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  min-height: 520px;

  border-radius: 24px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 18px 45px ${({ theme }) => theme.shadow};

  position: relative;
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 55px ${({ theme }) => theme.shadow};
  }
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;

  padding: 40px;
`;

const Icon = styled.div`
  width: 95px;
  height: 95px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 42px;

  background: ${({ theme }) => theme.primary + "20"};
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 320px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function GeneratedImageCard({ src, loading }) {
  return (
    <Container>
      {loading ? (
        <Placeholder>
          <CircularProgress size={42} />
          <Title>Generating Image...</Title>
          <Desc>
            AI is creating your artwork. This usually takes a few seconds.
          </Desc>
        </Placeholder>
      ) : src ? (
        <Image src={src} alt="Generated" />
      ) : (
        <Placeholder>
          <Icon>🎨</Icon>

          <Title>Your AI Image</Title>

          <Desc>
            Enter a prompt and click <b>Generate Image</b> to preview your
            creation here.
          </Desc>
        </Placeholder>
      )}
    </Container>
  );
}

export default GeneratedImageCard;
