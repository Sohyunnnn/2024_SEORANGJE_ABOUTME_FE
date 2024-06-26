import Masonry from "react-masonry-css";
import DiaryFrame from "../assets/DiaryPage/diary.svg";
//import { dummyData } from '../api/diary/diaryDummy';
import styled from "styled-components";
import getMyImage from "../api/diary/getMyImage";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
`;

const Frame = styled.img`
  position: absolute;
  z-index: -1;
`;

const ImageCardBaseStyle = {
  marginBottom: "16px",
  overflow: "hidden",
  textAlign: "center",
};

const StyledImage = styled.img`
  object-fit: cover;
  display: block;
  width: 150px;
  height: 150px;
`;

const Title = styled.p`
  margin-top: 18px;
  padding: 0 8px;
  color: #ffc700;
  text-align: center;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;
  font-family: "S-CoreDreams";
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const breakpointColumnsObj = {
  default: 2,
};

const Letter = styled.p`
  color: #000;
  text-align: center;
  font-family: "PFStardust";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  width: 118px;
`;

const getImageCardStyle = (index) => {
  switch (index) {
    case 0:
      return { ...ImageCardBaseStyle, width: "150px" };
    case 1:
      return { ...ImageCardBaseStyle, width: "150px" };
    case 2:
      return { ...ImageCardBaseStyle, width: "150px" };
    case 3:
      return { ...ImageCardBaseStyle, width: "157px" };
    case 4:
      return { ...ImageCardBaseStyle, width: "136px" };
    default:
      return { ...ImageCardBaseStyle, width: "150px" };
  }
};

const Diary = ({ myimage_id }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyImage(myimage_id);
        console.log("imageData:", data);
        setImageData(data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [myimage_id]);

  if (!imageData) {
    return (
      <Container>
        <div style={{ height: "700px", alignContent: "center" }}>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Frame src={DiaryFrame} alt="DiaryFrame" />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {Object.entries(imageData.imageFileName).map(([key, title], index) => (
          <div
            key={index}
            className={`my-masonry-grid_item arry${index}`}
            style={getImageCardStyle(index)}
          >
            <StyledImage
              src={imageData.imageFilePaths[key]}
              alt={title}
              style={
                index === 2
                  ? { width: "160px", height: "160px" }
                  : index === 4
                  ? { width: "136px", height: "136px" }
                  : {}
              }
            />
            <Title>{title}</Title>
          </div>
        ))}
        <Letter className={`my-masonry-grid_item arry${5}`}>
          <div>
            <p>{imageData.imageComment}</p>
            <p>from. {imageData.guestNickname}</p>
          </div>
        </Letter>
      </Masonry>
    </Container>
  );
};

Diary.propTypes = {
  myimage_id: PropTypes.number.isRequired,
};

export default Diary;
