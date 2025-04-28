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
      title: 'Über uns',
    },
    contact: {
      title: 'Kontakt',
    },
  },
  tooltips: {
    post: {
      slug: 'Individueller Name',
      type: 'Immobilienart',
      visible: 'Sichtbarkeit',
      relativeValue: 'Relativer Wert',
      numRooms: 'Zimmeranzahl',
      numBathrooms: 'Anzahl Badezimmer',
      numBedrooms: 'Anzahl Schlafzimmer',
      numFloors: 'Etagenanzahl',
      terrainArea: 'Grundstücksfläche (m²)',
      livingArea: 'Wohnfläche (m²)',
      livingVolume: 'Wohnvolumen (m³)',
      constructionYear: 'Baujahr',
      renovationYear: 'Umbausjahr',
    },
    postWriteup: {
      title: 'Titel',
      description: 'Objektbeschreibung',
      price: 'Kaufpreis / Mietpreis',
      heatingType: 'Heizungsart',
      address: 'Adresse',
      parking: 'Parkmöglichkeiten',
      crushes: 'Besondere Merkmale',
    },
    postMedia: {
      description: 'Bildbeschreibung',
    },
    postText: {
      title: 'Titel',
      content: 'Textinhalt',
    },
  },
  defaultAlt: 'Ein Bild der Immobilie',
  sorting: {
    sorted: 'Sortiert nach',
    latest: 'Neueste',
    top: 'Top',
    cheapest: 'Preiswerteste',
  },
  locales: {
    en: 'Englisch',
    de: 'Deutsch',
    fr: 'Französisch',
  },
  contact: {
    header: 'Kontaktieren Sie uns!',
    lastname: 'Nachname',
    firstname: 'Vorname',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    phoneHint: 'Bitte mit internationaler Vorwahl angeben',
    locales: 'Sprachen, die Sie sprechen',
    message: 'Ihre Nachricht',
    spam: 'Um Spam zu vermeiden, bitte Zutreffendes ankreuzen',
    checkbox1: 'Ich bin ein Mensch',
    checkbox2: 'Ich bin ein Roboter',
    submit: 'Nachricht senden',
    modal: {
      call: 'Rufen Sie uns gerne an, um mehr über',
      message:
        'Oder senden Sie uns eine Nachricht mit Ihren Kontaktdaten – wir melden uns schnellstmöglich bei Ihnen!',
      defaultMessage: 'Ich interessiere mich für weitere Informationen zu',
    },
  },
  noPosts: {
    title: 'Aktuell keine Immobilien verfügbar!',
    description:
      'Wir bereiten spannende neue Angebote für Sie vor. Schauen Sie bald wieder vorbei!',
  },
}
