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
      numBathrooms: 'Number of bathrooms',
      numBedrooms: 'Number of bedrooms',
      numFloors: 'Number of floors',
      terrainArea: 'Terrain area in square meters',
      livingArea: 'Living area in square meters',
      livingVolume: 'Living volume in cubic meters',
      constructionYear: 'Construction year',
      renovationYear: 'Renovation year',
    },
    postWriteup: {
      title: 'Title',
      description: 'Description',
      price: 'Price',
      heatingType: 'Heating type',
      address: 'Address',
      parking: 'Parking',
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
    sorted: 'Sorted by',
    latest: 'Latest',
    top: 'Top',
    cheapest: 'Cheapest',
  },
  locales: {
    en: 'English',
    de: 'German',
    fr: 'French',
  },
  contact: {
    header: 'Get in touch!',
    lastname: 'Lastname',
    firstname: 'Firstname',
    email: 'Email',
    phone: 'Phone',
    phoneHint: 'Please include your international prefix',
    locales: 'Spoken Languages',
    message: 'Message',
    spam: 'In order to reduce spam, please check what applies',
    checkbox1: 'I am a human',
    checkbox2: 'I am a robot',
    submit: 'Send Message',
    modal: {
      call: 'Feel free to call us now to learn more about',
      message:
        'Or send us a message with your contact details and we will get back to you as soon as we can!',
      defaultMessage: 'I would like more information about',
    },
  },
  noPosts: {
    title: 'Nothing to show at the moment!',
    description:
      'We are preparing some juicy new projects for you to look at. Please visit us again soon!',
  },
}
