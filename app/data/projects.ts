export interface Project {
  id: string;
  title: string;
  client?: string;
  clientDescription?: string;
  clientLink?: string; // URL to client's website
  logo?: string; // Path to 30px square logo
  coverImage: string; // Path to 500x300 cover image
  overview: string;
  team?: string[];
}

export const projects: Project[] = [
  {
    id: `tyb-onboarding`,
    title: `Onboarding brands, in record time`,
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
    title: `Effortless integrations`,
    client: `Try Your Best`,
    clientDescription: `Try Your Best (TYB) is building the future of brand loyalty. Fans connect with the brands they love, shop products, and earn rewards.`,
    clientLink: `https://tyb.xyz`,
    logo: `/media/projects/logos/tyb-logo.png`,
    coverImage: `/media/projects/tyb-integrations/tyb-integrations-cover.png`,
    overview: `TYB’s integrations with Shopify, Klaviyo, and Attentive play a massive role in the platform’s value to brands and fans. By automating key parts of the integration, and controlling information hierarchy within simplified steps, powering TYB brand communities with data became a much simpler affair.`,
    team: [`Connor White - Product Designer`, `Victor Oliveira - Lead Engineer`, `Kenzo Izume - Integration Engineer`]
  },
  {
    id: `tyb-forms`,
    title: `Forms & information architecture`,
    client: `Try Your Best`,
    clientDescription: `Try Your Best (TYB) is building the future of brand loyalty. Fans connect with the brands they love, shop products, and earn rewards.`,
    clientLink: `https://tyb.xyz`,
    logo: `/media/projects/logos/tyb-logo.png`,
    coverImage: `/media/projects/tyb-forms/tyb-forms-cover.png`,
    overview: `Here's a little sample copy. I'll write something soon.`,
    team: [`Connor White - Product Designer, Engineer`, `Kirill Gorin - Engineer`, `Mady Dewey - Product Manager`]
  },
  {
    id: `blackbird`,
    title: `Restaurant loyalty rewards`,
    client: `Blackbird`,
    clientDescription: `Try Your Best (TYB) is building the future of brand loyalty. Fans connect with the brands they love, shop products, and earn rewards.`,
    clientLink: `https://blackbird.xyz`,
    logo: `/media/projects/logos/blackbird-logo.png`,
    coverImage: `/media/projects/blackbird/blackbird-cover.png`,
    overview: `Here's a little sample copy. I'll write something soon.`,
    team: [`Connor White - 3D Designer, Engineer`, `Andrew Braswell - Product Designer`]
  },
  {
    id: `sqft`,
    title: `Interactive 3D storefront`,
    client: `Sq Ft`,
    clientDescription: `Sq Ft is a magazine shining a light on artists and how they shape and are shaped by the spaces they occupy.`,
    clientLink: `https://readsqft.com`,
    logo: `/media/projects/logos/sqft-logo.png`,
    coverImage: `/media/projects/sqft/sqft-cover.png`,
    overview: `I designed and built a site for Sq Ft that features an interactive 3D model of the magazine. The movement of the site’s elements mirrors the horizontal page turning of the physical magazine. The site is fully Shopify integrated, with an integrated checkout experience. I modeled the magazine in Blender and handled the interaction with three.js. `,
    team: [`Connor White - Product Designer, Engineer, 3D-Designer`, `Sean Brown - Creative Director`, `Desiree Deleau - Graphic Designer`]
  },
  {
    id: `manipulate`,
    title: `Machine-learning gesture interaction`,
    client: `Manipulate`,
    clientLink: `https://manipulate-beige.vercel.app/`,
    logo: `/media/projects/logos/manipulate-logo.png`,
    coverImage: `/media/projects/tyb-forms/tyb-forms-cover.png`,
    overview: `“Manipulate” is a foray into a possible future of human-computer interaction. Utilizing a machine-learning model, users manipulate a 3D model by rotating their hand within the camera’s view. Beyond the obvious theatrics, this interaction pattern has a few advantages. Primarily, the user interacts with a 3D model using a 3D input, their hand. This eliminates cognitive translation, when the model reacts, exactly as their hand does, to physical movement. Additionally, the lack of fine motor precision needed here opens up a new world of accessibility to users that struggle with cursor navigation.`,
  }
];

