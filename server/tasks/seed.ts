import { Post, PostMedia, PostWriteup } from '../utils/drizzle'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    console.log('Running DB seed task...')
    const posts: Omit<Post, 'id'>[] = [
      {
        type: 'buy',
        slug: 'renovated-chalet',
        visible: true,
        relativeValue: 500000,
        numRooms: 4.5,
        numFloors: 2,
        terrainArea: 2540,
        livingArea: 256,
        livingVolume: null,
        createdAt: new Date(),
      },
    ]

    const postWriteups: Omit<PostWriteup, 'id'>[][] = [
      [
        {
          postId: -1,
          locale: 'en',
          title: 'Renovated Swiss Chalet with forest',
          description:
            'Magnificient Chalet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: "CHF 500'000",
          address: 'Schmockenstrasse 220, 3803 Beatenberg',
          crushes: ['Balcony', 'Barbecue'],
        },
        {
          postId: -1,
          locale: 'de',
          title: 'Renoviertes Schweizer Chalet mit Wald',
          description:
            'Wunderschönes Chalet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: '500000.-',
          address: 'Schmockenstrasse 220, 3803 Beatenberg',
          crushes: ['Balkon', 'Grill'],
        },
      ],
    ]

    const postMedias: Omit<PostMedia, 'id'>[][] = [
      [
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2024-11-03_08-44-30.jpg',
          description: null,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-03-26.jpg',
          description: 'A nice photo',
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_21-54-23.jpg',
          description: 'I like this one',
        },
      ],
      [
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2024-11-03_08-44-30.jpg',
          description: null,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-03-26.jpg',
          description: 'Ein schönes Foto',
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_21-54-30.jpg',
          description: 'Ich mag das hier',
        },
      ],
    ]

    const insertedPosts = await useDrizzle()
      .insert(tables.posts)
      .values(posts)
      .returning()

    for (let i = 0; i < insertedPosts.length; ++i) {
      postWriteups[i].forEach(
        (writeup) => (writeup.postId = insertedPosts[i].id),
      )
    }

    const insertetPostWriteups = await useDrizzle()
      .insert(tables.postWriteups)
      .values(postWriteups.flat())
      .returning()

    for (let i = 0; i < insertetPostWriteups.length; ++i) {
      postMedias[i].forEach(
        (media) => (media.postWriteupId = insertetPostWriteups[i].id),
      )
    }

    await useDrizzle().insert(tables.postMedias).values(postMedias.flat())

    console.log(insertedPosts)

    return { result: 'success' }
  },
})
