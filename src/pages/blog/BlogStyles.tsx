import styled from "styled-components";
import { AppTheme } from "../../theme";
declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
export const BlogMainPage = styled.div`
  background: ${(props) => props.theme.colorBgPink};
  min-height: 100vh;
  color: ${(props) => props.theme.text};
`;

export const BlogHeroContainer = styled.div`
  //   min-height: 50vh;
  padding-top: 20px;
`;

export const BlogButton = styled.button`
  border: none;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.borderRadius}px;
  font-size: ${(props) => props.theme.fontSizeMed}px;
  padding: 8px;
  background: ${(props) => props.theme.colorBgPink};
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 4px;
  color: ${(props) => props.theme.text};
`;
export const BlogBodyPage = styled.div`
  padding: ${(props) => props.theme.paddingLg}px;
  padding-top: ${(props) => props.theme.paddingLg}px;
  background: ${(props) => props.theme.colorBg};
  border: 2px solid ${(props) => props.theme.borderColor};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  min-height: 100vh;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  transition: 0.3s;
`;

export const BlogTopBar = styled.div`
  width: 100%;
  position: relative;
  // padding: 16px 0;
  font-size: ${(props) => props.theme.fontSizeLgg}px;
  font-weight: bold;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: center;
`;

export const BlogTopBarSubtitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeMed}px;
  color: ${(props) => props.theme.textSecondary};
`;

export const BlogEntriesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
`;
export const BlogEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const BlogEntryImagesContainer = styled.div``;

export const BlogEntryTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizeLg}px;
  font-weight: bold;
`;

export const BlogEntryContent = styled.div`
  width: 100%;
  text-wrap: wrap;
`;

export const BlogEntryLocation = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-size: ${(props) => props.theme.fontSizeSmall}px;
`;

export const BlogCommentContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BlogCommentBox = styled.div`
  border: 2px solid ${(props) => props.theme.borderColor};
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius}px;
  gap: 8px;
  padding: ${(props) => props.theme.paddingMed}px;
`;

export const BlogCommentInput = styled.input`
  background: ${(props) => props.theme.colorBg};
  padding: ${(props) => props.theme.paddingSmall}px;
  flex: 1;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const BlogCommentButton = styled.button`
  border: none;
  background: ${(props) => props.theme.colorBgPink};
  padding: ${(props) => props.theme.paddingSmall}px
    ${(props) => props.theme.paddingMed}px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.borderRadius}px;
  font-size: ${(props) => props.theme.fontSizeMed}px;
`;

export const BlogCommentDeleteButton = styled.button`
  border: none;
  // border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.borderRadius}px;
  background: ${(props) => props.theme.colorBg};
  display: flex;
`;
