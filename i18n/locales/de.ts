export default {
  nuxtSiteConfig: {
    name: 'BeatenIMMO',
    description: 'Ihr Immobilienpartner in Beatenberg',
  },
  pages: {
    buy: {
      title: 'Kaufen',
    },
    rent: {
      title: 'Mieten',
    },
    about: {
      title: 'Über',
    },
    contact: {
      title: 'Kontact',
    },
  },
  tooltips: {
    post: {
      slug: 'Eindeutiger Name',
      type: 'Typ',
      visible: 'Sichtbar',
      relativeValue: 'Relativer Wert',
      numRooms: 'Anzahl der Zimmer',
      numBathrooms: 'Anzahl der Bäder',
      numBedrooms: 'Anzahl der Schlafzimmer',
      numFloors: 'Anzahl der Stockwerke',
      terrainArea: 'Fläche des Geländes in Quadratmetern',
      livingArea: 'Wohnbereich in Quadratmetern',
      livingVolume: 'Wohnvolumen in Kubikmetern',
      constructionYear: 'Baujahr',
      renovationYear: 'Renovierungsjahr',
    },
    postWriteup: {
      title: 'Titel',
      description: 'Beschreibung',
      price: 'Preis',
      heatingType: 'Heizungsart',
      address: 'Adresse',
      parking: 'Parkplatz',
      crushes: 'Herausragende Merkmale',
    },
    postMedia: {
      description: 'Beschreibung',
    },
    postText: {
      title: 'Titel',
      content: 'Inhalt',
    },
  },
  defaultAlt: 'Ein Bild des Objekts',
  sorting: {
    sorted: 'Sortiert nach',
    latest: 'Neueste',
    top: 'Beste',
    cheapest: 'Günstigste',
  },
  locales: {
    en: 'Englisch',
    de: 'Deutsch',
    fr: 'Französisch',
  },
  contact: {
    header: 'Nehmen Sie Kontakt auf!',
    lastname: 'Nachname',
    firstname: 'Vorname',
    email: 'Email',
    phone: 'Telefon',
    phoneHint: 'Bitte geben Sie Ihre internationale Telefonvorwahl an',
    locales: 'Gesprochene Sprachen',
    message: 'Nachricht',
    spam: 'Um Spam zu reduzieren, kreuzen Sie bitte an, was gilt',
    checkbox1: 'Bitte kreuzen Sie an, ob Sie ein Mensch sind',
    checkbox2: 'Bitte kreuzen Sie an, ob Sie ein Roboter sind',
    submit: 'Nachricht senden',
    modal: {
      call: 'Rufen Sie uns jetzt an und erfahren Sie mehr über',
      message:
        'Oder senden Sie uns eine Nachricht mit Ihren Kontaktdaten und wir werden uns so schnell wie möglich bei Ihnen melden!',
      defaultMessage: 'Ich möchte mehr Informationen über',
    },
  },
  noPosts: {
    title: 'Momentan gibt es nichts zu sehen!',
    description:
      'Wir bereiten einige interessante neue Projekte vor, die Sie sich ansehen können. Bitte besuchen Sie uns bald wieder!',
  },
}
