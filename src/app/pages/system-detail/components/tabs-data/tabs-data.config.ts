import { ITabData } from './tabs-data.model';

export const TABS_DATA: ITabData[] = [
  {
    id: 0,
    tab: 'Informació general',
    fields: [
      {
        field: 'Nivell de risc',
        description: {
          text: "Nivell de risc del sistema d'IA, segons els criteris del Reglament europeu d'IA.",
          isVisible: false,
        },
      },
      {
        field: 'Forma de desenvolupament',
        description: {
          text: "Com s'ha creat, desenvolupat i adoptat el sistema.\n— L'Administració ha desenvolupat el sistema.\n— L'Administració ha comprat el sistema i ha fet un procés per integrar-lo internament.\n— Un proveïdor extern ha desenvolupat el sistema i l'ha integrat.",
          isVisible: false,
        },
      },
      {
        field: 'Fonts de finançament',
        description: {
          text: "Com s'ha finançat el sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Desenvolupador',
        description: {
          text: 'Dades sobre qui ha desenvolupat el sistema.',
          isVisible: false,
        },
      },
      {
        field: 'Unitat responsable',
        description: {
          text: "Nom de la unitat de l'Administració de la Generalitat responsable de l'ús del sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Tema',
        description: {
          text: 'Àrees temàtiques.',
          isVisible: false,
        },
      },
      {
        field: 'Actuació administrativa automatitzada',
        description: {
          text: "Una actuació administrativa automatitzada (AAA) és qualsevol acte o actuació dut a terme íntegrament a través de mitjans electrònics per una administració pública en el marc d'un procediment administratiu en què no hagi intervingut de manera directa un empleat públic.",
          isVisible: false,
        },
      },
      {
        field:
          'Intervenció o vinculació del sistema respecte a una política pública',
        description: {
          text: "Àmbit d'actuació.",
          isVisible: false,
        },
      },
      {
        field: 'Data de la posada en funcionament',
        description: {
          text: 'Data de la posada en funcionament.',
          isVisible: false,
        },
      },
      {
        field: "Data de l'última modificació",
        description: {
          text: "Data de l'última modificació.",
          isVisible: false,
        },
      },
      {
        field: 'Motiu de la modificació',
      },
      {
        field: 'Data de retirada',
        description: {
          text: 'Data de la retirada del sistema.',
          isVisible: false,
        },
      },
    ],
  },
  {
    id: 1,
    tab: 'Informació tècnica',
    fields: [
      {
        field: 'Tipus de sistema',
        description: {
          text: 'Tipologia del sistema.',
          isVisible: false,
        },
      },
      {
        field: 'Rendiment',
        description: {
          text: "Grau d'assoliment de l'objectiu i precisió dels resultats.",
          isVisible: false,
        },
      },
      {
        field: 'Dades de funcionament',
        description: {
          text: 'Conjunt de dades que utilitza el sistema en funcionament per obtenir resultats.',
          isVisible: false,
        },
      },
      {
        field: "Dades d'entrenament",
        description: {
          text: "Conjunt de dades d'entrenament que utilitza el sistema per aprendre a funcionar.",
          isVisible: false,
        },
      },
      {
        field: 'Equitat',
        description: {
          text: "Accions que s'han dut a terme per garantir que el sistema no discrimini a l'hora de donar resultats.",
          isVisible: false,
        },
      },
    ],
  },
  {
    id: 2,
    tab: 'Informació normativa i transparència',
    fields: [
      {
        field: 'Normativa',
        description: {
          text: "Normativa que defineix i regula l'ús del sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Dades personals',
        description: {
          text: 'Tractament de les dades personals i la normativa que el permet.',
          isVisible: false,
        },
      },
      {
        field: "Avaluació de l'execució",
        description: {
          text: 'Informes que avaluen el sistema des de criteris diversos.',
          isVisible: false,
        },
      },
      {
        field: 'Beneficis',
        description: {
          text: "Avantatges i millores que comporta l'ús del sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Persones destinatàries',
        description: {
          text: "Persones o conjunt de persones a les quals s'adreça el sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Riscos',
        description: {
          text: 'Descripció dels riscos del sistema i dels mètodes utilitzats per reduir-los.',
          isVisible: false,
        },
      },
      {
        field: 'Funcionament',
        description: {
          text: 'Informació específica sobre com funciona el sistema: quin tipus de mètode fa servir i quines eines utilitza.',
          isVisible: false,
        },
      },
      {
        field: "Dades sobre l'equip de desenvolupament",
        description: {
          text: "Dades sobre la composició de l'equip de desenvolupament del sistema.",
          isVisible: false,
        },
      },
      {
        field: "Intervenció o supervisió d'una persona en els resultats",
        description: {
          text: 'Participació i revisió humana en els resultats del sistema.',
          isVisible: false,
        },
      },
      {
        field: "Procediment d'oposició",
        description: {
          text: "Garantia del dret d'oposar-se a l'ús o al resultat del sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Consum energètic',
        description: {
          text: 'Recursos energètics que consumeix el funcionament del sistema.',
          isVisible: false,
        },
      },
    ],
  },
];
