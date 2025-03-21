import { Post, PostMedia, PostText, PostWriteup } from '../utils/drizzle'

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
        order: 1,
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
          order: 1,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-03-26.jpg',
          description: 'A nice photo',
          order: 2,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_21-54-23.jpg',
          description: 'I like this one',
          order: 4,
        },
      ],
      [
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2024-11-03_08-44-30.jpg',
          description: null,
          order: 1,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-03-26.jpg',
          description: 'Ein schönes Foto',
          order: 2,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_21-54-30.jpg',
          description: 'Ich mag das hier',
          order: 4,
        },
      ],
    ]

    const postTexts: Omit<PostText, 'id'>[][] = [
      [
        {
          postWriteupId: -1,
          title: 'About this one',
          content:
            'Cross-platform support is important to many Javascript libraries, but the criteria for what this means often differ. For Quill, the bar is not just that it runs or works, it has to run or work the same way. Not only is functionality a cross-platform consideration, but the user and developer experience are as well. If some content produces a particular markup in Chrome on OSX, it will produce the same markup on IE. If hitting enter preserves bold format state in Firefox on Windows, it will be preserved on mobile Safari.',
          order: 3,
        },
        {
          postWriteupId: -1,
          title: 'And there is more',
          content:
            'Databases are optimized for certain things. Updating lots of rows quickly is one of them. This becomes especially true when you let the database do its work.',
          order: 5,
        },
      ],
      [
        {
          postWriteupId: -1,
          title: 'Über diese',
          content:
            'Die plattformübergreifende Unterstützung ist für viele Javascript-Bibliotheken wichtig, aber die Kriterien dafür sind oft unterschiedlich. Für Quill ist die Messlatte nicht nur, dass es läuft oder funktioniert, es muss auf die gleiche Weise laufen oder funktionieren. Nicht nur die Funktionalität ist eine plattformübergreifende Überlegung, sondern auch die Benutzer- und Entwicklererfahrung. Wenn ein Inhalt in Chrome unter OSX ein bestimmtes Markup erzeugt, wird er das gleiche Markup auch im IE erzeugen. Wenn das Drücken der Eingabetaste den Status der fettgedruckten Formatierung in Firefox unter Windows beibehält, wird sie auch auf dem mobilen Safari beibehalten.',
          order: 3,
        },
        {
          postWriteupId: -1,
          title: 'Und es gibt noch mehr',
          content:
            'Datenbanken sind für bestimmte Aufgaben optimiert. Das schnelle Aktualisieren vieler Zeilen ist eine davon. Dies gilt insbesondere, wenn Sie die Datenbank ihre Arbeit machen lassen.',
          order: 5,
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
      postTexts[i].forEach(
        (text) => (text.postWriteupId = insertetPostWriteups[i].id),
      )
    }

    await useDrizzle().insert(tables.postMedias).values(postMedias.flat())
    await useDrizzle().insert(tables.postTexts).values(postTexts.flat())

    return { result: 'success' }
  },
})
