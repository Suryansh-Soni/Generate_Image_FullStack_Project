import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";
import { Avatar } from "@mui/material";

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  cursor: pointer;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: 0 12px 35px ${({ theme }) => theme.shadow};

  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 45px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}55;
  }

  &:nth-child(7n + 1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
  }
`;

const StyledImage = styled(LazyLoadImage)`
  width: 100%;
  display: block;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;

  opacity: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding: 18px;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.88),
    rgba(0, 0, 0, 0.45),
    rgba(0, 0, 0, 0.1)
  );

  backdrop-filter: blur(4px);

  transition: all 0.35s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  color: white;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: white;
  font-weight: 600;
`;

const DownloadButton = styled.div`
  width: 42px;
  height: 42px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.12);

  backdrop-filter: blur(8px);

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primary};
    transform: scale(1.12);
  }
`;

const ImageCard = ({ item }) => {
  return (
    <Card>
      <StyledImage alt={item?.prompt} src={item?.photo} width="100%" />

      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>

        <Bottom>
          <Author>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#7C3AED",
                fontWeight: 700,
              }}
            >
              {item?.name?.charAt(0).toUpperCase()}
            </Avatar>

            {item?.name || "Anonymous"}
          </Author>

          <DownloadButton
            onClick={() => FileSaver.saveAs(item?.photo, "AI_Image.jpg")}
          >
            <DownloadRounded style={{ color: "white", fontSize: 22 }} />
          </DownloadButton>
        </Bottom>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
