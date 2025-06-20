import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import { ReloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getBlogEntries } from "../../services/hygraph";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { token } from "../../theme";
import { ThemeProvider } from "styled-components";
import {
  HomeBigCardRefreshButton,
  HomeFactContainer,
  HomeFactText,
  HomeFactTitle,
  HomePage,
  HomePartnerSubText,
  HomePartnerSubTitle,
  HomePartnerText,
  HomeSpaceContainer,
  HomeStatsBigCard,
  HomeStatsBigCardDate,
  HomeStatsBigCardDisplayPic,
  HomeStatsBigCardLocation,
  HomeStatsBigCardName,
  HomeStatsBigCardStatus,
  HomeStatsCard,
  HomeStatsCardDescription,
  HomeStatsCardNumber,
  HomeStatsContainer,
  SpacePictureContainer,
  SpacePictureExplanation,
  SpacePictureTitle,
} from "./HomeStyles";
import { useUser } from "../../contexts/UserContext";
import {
  addLineBreaksAfterSentences,
  calculateDistance,
  formatFirebaseDate,
} from "../../utils/utils";
import dayjs from "dayjs";
import { getAstronomyPictureOfTheDay } from "../../services/nasa";
import { NasaApodObject } from "../../types/nasaTypes";
import { collection, getDocs } from "firebase/firestore";
import { AgendaItemType } from "../agenda/Agenda";
import { getFact } from "../../services/ninjaApi/fact";
import { FactModel } from "../../types/ninjaApiTypes";

const Home: React.FC = () => {
  const { user, userPartner, spotifyToken, loading, getUserContextData } =
    useUser();

  console.log({ user });
  const [daysTogetherCount, setDaysTogetherCount] = useState(0);
  const [gayLevel, setGayLevel] = useState<number>(0);
  const [blogCount, setBlogCount] = useState<number>(0);
  const [distance, setDistance] = useState<string>("");
  const [apodData, setApodData] = useState<NasaApodObject>();
  const [recentEntries, setRecentEntries] = useState<any[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [ninjaFacts, setNinjaFacts] = useState<FactModel[]>([]);
  const navigate = useNavigate();
  const anniversaryDate = new Date("2024-06-14");
  const [agendaLength, setAgendaLength] = useState<number>(0);

  const calculateDaysTogether = () => {
    const today = new Date();
    const timeDifference = today.getTime() - anniversaryDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setDaysTogetherCount(daysDifference);
  };
  const calculateGayLevels = () => {
    const percentage = Math.floor(Math.random() * 100 + 69);
    setGayLevel(percentage);
  };
  const fetchRecentEntries = async () => {
    try {
      const results = await getBlogEntries();
      setRecentEntries(results.slice(0, 3));
      setBlogCount(results.length);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
    }
  };

  const getAPOD = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    try {
      const response = (await getAstronomyPictureOfTheDay({
        thumbs: true,
        date: formattedDate,
      })) as NasaApodObject;

      // Create the transformed response with line breaks
      const transformedResponse = {
        ...response,
        explanation: addLineBreaksAfterSentences(response.explanation),
      };

      // Set the transformed response, not the original
      setApodData(transformedResponse);
    } catch (e) {
      console.error("Error getting apod", e);
    }
  };

  const handleGetAllAgenda = async () => {
    try {
      const agendaRef = collection(db, "anniAppAgendaItems");
      const snapshot = await getDocs(agendaRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as AgendaItemType),
      }));
      console.log({ data });
      setAgendaLength(data.length);
    } catch (e) {
      console.error("Error getting agenda items", e);
    }
  };

  const handleGetFact = async () => {
    const facts = await getFact();
    setNinjaFacts(facts);
  };

  useEffect(() => {
    fetchRecentEntries();
    calculateDaysTogether();
    calculateGayLevels();
    handleGetAllAgenda();
    getAPOD();
    handleGetFact();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate(ROUTES.LOGIN.path);
      } else {
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user?.location && userPartner?.location) {
      const distance = calculateDistance(user.location, userPartner.location);
      setDistance(distance);
    }
  }, [user, userPartner]);

  const handleRefresh = () => {
    setIsSpinning(true);
    getUserContextData();
    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <ThemeProvider theme={token}>
      <HomePage>
        <HomeStatsContainer>
          <HomePartnerText>Stats</HomePartnerText>
          <HomeStatsBigCard>
            <HomeStatsBigCardDisplayPic src={user?.displayPicture} />
            <Flex vertical gap={8}>
              <HomeStatsBigCardName>
                {/* {user?.name || "Marcus"}{" "}
                 */}
                Me
              </HomeStatsBigCardName>
              <HomeStatsBigCardStatus>
                {user?.status ?? "--"}
              </HomeStatsBigCardStatus>
              <HomeStatsBigCardDate>
                {formatFirebaseDate(user?.lastUpdated) || "--:--"}
              </HomeStatsBigCardDate>
              <HomeStatsBigCardLocation>
                {distance} away
              </HomeStatsBigCardLocation>
            </Flex>
          </HomeStatsBigCard>
          <HomeStatsBigCard>
            <HomeBigCardRefreshButton
              isSpinning={isSpinning}
              onClick={handleRefresh}
            >
              <ReloadOutlined style={{ fontWeight: "bold" }} />
            </HomeBigCardRefreshButton>
            <HomeStatsBigCardDisplayPic src={userPartner?.displayPicture} />
            <Flex vertical gap={8}>
              <HomeStatsBigCardName>
                {userPartner?.name || "Marcus"}{" "}
              </HomeStatsBigCardName>
              <HomeStatsBigCardStatus>
                {userPartner?.status ?? "--"}
              </HomeStatsBigCardStatus>
              <HomeStatsBigCardLocation>
                {distance} away
              </HomeStatsBigCardLocation>
              <HomeStatsBigCardDate>
                {formatFirebaseDate(userPartner?.lastUpdated) || "--:--"}
              </HomeStatsBigCardDate>
            </Flex>
          </HomeStatsBigCard>
          <HomeStatsCard background={token.colorBgGreen}>
            <HomeStatsCardNumber>{daysTogetherCount}</HomeStatsCardNumber>
            <HomeStatsCardDescription>days togther</HomeStatsCardDescription>
          </HomeStatsCard>
          <HomeStatsCard background={token.colorBgYellow}>
            <HomeStatsCardNumber>{blogCount || "--"}</HomeStatsCardNumber>
            <HomeStatsCardDescription>bean entries</HomeStatsCardDescription>
          </HomeStatsCard>{" "}
          <HomeStatsCard background={token.colorBgVoliet}>
            <HomeStatsCardNumber>{agendaLength}</HomeStatsCardNumber>
            <HomeStatsCardDescription>agenda items</HomeStatsCardDescription>
          </HomeStatsCard>
          <HomeStatsCard background={token.colorBgPink}>
            <HomeStatsCardNumber>{gayLevel}%</HomeStatsCardNumber>
            <HomeStatsCardDescription>gay level</HomeStatsCardDescription>
          </HomeStatsCard>{" "}
        </HomeStatsContainer>
        {apodData && (
          <HomeSpaceContainer>
            <Flex vertical align="center" gap={8}>
              <HomePartnerSubTitle>The Daily</HomePartnerSubTitle>
              <HomePartnerText>Space Picture</HomePartnerText>
              <HomePartnerSubText>
                {dayjs().format("DD MMM YYYY")}
              </HomePartnerSubText>
            </Flex>
            <SpacePictureContainer src={apodData?.hdurl ?? apodData.url} />
            <Flex style={{ width: "100%" }} vertical gap={4}>
              <SpacePictureTitle>{apodData.title}</SpacePictureTitle>
              <SpacePictureExplanation>
                {apodData.explanation}
              </SpacePictureExplanation>
            </Flex>
            <Flex gap={8} align="center">
              <InfoCircleOutlined />
              Check back every day for a new picture!
            </Flex>
          </HomeSpaceContainer>
        )}

        {ninjaFacts[0] && (
          <HomeFactContainer>
            <HomeFactTitle>Random Fact</HomeFactTitle>
            <HomeFactText>{ninjaFacts[0].fact}</HomeFactText>
          </HomeFactContainer>
        )}
      </HomePage>
    </ThemeProvider>
  );
};

export default Home;
