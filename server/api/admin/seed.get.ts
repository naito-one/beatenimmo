export default eventHandler(async (event) => {
  await requireUserSession(event)

  console.log('Running DB seed task...')

  try {
    const posts: Omit<Post, 'id'>[] = [
      {
        type: 'buy',
        slug: 'renovated-chalet-1234',
        visible: true,
        relativeValue: 500000,
        numRooms: 4.5,
        numFloors: 2,
        terrainArea: 2540,
        livingArea: 124,
        livingVolume: null,
        createdAt: new Date(),
        order: 2,
      },
      {
        type: 'buy',
        slug: 'dream-house-4567',
        visible: true,
        relativeValue: 1300000,
        numRooms: 5,
        numFloors: 3,
        terrainArea: 850,
        livingArea: 256,
        livingVolume: 350,
        createdAt: new Date(),
        order: 1,
      },
      {
        type: 'buy',
        slug: 'large-terrain-8910',
        visible: true,
        relativeValue: 256000,
        numRooms: null,
        numFloors: null,
        terrainArea: 1302,
        livingArea: null,
        livingVolume: null,
        createdAt: new Date(),
        order: 3,
      },
    ]

    const postWriteups: Omit<PostWriteup, 'id'>[][] = [
      // first post
      [
        {
          postId: -1,
          locale: 'en',
          title: 'Renovated Swiss Chalet with forest',
          description: 'Magnificient Chalet Lorem ipsum dolor sit amet.',
          price: "CHF 500'000",
          address: 'Schmockenstrasse 220, 3803 Beatenberg',
          crushes: ['Balcony', 'Barbecue'],
        },
        {
          postId: -1,
          locale: 'de',
          title: 'Renoviertes Schweizer Chalet mit Wald',
          description: 'Wunderschönes Chalet Lorem ipsum dolor sit amet.',
          price: '500000.-',
          address: 'Schmockenstrasse 220, 3803 Beatenberg',
          crushes: ['Balkon', 'Grill'],
        },
      ],
      // second post
      [
        {
          postId: -1,
          locale: 'en',
          title: 'Dream house in the mountains',
          description:
            'Your dream house in Beatenberg Lorem ipsum dolor sit amet.',
          price: "CHF 1'300'000",
          address: 'Schmockenstrasse 42, 3803 Beatenberg',
          crushes: ['Terrace', 'Lounge', 'High-Tech Kitchen'],
        },
        {
          postId: -1,
          locale: 'de',
          title: 'Wunschhaus in den Bergen',
          description:
            'Ihr Wunschobjekt in Beatenberg Lorem ipsum dolor sit amet.',
          price: '1.300.000,-',
          address: 'Schmockenstrasse 42, 3803 Beatenberg',
          crushes: ['Balkon', 'Lounge', 'Hightech-Küche'],
        },
      ],
      // third post
      [
        {
          postId: -1,
          locale: 'en',
          title: 'Terrain with ideal sun exposure',
          description:
            'Ready to build your mountain house project Lorem ipsum dolor sit amet.',
          price: "CHF 256'000",
          address: 'Schmockenstrasse 1, 3803 Beatenberg',
          crushes: ['Fruit trees', 'Stream'],
        },
        {
          postId: -1,
          locale: 'de',
          title: 'Boden mit idealer Sonneneinstrahlung',
          description:
            'Bereit zum Bau Ihres Berghausprojekts ipsum dolor sit amet.',
          price: '256.000,-',
          address: 'Schmockenstrasse 1, 3803 Beatenberg',
          crushes: ['Obstbäume', 'Wasserstrom'],
        },
      ],
    ]

    const postMedias: Omit<PostMedia, 'id'>[][] = [
      // first post
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
      // second post
      [
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-00-23.jpg',
          description: null,
          order: 1,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-01-42.jpg',
          description: 'A nice photo',
          order: 3,
        },
      ],
      [
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-00-23.jpg',
          description: null,
          order: 1,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-01-42.jpg',
          description: 'Ein schönes Foto',
          order: 3,
        },
      ],
      // third post
      [
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-08-23.jpg',
          description: null,
          order: 2,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_21-54-23.jpg',
          description: 'A nice photo',
          order: 1,
        },
      ],
      [
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_15-08-23.jpg',
          description: null,
          order: 2,
        },
        {
          postWriteupId: -1,
          pathname: '/img/tmp/photo_2025-02-09_21-54-23.jpg',
          description: 'Ein schönes Foto',
          order: 1,
        },
      ],
    ]

    const postTexts: Omit<PostText, 'id'>[][] = [
      // first post
      [
        {
          postWriteupId: -1,
          title: 'About this one',
          content:
            'Cross-platform support is important to many Javascript libraries, but the criteria for what this means often differ. For Quill, the bar is not just that it runs or works, it has to run or work the same way.\n Not only is functionality a cross-platform consideration, but the user and developer experience are as well.\n\n If some content produces a particular markup in Chrome on OSX, it will produce the same markup on IE. If hitting enter preserves bold format state in Firefox on Windows, it will be preserved on mobile Safari.',
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
            'Die plattformübergreifende Unterstützung ist für viele Javascript-Bibliotheken wichtig, aber die Kriterien dafür sind oft unterschiedlich. Für Quill ist die Messlatte nicht nur, dass es läuft oder funktioniert, es muss auf die gleiche Weise laufen oder funktionieren.\n Nicht nur die Funktionalität ist eine plattformübergreifende Überlegung, sondern auch die Benutzer- und Entwicklererfahrung.\n\n Wenn ein Inhalt in Chrome unter OSX ein bestimmtes Markup erzeugt, wird er das gleiche Markup auch im IE erzeugen. Wenn das Drücken der Eingabetaste den Status der fettgedruckten Formatierung in Firefox unter Windows beibehält, wird sie auch auf dem mobilen Safari beibehalten.',
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
      // second post
      [
        {
          postWriteupId: -1,
          title: 'Your dream house',
          content:
            'A role that has required owned elements does not imply the reverse relationship. While processing of a role may be incomplete without elements of given roles present as descendants, elements with roles in this list do not always have to be found within elements of the given role. See required context role for requirements about the context where elements of a given role will be contained.',
          order: 2,
        },
      ],
      [
        {
          postWriteupId: -1,
          title: 'Ihr Wunschhaus',
          content:
            'Eine Rolle, die „erforderliche eigene Elemente“ hat, impliziert nicht die umgekehrte Beziehung. Während die Verarbeitung einer Rolle unvollständig sein kann, ohne dass Elemente der gegebenen Rollen als Nachkommen vorhanden sind, müssen Elemente mit Rollen in dieser Liste nicht immer innerhalb von Elementen der gegebenen Rolle zu finden sein. Siehe erforderliche Kontextrolle für Anforderungen an den Kontext, in dem Elemente einer bestimmten Rolle enthalten sein müssen.',
          order: 2,
        },
      ],
      // third post
      [
        {
          postWriteupId: -1,
          title: 'Paradise on earth',
          content:
            'For simplicities sake, in the example a Song only belongs to one Playlist (a many-to-one relationship).\n Of course, one could also use a Junction Table so song⟷playlist is a many-to-many relationship (and apply one of above strategies on that table).',
          order: 3,
        },
      ],
      [
        {
          postWriteupId: -1,
          title: 'Paradies auf Erden',
          content:
            'Der Einfachheit halber gehört in diesem Beispiel ein Song nur zu einer Wiedergabeliste (eine Viele-zu-Eins-Beziehung).\n Natürlich könnte man auch eine Verbindungstabelle verwenden, so dass die Song⟷Playlist eine Viele-zu-Viele-Beziehung ist (und eine der oben genannten Strategien auf diese Tabelle anwenden).',
          order: 3,
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
  } catch (e) {
    return { result: 'failure', error: String(e) }
  }
})
