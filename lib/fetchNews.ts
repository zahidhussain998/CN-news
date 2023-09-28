import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByimage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  const res = await fetch("https://sissach.stepzen.net/api/idolized-meerkat/__graphql", {
    method: "POST",
    cache: isDynamic ? "no-cache" : "default",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey sissach::stepzen.net+1000::91cc1402bb74191bf04ac90ca5704792affa6683d3b6ceb62e00931323d3e053`,
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: "6b69a2e56fa7cf2777cc7d07e7208a9a",
        categories: category,
        keywords: keywords,
      },
    }),
  });

  console.log("LOADING NEW DATA FROM API", category, keywords);

  const newsResponse = await res.json();

  const news = sortNewsByImage(newsResponse.data.myQuery);
  console.log("NewsResponse:", newsResponse);

  return news;
};

export default fetchNews;
