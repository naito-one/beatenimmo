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
      numRooms: 'Number of rooms',
      numFloors: 'Number of floors',
      terrainArea: 'Terrain area in square meters',
      livingArea: 'Living area in square meters',
      livingVolume: 'Living volume in cubic meters',
    },
    postWriteup: {
      price: 'Price',
      address: 'Address',
      crushes: 'Outstanding features',
    },
  },
  defaultAlt: 'A picture of the property',
  sorting: {
    latest: 'Latest',
    top: 'Top',
    cheapest: 'Cheapest',
  },
}
