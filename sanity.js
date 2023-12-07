import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "ud7azz75",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-05-03",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
// export const urlFor = (source) => imageUrlBuilder(client).image(source);

export default client;