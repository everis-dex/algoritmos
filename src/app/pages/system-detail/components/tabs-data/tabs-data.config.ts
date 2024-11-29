import { ITabData } from './tabs-data.model';

export const tabsData: ITabData[] = [
  {
    id: 1,
    tab: 'Informació general',
    fields: [
      {
        field: 'Nivell de risc',
        description: {
          text: "Classificació dels sistemes en funció del seu impacte segons els criteris del Reglament europeu d'IA.",
          isVisible: false,
        },
      },
      {
        field: "Forma d'adquisició",
        description: {
          text: "Procés de desenvolupament, compra o integració d'aquest sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Font de finançament',
        description: {
          text: 'Conjunt de recursos econòmics utilitzats per desenvolupar, adquirir o implementar aquest sistema.',
          isVisible: false,
        },
      },
      {
        field: 'Desenvolupador',
        description: {
          text: "Persona, equip o empresa responsable de crear, entrenar i ajustar l'algorisme per a una aplicació específica.",
          isVisible: false,
        },
      },
      {
        field: 'Unitat responsable',
        description: {
          text: "Unitat o entitat de la Generalitat responsable de l'ús del sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Tema',
        description: {
          text: "Àrea o àmbit d'aplicació específic dels 24 distribuïts per la Generalitat de Catalunya en els quals aquest sistema està dissenyat per funcionar.",
          isVisible: false,
        },
      },
      {
        field: 'Declarat com actuació administrativa automatitzada',
        description: {
          text: "Una actuació administrativa automatitzada és qualsevol acte o actuació realitzada íntegrament a través de mitjans electrònics per una Administració pública en el marc d'un procediment administratiu i en la qual no hi hagi intervingut de manera directa un empleat públic.",
          isVisible: false,
        },
      },
      {
        field: 'Política pública on intervé el sistema',
        description: {
          text: "Conjunt de decisions i directrius oficials que guien l'ús i la implementació d'aquest sistema en àmbit del pla de Govern o pla sectorial del qual forma part el sistema.",
          isVisible: false,
        },
      },
      {
        field: "Data d'entrada",
      },
      {
        field: "Data de l'última modificació",
      },
      {
        field: 'Motiu de la modificació',
      },
      {
        field: 'Data de desmantellament',
      },
    ],
  },
  {
    id: 2,
    tab: 'Informació tècnica',
    fields: [
      {
        field: 'Tasca del sistema en el procediment',
        description: {
          text: "Tipologia de l'algorisme utilitzat pel sistema.",
          isVisible: false,
        },
      },
      {
        field: 'Tipus de sistema algorísmic',
        description: {
          text: "La tipologia de l'algorisme es refereix al tipus específic d'algorisme o mètode computacional que s'utilitza per processar les dades i prendre decisions automàtiques.",
          isVisible: false,
        },
      },
      {
        field: 'Rendiment',
        description: {
          text: "El rendiment esperat del sistema i les mètriques utilitzades. Per exemple: AUC/*accuracy=0.89. Especificar en quina mesura el sistema resol l'objectiu esperat, en una varietat de casos.",
          isVisible: false,
        },
      },
      {
        field: 'Dades usades per al seu funcionament',
        description: {
          text: "Breu descripció sobre el repositori o conjunt de dades utilitzat per a l'entrefieldnt. Per exemple, dades dels usuaris de la renda bàsica universal actuals (2023-2024). No inclou dades de gènere, nacionalitat.",
          isVisible: false,
        },
      },
      {
        field: 'Dades utilitzades en producció',
        description: {
          text: "Breu descripció sobre el repositori o conjunt de dades en producció utilitzat per a l'entrefieldnt. Per exemple, dades dels usuaris de la renda bàsica universal actuals (2023-2024). No inclou dades de gènere, nacionalitat, etc.",
          isVisible: false,
        },
      },
      {
        field: 'Equitat',
        description: {
          text: "Avaluació per determinar si el sistema tracta de manera justa i imparcial a tots els grups i individus afectats, sense generar discriminació o biaixos injustos. Si no se n'ha detectat cap, que s'expliciti.",
          isVisible: false,
        },
      },
    ],
  },
  {
    id: 3,
    tab: 'Informació normativa i transparència',
    fields: [
      {
        field: "Regulació aplicable a l'algorisme",
        description: {
          text: "Base normativa que legitima l'ús del sistema",
          isVisible: false,
        },
      },
      {
        field: 'Dades personals',
        description: {
          text: 'Informació relacionada amb individus que pot ser utilitzada per identificar-los directament o indirectament, i que és processada pel sistema per a les seves funcions i càlculs.\nURL del tractament de dades personals Explicació de la URL.',
          isVisible: false,
        },
      },
      {
        field: "Avaluació d'execució del sistema / algorisme",
        description: {
          text: "Procés de valoració del rendiment i del comportament del sistema o de l'algorisme en la seva aplicació pràctica, per determinar la seva eficàcia i precisió en les tasques que ha de realitzar.\nURL de l'informe, si existeix.",
          isVisible: false,
        },
      },
      {
        field: 'Beneficis',
        description: {
          text: "Tots els beneficis que comporta l'ús de l'algorisme. Preferentment, separant aquells adreçats a la ciutadania i aquells adreçats a la mateixa Administració.",
          isVisible: false,
        },
      },
      {
        field: 'Perfil de la ciutadania afectada',
        description: {
          text: "Descripció dels grups o persones que poden ser impactats directament per les decisions preses per l'algorisme, basades en les dades i els criteris utilitzats pel sistema. Si són d'exclusió social, col·lectius, dones, menors…",
          isVisible: false,
        },
      },
      {
        field: 'Riscos',
        description: {
          text: "Possibles conseqüències negatives o impactes adversos que poden derivar de l'ús d'aquest sistema, com ara discriminació, errors en les prediccions o vulnerabilitat a la manipulació.",
          isVisible: false,
        },
      },
      {
        field: 'Explicabilitat',
        description: {
          text: "Capacitat de poder entendre i explicar de manera clara i comprensible com el sistema pren decisions o fa prediccions basades en les dades i l'algorisme utilitzat.Si es tracta d'un sistema interpretable o de caixa negra.",
          isVisible: false,
        },
      },
      {
        field: "Composició de l'equip",
        description: {
          text: "Informació específica sobre la composició de l'equip de desenvolupament en quant a diversitat de gènere, edat, perfil professional, llengua materna...",
          isVisible: false,
        },
      },
      {
        field: 'Intervenció / supervisió humana',
        description: {
          text: 'Participació activa o control exercit per persones per monitoritzar, influir o prendre decisions sobre les accions del sistema, assegurant un comportament ètic i adequat segons les circumstàncies. Si existeix, proporcionar informació sobre com es garanteix la supervisió i control humà del sistema.',
          isVisible: false,
        },
      },
      {
        field: "Procediment d'objecció",
        description: {
          text: 'Mecanisme establert per permetre als individus o grups afectats presentar reclamacions o objeccions contra les decisions preses pel sistema, especialment quan sospiten errors, biaixos o discriminació.',
          isVisible: false,
        },
      },
      {
        field: 'Consum energètic',
        description: {
          text: "Quantitat d'energia que el sistema requereix per funcionar, incloent el processament de dades i càlculs complexos necessaris per a les seves funcions.",
          isVisible: false,
        },
      },
    ],
  },
];
