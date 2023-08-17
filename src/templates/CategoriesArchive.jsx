import { graphql } from 'gatsby';

import { Hero } from '../components/Layout/Hero';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { CategoryCard } from '../components/Layout/Blog/Cards/CategoryCard';
import { SectionGridThreeCols } from '../components/Layout/sharedStyles/sectionStyles';

const placeHolderImage = "https://res.cloudinary.com/theupscale/image/upload/v1692019886/1_bj7yqq.jpg";

const defaultGatsbyImageData = {
  layout: "constrained",  // or any other default value for layout
  width: 2360,  // default width
  height: 1640,  // default height
  images: {
      sources: [],
      fallback: {
          src: placeHolderImage,
          srcSet: "",
          sizes: ""
      }
  },
  placeholder: {
      sources: [],
      fallback: {
          src: placeHolderImage,
          srcSet: "",
          sizes: ""
      }
  }
};

const defaultGatsbyImageMobile = {
  layout: "constrained",  // or any other default value for layout
  width: 100,  // default width
  height: 100,  // default height
  images: {
      sources: [],
      fallback: {
          src: "https://res.cloudinary.com/theupscale/image/upload/v1692019886/1_bj7yqq.jpg",
          srcSet: "",
          sizes: ""
      }
  },
  placeholder: {
      sources: [],
      fallback: {
          src: "https://res.cloudinary.com/theupscale/image/upload/v1692019886/1_bj7yqq.jpg",
          srcSet: "",
          sizes: ""
      }
  }
};


const CategoriesArchiveTemplate = ({
  data: {
    datoCmsCategoriesArchive: {
      hero: [{ heroTitle, heroSubtitle, heroAlt }],
      seo,
    },
    allDatoCmsCategory: { categoryNodes },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.seoImage?.seoImageUrl}
  >
    <Hero caption={heroAlt} title={heroTitle} subtitle={heroSubtitle} />
    <SectionGridThreeCols>
      {categoryNodes.map(({ id, title, shortDescription, coverImage }) => (
        <CategoryCard
          key={id}
          recordId={id}
          title={title}
          description={shortDescription}
          cardImg={coverImage?.gatsbyImageData || defaultGatsbyImageData}
          cardImgMobile={coverImage?.squaredImage || defaultGatsbyImageMobile}
          altImg={title}
        />
      ))}
    </SectionGridThreeCols>
  </PageWrapper>
);

export default CategoriesArchiveTemplate;

export const query = graphql`
  query CategoriesArchiveQuery($locale: String!) {
    datoCmsCategoriesArchive(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      hero {
        heroTitle
        heroSubtitle
        heroAlt
      }
    }
    allDatoCmsCategory(
      filter: { locale: { eq: $locale }, noTranslate: { ne: true } }
    ) {
      categoryNodes: nodes {
        locale
        id: originalId
        title
        shortDescription
        coverImage {
          gatsbyImageData(
            width: 300
            height: 120
            placeholder: NONE
            forceBlurhash: false
          )
          squaredImage: gatsbyImageData(
            width: 100
            height: 100
            imgixParams: { ar: "1", fit: "crop" }
          )
        }
      }
    }
  }
`;
