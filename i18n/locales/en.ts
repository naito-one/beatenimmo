export default {
  nuxtSiteConfig: {
    name: 'BeatenIMMO',
    description: 'Your real estate partner in Beatenberg',
  },
  pages: {
    buy: {
      title: 'Buy',
    },
    rent: {
      title: 'Rent',
    },
    about: {
      title: 'About',
    },
    contact: {
      title: 'Contact',
    },
  },
  tooltips: {
    post: {
      slug: 'Unique name',
      type: 'Type',
      visible: 'Visible',
      relativeValue: 'Relative value',
      numRooms: 'Number of rooms',
      numFloors: 'Number of floors',
      terrainArea: 'Terrain area in square meters',
      livingArea: 'Living area in square meters',
      livingVolume: 'Living volume in cubic meters',
    },
    postWriteup: {
      title: 'Title',
      description: 'Description',
      price: 'Price',
      address: 'Address',
      crushes: 'Outstanding features',
    },
    postMedia: {
      description: 'Description',
    },
    postText: {
      title: 'Title',
      content: 'Content',
    },
  },
  defaultAlt: 'A picture of the property',
  sorting: {
    latest: 'Latest',
    top: 'Top',
    cheapest: 'Cheapest',
  },
  locales: {
    en: 'English',
    de: 'German',
  },
}
