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
      numFloors: 'Anzahl der Stockwerke',
      terrainArea: 'Fläche des Geländes in Quadratmetern',
      livingArea: 'Wohnbereich in Quadratmetern',
      livingVolume: 'Wohnvolumen in Kubikmetern',
    },
    postWriteup: {
      title: 'Titel',
      description: 'Beschreibung',
      price: 'Preis',
      address: 'Adresse',
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
    spam: 'Um Spam zu reduzieren, prüfen Sie bitte, was gilt',
    checkbox1: 'Bitte kreuzen Sie an, ob Sie ein Mensch sind',
    checkbox2: 'Bitte kreuzen Sie an, ob Sie ein Roboter sind',
    submit: 'Nachricht senden',
  },
}
