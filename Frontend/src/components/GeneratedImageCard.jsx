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

  position: relative;

  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 14px 35px ${({ theme }) => theme.shadow};

  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 22px 50px ${({ theme }) => theme.shadow};
  }
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 18px;
  text-align: center;

  padding: 40px;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 42px;

  background: ${({ theme }) => theme.hover};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.primary};

  box-shadow: 0 8px 25px ${({ theme }) => theme.shadow};

  transition: all 0.3s ease;

  ${Container}:hover & {
    transform: scale(1.08) rotate(8deg);
    box-shadow: 0 12px 30px ${({ theme }) => theme.shadow};
  }
`;

const Title = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 340px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: transform 0.5s ease;

  ${Container}:hover & {
    transform: scale(1.02);
  }
`;

function GeneratedImageCard({ src, loading }) {
  return (
    <Container>
      {loading ? (
        <Placeholder>
          <CircularProgress size={44} sx={{ color: "#F97316" }} />

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
