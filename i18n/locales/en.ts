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
      id: 'ID',
      slug: 'Unique name',
      type: 'Type',
      state: 'State',
      states: {
        available: 'Available',
        reserved: 'Reserved',
        sold: 'Sold',
        rented: 'Rented',
      },
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
      created: 'Created',
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
  notes: {
    post: {
      slug: 'Cannot be changed',
      visible:
        'Turn on to publish to the public website. If turned off, only you can see the post',
      relativeValue: 'Used when ordering by price, never displayed',
      constructionYear:
        'Free field, for example you can write a range or a list',
      renovationYear: 'Free field, for example you can write a range or a list',
    },
    postWriteup: {
      title: 'Title of the web page, also visible at the top of the post',
      description: 'Only visible in search engine results',
      price: 'Free field, can be a formatted number or any text',
      crushes: 'List of impactful single words',
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
    lastname: 'Last name',
    firstname: 'First name',
    email: 'Email',
    phone: 'Phone',
    phoneHint: 'Please include your international prefix',
    locales: 'Spoken languages',
    message: 'Message',
    spam: 'To reduce spam, please check what applies',
    checkbox1: 'I am a human',
    checkbox2: 'I am a robot',
    submit: 'Send message',
    modal: {
      call: 'Feel free to call us now to learn more about',
      message:
        'Or send us a message with your contact details and we will get back to you as soon as we can!',
      defaultMessage: 'I would like more information about',
    },
    form: {
      warning: {
        title: 'Warning',
      },
      success: {
        title: 'Success',
        description: 'The form has been submitted',
      },
      error: {
        title: 'Error',
        description:
          'Sorry, an error occurred while submitting your form. Please call us instead, or try again later.',
      },
    },
  },
  newsletter: {
    modal: {
      header: 'Subscribe to the newsletter',
    },
  },
  noPosts: {
    title: 'Nothing to show at the moment!',
    description:
      'We are preparing some exciting new projects for you to look at. Please visit us again soon!',
  },
  validation: {
    nonempty: 'Please fill this field',
    email: 'Please give a valid email address',
    locales: 'Please select at least one language',
  },
  admin: {
    adminPanel: '{site} Admin Panel',
    toWebsite: 'To Website',
    toAdmin: 'To Admin',
    welcome: 'Welcome, {name}',
    invisible: 'Post is invisible to normal users',
    tabs: {
      general: 'General',
    },
    save: {
      success: {
        title: 'Post successfully saved',
      },
      invalid: {
        title: 'Could not save',
        description:
          'Some of the data is invalid. Please correct issues before saving',
      },
      madeInvisible: {
        title: 'Visibility set to Hidden as there are no writeups',
      },
      error: {
        title: 'An error occurred while saving the post',
      },
    },
    deleteWriteup: {
      action: 'Delete writeup',
      deleted: {
        title: 'Writeup deleted',
      },
      undoFailed: {
        title: 'Failed to undo',
        description:
          'Cannot undo deletion as another writeup exists for the same language',
      },
    },
    deleteBlock: {
      action: 'Delete block',
      deleted: {
        title: 'Block deleted',
      },
      undoFailed: {
        title: 'Failed to undo',
        description: 'Cannot undo deletion as writeup was deleted',
      },
    },
    addBlock: {
      missingId: {
        title: 'No ID to create media',
      },
    },
    addPost: {
      action: 'Add post',
      added: {
        title: 'New post created',
      },
      error: {
        title: 'Failed to create post',
      },
    },
    login: {
      action: 'Login',
      logged: {
        title: 'Success',
        description: 'You have been logged in',
      },
      error: {
        title: 'Error',
        description: 'Bad credentials',
      },
    },
    debug: {
      name: 'Debug actions',
      clear: 'Clear DB',
      seed: 'Seed DB',
    },
    validation: {
      slug: 'Unique name must contain only lowercase letters, numbers and hyphens, and cannot start or end with a hyphen',
      email: 'Invalid email',
      password: 'Must be at least 8 characters',
    },
    mediaChooser: {
      action: 'Choose media file',
      current: 'Used in current post writeup',
      other: 'Used in another writeup of this post',
      elsewhere: 'Used elsewhere on the website or unused',
      replace: 'Replace media',
      choose: 'Choose media',
      upload: 'Upload new media',
      existing: 'Select existing media',
      noMedia: 'There are currently no media in this list',
      uploadMedia: {
        action: 'Upload selected',
        error: {
          title: 'Error',
          description: 'Could not upload media: {err}',
        },
      },
    },
    deletePost: {
      action: 'Delete',
      confirm: {
        title: 'Confirm deleting {post}',
        description: 'This action cannot be undone',
      },
      success: {
        title: 'Post successfully deleted',
      },
      error: {
        title: 'Failed to delete post',
      },
    },
    generic: {
      save: 'Save',
      undo: 'Undo',
      back: 'Back',
      editing: 'Editing',
      writeup: '{lang} writeup',
      writeupFor: 'Create Writeup for',
      blocks: 'Blocks',
      media: 'Media',
      text: 'Text',
      add: 'Add {type}',
      block: '{type} block',
      posts: 'Posts',
      cancel: 'Cancel',
      confirm: 'Confirm',
      topOrder: 'Top order',
      edit: 'Edit',
      logout: 'Logout',
    },
  },
}
