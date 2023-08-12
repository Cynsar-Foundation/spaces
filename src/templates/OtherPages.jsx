import { graphql } from 'gatsby';

import { StructuredText } from 'react-datocms';

import { PageWrapper } from '../components/Layout/PageWrapper';
import { Hero } from '../components/Layout/Hero';
import { Navigator } from '../components/Navigator';
import { RichText } from '../components/Layout/RichText';
import {
  SectionGridThreeCols,
  SectionFlexTwoCols,
  SectionFlexTwoColsReverse,
  ColumnFlex,
  GridTextBox,
  NoImage,
} from '../components/Layout/sharedStyles/sectionStyles';
import {
  HeadingMedium,
  HeadingSmallWithTip,
} from '../components/Layout/sharedStyles/headingStyles';

const DEFAULT_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBg8SChEQEAgVDg0NDRQOFRISFg0YFxMZGBYTFhUaHysjJh0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHBANHC8cFhwvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABkAFQMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAABQIDBP/EAB0QAAICAgMBAAAAAAAAAAAAAAACAQQDMhESIQX/xAAXAQEBAQEAAAAAAAAAAAAAAAADAgQA/8QAGhEAAwADAQAAAAAAAAAAAAAAAAECAxESE//aAAwDAQACEQMRAD8AS4U5KLi+GyrEcEbqL0BrI9miMK5EvUCbT6BXowHhQ5rzEQVX8qqhKvqY/paCVC2dF1yZlZGgCjFqBXCBds//2Q==";

const OtherPagesTemplate = ({
  data: {
    datoCmsOtherPage: { seo, structuredBody },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.seoImage?.seoImageUrl}
  >
    {structuredBody?.value && (
      <StructuredText
        data={structuredBody}
        renderBlock={({
          record: {
            __typename,
            heroAlt,
            heroTitle,
            heroSubtitle,
            image,
            wloudinary,
            title,
            text,
            firstFeatureTitle,
            firstFeatureDescription,
            secondFeatureTitle,
            secondFeatureDescription,
            thirdFeatureTitle,
            thirdFeatureDescription,
          },
        }) => {
          switch (__typename) {
            case 'DatoCmsHero':
              return (
                <Hero
                  caption={heroAlt}
                  title={heroTitle}
                  subtitle={heroSubtitle}
                />
              );
            case 'DatoCmsSectionImageLeft':
              return (
                <SectionFlexTwoCols>
                  <ColumnFlex hasImg className={!image && !wloudinary ? NoImage : ''}>
                    {wloudinary  ? (
                       <img src={JSON.parse(wloudinary).secure_url} alt={wloudinary.alt || "Cloudinary Image"} 
                       style={{ width: '150px'}}
                       /> 
                    ) : image ? ( <img src={(image && image.url) ? image.url : DEFAULT_IMAGE} alt={(image && image.alt) ? image.alt : "Default Image Description"} />
                          ): null }
                  </ColumnFlex>
                  <ColumnFlex>
                    <GridTextBox as="div">
                      <HeadingMedium>{title}</HeadingMedium>
                      <RichText as="div">
                        <StructuredText
                          data={text}
                          renderLinkToRecord={({
                            record: { id },
                            children,
                            transformedMeta,
                          }) => (
                            <Navigator {...transformedMeta} recordId={id}>
                              {children}
                            </Navigator>
                          )}
                        />
                      </RichText>
                    </GridTextBox>
                  </ColumnFlex>
                </SectionFlexTwoCols>
              );
            case 'DatoCmsSectionImageRight':
              return (
                <SectionFlexTwoColsReverse>
                  <ColumnFlex>
                    <GridTextBox as="div">
                      <HeadingMedium>{title}</HeadingMedium>
                      <RichText as="div">
                        <StructuredText
                          data={text}
                          renderLinkToRecord={({
                            record: { id },
                            children,
                            transformedMeta,
                          }) => (
                            <Navigator {...transformedMeta} recordId={id}>
                              {children}
                            </Navigator>
                          )}
                        />
                      </RichText>
                    </GridTextBox>
                  </ColumnFlex>
                  <ColumnFlex hasImg>
                  {wloudinary  ? (
                       <img src={JSON.parse(wloudinary).secure_url} alt={wloudinary.alt || "Cloudinary Image"} 
                       style={{ width: '150px'}}
                       /> 
                    ) : image ? ( <img src={(image && image.url) ? image.url : DEFAULT_IMAGE} alt={(image && image.alt) ? image.alt : "Default Image Description"} />
                          ): null }
                  </ColumnFlex>
                </SectionFlexTwoColsReverse>
              );
            case 'DatoCmsThreeFeaturesSet':
              return (
                <SectionGridThreeCols>
                  <GridTextBox small>
                    <HeadingSmallWithTip>
                      {firstFeatureTitle}
                    </HeadingSmallWithTip>
                    <RichText>{firstFeatureDescription}</RichText>
                  </GridTextBox>
                  <GridTextBox small>
                    <HeadingSmallWithTip>
                      {secondFeatureTitle}
                    </HeadingSmallWithTip>
                    <RichText>{secondFeatureDescription}</RichText>
                  </GridTextBox>
                  <GridTextBox small>
                    <HeadingSmallWithTip>
                      {thirdFeatureTitle}
                    </HeadingSmallWithTip>
                    <RichText>{thirdFeatureDescription}</RichText>
                  </GridTextBox>
                </SectionGridThreeCols>
              );
            default:
              return null;
          }
        }}
      />
    )}
  </PageWrapper>
);

export default OtherPagesTemplate;

export const query = graphql`
  query OtherPagesQuery($locale: String!, $id: String!) {
    datoCmsOtherPage(locale: { eq: $locale }, originalId: { eq: $id }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      structuredBody {
        value
        blocks {
          ... on DatoCmsHero {
            id: originalId
            __typename
            heroTitle
            heroSubtitle
            heroAlt
          }
          ... on DatoCmsSectionImageLeft {
            __typename
            id: originalId
            title
            wloudinary
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                }
                ... on DatoCmsHomepage {
                  id: originalId
                }
              }
            }
          }
          ... on DatoCmsSectionImageRight {
            __typename
            id: originalId
            title
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                }
                ... on DatoCmsHomepage {
                  id: originalId
                }
              }
            }
          }
          ... on DatoCmsThreeFeaturesSet {
            __typename
            id: originalId
            firstFeatureTitle
            firstFeatureDescription
            secondFeatureTitle
            secondFeatureDescription
            thirdFeatureTitle
            thirdFeatureDescription
          }
        }
      }
    }
  }
`;
