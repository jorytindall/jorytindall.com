// import { graphql } from 'gatsby'

// export const pageQuery = graphql`
//     {
//         page: sanityPage(id: { eq: $id }) {
//             title
//             id
//             showTitle
//             megaHeadline
//             slug {
//                 current
//             }
//             moduleContent {
//                 ... on SanityRichText {
//                     _key
//                     _type
//                     _rawContent(resolveReferences: { maxDepth: 5 })
//                 }
//                 ... on SanityPortfolioList {
//                     _key
//                     _type
//                     items {
//                         item {
//                             _key
//                             title
//                             client
//                             slug {
//                                 current
//                             }
//                             featuredImage {
//                                 alternativeText
//                                 asset {
//                                     gatsbyImageData(
//                                         layout: CONSTRAINED,
//                                         placeholder: BLURRED,
//                                         fit: FILL,
//                                     )
//                                 }
//                             }
//                         }
//                     }
//                 }
//                 ... on SanityForm {
//                     _key
//                     _type
//                     method
//                     netlify
//                     title
//                     fields {
//                         ... on SanityInput {
//                             _key
//                             _type
//                             label
//                             placeholder
//                             type
//                         }
//                         ... on SanitySubmit {
//                             _key
//                             _type
//                             text
//                         }
//                         ... on SanityTextarea {
//                             _key
//                             _type
//                             label
//                             name
//                             placeholder
//                         }
//                     }
//                     action {
//                         _type
//                         slug {
//                             current
//                         }
//                     }
//                 }
//                 ...on SanityGallery {
//                     _key
//                     _type
//                     columns
//                     images {
//                         _key
//                         caption
//                         alternativeText
//                         asset {
//                             _key
//                             gatsbyImageData(
//                                 width: 2000,
//                                 placeholder: BLURRED,
//                                 fit: FILLMAX,
//                             )
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `

// export const portfolioQuery = graphql`
//     query PortfolioProjectsQuery($id: String!) {
//         project: sanityPortfolioProject(id: { eq: $id}) {
//             title
//             client
//             tools
//             timeline
//             types
//             overview
//             externalLink
//             id
//             roles
//             shareImage {
//                 asset {
//                     url
//                 }
//             }
//             slug {
//                 current
//             }
//             featuredImage {
//                 alternativeText
//                 asset {
//                     gatsbyImageData(
//                         width: 2000,
//                         placeholder: BLURRED,
//                         fit: FILLMAX,
//                     )
//                 }
//             }
//             moduleContent {
//                 ... on SanityBrandLogoBlock {
//                     _key
//                     _type
//                 }
//                 ... on SanityForm {
//                     _key
//                     _type
//                     method
//                     netlify
//                     title
//                     fields {
//                         ... on SanityInput {
//                             _key
//                             _type
//                             label
//                             placeholder
//                             type
//                         }
//                         ... on SanitySubmit {
//                             _key
//                             _type
//                             text
//                         }
//                         ... on SanityTextarea {
//                             _key
//                             _type
//                             label
//                             name
//                             placeholder
//                         }
//                     }
//                     action {
//                         _type
//                         slug {
//                             current
//                         }
//                     }
//                 }
//                 ... on SanityFullWidthImage {
//                     _key
//                     _type
//                     maxHeight
//                     image {
//                     alternativeText
//                     asset {
//                         gatsbyImageData(
//                         fit: FILLMAX
//                         formats: [AUTO, WEBP]
//                         layout: FULL_WIDTH
//                         placeholder: BLURRED
//                         )
//                     }
//                     }
//                 }
//                 ...on SanityGallery {
//                     _key
//                     _type
//                     columns
//                     images {
//                         _key
//                         caption
//                         alternativeText
//                         asset {
//                             _key
//                             gatsbyImageData(
//                                 width: 2000,
//                                 placeholder: BLURRED,
//                                 fit: FILLMAX,
//                             )
//                         }
//                     }
//                 }
//                 ... on SanityImpactBlock {
//                     _key
//                     _type
//                 }
//                 ... on SanityMainImage {
//                     _key
//                     _type
//                 }
//                 ... on SanityRichText {
//                     _key
//                     _type
//                     _rawContent(resolveReferences: { maxDepth: 5 })
//                 }
//                 ... on SanityResults {
//                     _key
//                     _type
//                     title
//                     description
//                     resultItems {
//                         _key
//                         description
//                         headline
//                         metric
//                         percentageDirection
//                     }
//                 }
//                 ... on SanityFeatures {
//                     _key
//                     _type
//                     columns
//                     title
//                     featureItems {
//                         title
//                         description
//                         _key
//                         image {
//                             alternativeText
//                             caption
//                             asset {
//                                 _key
//                                 gatsbyImageData(
//                                     width: 2000,
//                                     placeholder: BLURRED,
//                                     fit: FILLMAX,
//                                 )
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `

// export const landingPageQuery = graphql`
//     query LandingPageQuery($id: String!) {
//         landingPage: sanityLandingPage(id: { eq: $id }) {
//             title
//             id
//             slug {
//                 current
//             }
//         }
//     }
// `
