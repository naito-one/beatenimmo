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
      id: 'ID',
      slug: 'Individueller Name',
      type: 'Immobilienart',
      state: 'Status',
      states: {
        available: 'Verfügbar',
        reserved: 'Reserviert',
        sold: 'Verkauft',
        rented: 'Vermietet',
      },
      visible: 'Sichtbarkeit',
      relativeValue: 'Relativer Wert',
      numRooms: 'Zimmeranzahl',
      numBathrooms: 'Anzahl Badezimmer',
      numBedrooms: 'Anzahl Schlafzimmer',
      numFloors: 'Etagenanzahl',
      terrainArea: 'Grundstücksfläche in Quadratmetern',
      livingArea: 'Wohnfläche in Quadratmetern',
      livingVolume: 'Wohnvolumen in Kubikmetern',
      constructionYear: 'Baujahr',
      renovationYear: 'Umbaujahr',
      created: 'Erstellt',
    },
    postWriteup: {
      title: 'Titel',
      description: 'Beschreibung',
      price: 'Preis',
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
  notes: {
    post: {
      slug: 'Kann nicht geändert werden',
      visible:
        'Aktivieren, um auf der öffentlichen Website zu veröffentlichen. Bei Deaktivierung können nur Sie das Inserat sehen',
      relativeValue:
        'Wird beim Sortieren nach Preis verwendet, wird nie angezeigt',
      constructionYear:
        'Freies Feld, kann zum Beispiel einen Bereich oder eine Liste enthalten',
      renovationYear:
        'Freies Feld, kann zum Beispiel einen Bereich oder eine Liste enthalten',
    },
    postWriteup: {
      title: 'Titel der Webseite, auch sichtbar oben im Inserat',
      description: 'Nur in den Suchergebnissen sichtbar',
      price:
        'Freies Feld, kann eine formatierte Zahl oder beliebiger Text sein',
      crushes: 'Liste von aussagekräftigen einzelnen Wörtern',
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
    locales: 'Gesprochene Sprachen',
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
  newsletter: {
    modal: {
      header: 'Newsletter abonnieren',
    },
  },
  noPosts: {
    title: 'Aktuell keine Immobilien verfügbar!',
    description:
      'Wir bereiten spannende neue Angebote für Sie vor. Schauen Sie bald wieder vorbei!',
  },
  admin: {
    adminPanel: '{site} Admin-Bereich',
    toWebsite: 'Zur Website',
    toAdmin: 'Zum Admin-Bereich',
    welcome: 'Willkommen, {name}',
    invisible: 'Inserat ist für normale Benutzer unsichtbar',
    tabs: {
      general: 'Allgemein',
    },
    save: {
      success: {
        title: 'Inserat erfolgreich veröffentlicht',
      },
      invalid: {
        title: 'Veröffentlichung fehlgeschlagen',
        description:
          'Einige Daten sind ungültig. Bitte beheben Sie die Probleme vor der Veröffentlichung.',
      },
      madeInvisible: {
        title:
          'Sichtbarkeit auf "Versteckt" gesetzt, da keine Beschreibungen vorhanden sind',
      },
      error: {
        title: 'Beim Speichern des Inserats ist ein Fehler aufgetreten',
      },
    },
    deleteWriteup: {
      action: 'Beschreibung löschen',
      deleted: {
        title: 'Beschreibung gelöscht',
      },
      undoFailed: {
        title: 'Rückgängig machen fehlgeschlagen',
        description:
          'Das Rückgängigmachen der Löschung ist nicht möglich, da bereits eine andere Beschreibung für dieselbe Sprache existiert.',
      },
    },
    deleteBlock: {
      action: 'Block löschen',
      deleted: {
        title: 'Block gelöscht',
      },
      undoFailed: {
        title: 'Rückgängig machen fehlgeschlagen',
        description:
          'Das Rückgängigmachen der Löschung ist nicht möglich, da die Beschreibung gelöscht wurde.',
      },
    },
    addBlock: {
      missingId: {
        title: 'Keine ID zum Erstellen von Medien',
      },
    },
    addPost: {
      action: 'Inserat hinzufügen',
      added: {
        title: 'Neues Inserat erstellt',
      },
      error: {
        title: 'Inserat konnte nicht erstellt werden',
      },
    },
    login: {
      action: 'Anmelden',
      logged: {
        title: 'Erfolg',
        description: 'Sie wurden angemeldet.',
      },
      error: {
        title: 'Fehler',
        description: 'Ungültige Anmeldedaten',
      },
    },
    debug: {
      name: 'Debug-Aktionen',
      clear: 'Datenbank leeren',
      seed: 'Datenbank befüllen',
    },
    validation: {
      slug: 'Der individuelle Name darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten und weder mit einem Bindestrich beginnen noch enden',
      email: 'Ungültige E-Mail-Adresse',
      password: 'Muss mindestens 8 Zeichen lang sein',
    },
    mediaChooser: {
      action: 'Mediendatei auswählen',
      current: 'Wird in der aktuellen Inseratsbeschreibung verwendet',
      other: 'Wird in einer anderen Beschreibung dieses Inserats verwendet',
      elsewhere: 'Wird anderswo auf der Website verwendet oder ist ungenutzt',
      replace: 'Medium ersetzen',
      choose: 'Medium auswählen',
      upload: 'Neues Medium hochladen',
      existing: 'Vorhandenes Medium auswählen',
      noMedia: 'Derzeit sind keine Medien in dieser Liste vorhanden',
      uploadMedia: {
        action: 'Ausgewählte hochladen',
        error: {
          title: 'Fehler',
          description: 'Medium konnte nicht hochgeladen werden: {err}',
        },
      },
    },
    deletePost: {
      action: 'Löschen',
      confirm: {
        title: 'Löschen von {post} bestätigen',
        description: 'Diese Aktion kann nicht rückgängig gemacht werden',
      },
      success: {
        title: 'Inserat erfolgreich gelöscht',
      },
      error: {
        title: 'Inserat konnte nicht gelöscht werden',
      },
    },
    generic: {
      save: 'Speichern',
      undo: 'Rückgängig',
      back: 'Zurück',
      editing: 'Bearbeitung',
      writeup: '{lang}-Beschreibung',
      writeupFor: 'Beschreibung erstellen für',
      blocks: 'Blöcke',
      media: 'Medien',
      text: 'Text',
      add: '{type} hinzufügen',
      block: '{type}-Block',
      posts: 'Inserate',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen',
      topOrder: 'Top-Reihenfolge',
      edit: 'Bearbeiten',
      logout: 'Abmelden',
    },
  },
}
