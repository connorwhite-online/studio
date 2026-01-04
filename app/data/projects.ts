export interface Project {
  id: string;
  title: string;
  client?: string;
  clientDescription?: string;
  clientLink?: string; // URL to client's website
  logo?: string; // Path to 30px square logo
  coverImage: string; // Path to 500x300 cover image
  overview: string;
  team: string[];
}

export const projects: Project[] = [
  {
    id: `tyb-onboarding`,
    title: `Onboarding brands, in record time.`,
    client: `Try Your Best`,
    clientDescription: `Try Your Best (TYB) is building the future of brand loyalty. Fans connect with the brands they love, shop products, and earn rewards.`,
    clientLink: `https://tryyourbest.com`,
    logo: `/media/projects/logos/tyb-logo.png`,
    coverImage: `/media/projects/tyb-onboarding/tyb-onboarding-cover.png`,
    overview: `Launching signed brands on TYB was taking  46 days on average... we reduced onboarding to 1 day. By improving our Shopify integration flow, cutting low-adoption/high-friction required 3D assets, and streamlining important setup details, we dramatically decreased time-to-value from sale to launch.`,
    team: [`Connor White - Product Designer, Interaction Engineer`, `Kirill Gorin - Tech Lead, Engineer`, `Victor Oliveira - Engineer`, `Thiago Lemos - Backend Engineer`, `Julia Ama - Product Manager`]
  },
  {
    id: `tyb-integrations`,
    title: `Effortless Integrations`,
    client: `Try Your Best`,
    clientDescription: `Try Your Best (TYB) is building the future of brand loyalty. Fans connect with the brands they love, shop products, and earn rewards.`,
    clientLink: `https://tyb.xyz`,
    logo: `/media/projects/logos/tyb-logo.png`,
    coverImage: `/media/projects/tyb-integrations/tyb-integrations-cover.png`,
    overview: `TYB’s integrations with Shopify, Klaviyo, and Attentive play a massive role in the platform’s value to brands and fans. By automating key parts of the integration, and controlling information hierarchy within simplified steps, powering TYB brand communities with data became a much simpler affair.`,
    team: [`Connor White - Product Designer`, `Victor Oliveira - Lead Engineer`, `Kenzo Izume - Integration Engineer`]
  },
];

