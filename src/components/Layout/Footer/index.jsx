import { Fragment } from 'react';

import { graphql, useStaticQuery, } from 'gatsby';

import { renderNodeRule } from 'react-datocms';

import { StructuredText } from 'react-datocms';

import { usePageLocale } from '../../../hooks/usePageLocale';

import { Wrapper, Container, Column } from './styles';

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsFooter {
        nodes {
          id: originalId
          textLeft {
            value
          }
          textRight {
            value
          }
          aboutSection{
            value
          }
          termsContent{
            value
          }
          locale
        }
      }
    }
  `);

  const { pageLocale } = usePageLocale();


  const {
    allDatoCmsFooter: { nodes },
  } = data;
  return (
    <Wrapper>
      <Container>
        {nodes
          .filter(({ locale }) => locale === pageLocale)
          .map(
            ({
              id,
              textLeft: { value: textLeftValue },
              textRight: { value: textRightValue },
              aboutSection: {value: aboutSectionValue},
              termsContent: {value: termsContentValue}
            }) => (
              <Fragment key={id}>
                <Column>
                  <StructuredText data={aboutSectionValue} />
                  <StructuredText data={textLeftValue} />
                  
                </Column>
                <Column>
                  <StructuredText data={textRightValue} />
                  <StructuredText data={termsContentValue} />
                  
                </Column>
              </Fragment>
            )
          )}
      </Container>
    </Wrapper>
  );
};



