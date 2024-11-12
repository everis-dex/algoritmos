import { ITabsData } from './tabs-data.model';

export const tabsData: ITabsData = [
  {
    'Informació general': {
      labels: [
        {
          title: 'Nivell de risc',
          description:
            "Classificació dels sistemes en funció del seu impacte segons els criteris del Reglament europeu d'IA.",
          text: "Seleccionar (segons reglament AI Act):\n- Risc Alt\n- Risc Limitat\n- Risc Mínim\n- IA de Propòsit General\n\nSi hi ha algun amb 'Risc Inacceptable', degut a que aquest no es podrà implementar, no es publicarà.",
        },
        {
          title: "Forma d'adquisició",
          description:
            "Procés de desenvolupament, compra o integració d'aquest sistema.",
          text: 'Seleccionar:\n- Desenvolupat internament\n- Comprat al mercat i integració interna\n- Desenvolupat i integrat per un proveïdor extern',
        },
        {
          title: 'Font de finançament',
          description:
            'Conjunt de recursos econòmics utilitzats per desenvolupar, adquirir o implementar aquest sistema.',
          text: 'Text lliure.',
        },
        {
          title: 'Desenvolupador',
          description:
            "Persona, equip o empresa responsable de crear, entrenar i ajustar l'algorisme per a una aplicació específica.",
          text: 'Seleccionar:\n- Llistat per definir\n\nPot ser una empresa contractada, el CTTI, la mateixa Unitat responsable.',
        },
        {
          title: 'Unitat responsable',
          description:
            "Unitat o entitat de la Generalitat responsable de l'ús del sistema.",
          text: 'Seleccionar:\n- Direccions generals\n-Sector públic',
        },
        {
          title: 'Tema',
          description:
            "Àrea o àmbit d'aplicació específic dels 24 distribuïts per la Generalitat de Catalunya en els quals aquest sistema està dissenyat per funcionar.",
          text: 'Seleccionar:\n- Llistat per definir',
        },
        {
          title: 'Declarat com actuació administrativa automatitzada',
          description:
            "Una actuació administrativa automatitzada és qualsevol acte o actuació realitzada íntegrament a través de mitjans electrònics per una Administració pública en el marc d'un procediment administratiu i en la qual no hi hagi intervingut de manera directa un empleat públic.",
          text: 'Sí o no + enllaç a la resolució, si escau.',
        },
        {
          title: 'Política pública on intervé el sistema',
          description:
            "Conjunt de decisions i directrius oficials que guien l'ús i la implementació d'aquest sistema en àmbit del pla de Govern o pla sectorial del qual forma part el sistema.",
          text: 'Text lliure.',
        },
        {
          title: "Data d'entrada",
          text: '10/01/2024',
        },
        {
          title: "Data de l'última modificació",
          text: '10/01/2024',
        },
        {
          title: 'Motiu de la modificació',
          text: 'Text lliure.',
        },
      ],
    },
  },
  {
    'Informació bàsica': {
      labels: [
        {
          title: 'Tasca del sistema en el procediment',
          description: "Tipologia de l'algorisme utilitzat pel sistema.",
          text: 'Llenguatge tècnic.',
        },
        {
          title: 'Tipus de sistema algorísmic',
          description:
            "La tipologia de l'algorisme es refereix al tipus específic d'algorisme o mètode computacional que s'utilitza per processar les dades i prendre decisions automàtiques.",
          text: "Seleccionar:\n- Algorisme determinista\n- Algorisme d'IA",
        },
        {
          title: 'Rendiment',
          description:
            "El rendiment esperat del sistema i les mètriques utilitzades. Per exemple: AUC/*accuracy=0.89. Especificar en quina mesura el sistema resol l'objectiu esperat, en una varietat de casos.",
          text: 'Text lliure.',
        },
        {
          title: 'Dades usades per al seu funcionament',
          description:
            "Breu descripció sobre el repositori o conjunt de dades utilitzat per a l'entrenament. Per exemple, dades dels usuaris de la renda bàsica universal actuals (2023-2024). No inclou dades de gènere, nacionalitat.",
          text: 'Text lliure.',
        },
        {
          title: 'Dades utilitzades en producció',
          description:
            "Breu descripció sobre el repositori o conjunt de dades en producció utilitzat per a l'entrenament. Per exemple, dades dels usuaris de la renda bàsica universal actuals (2023-2024). No inclou dades de gènere, nacionalitat, etc.",
          text: 'Text lliure.',
        },
        {
          title: 'Equitat',
          description:
            "Avaluació per determinar si el sistema tracta de manera justa i imparcial a tots els grups i individus afectats, sense generar discriminació o biaixos injustos. Si no se n'ha detectat cap, que s'expliciti.",
          text: "Si s'ha fet o no s'ha fet un test d'equitat.\n\nEn cas afirmatiu, TEXT LLIURE per descriure els biaixos i mesures. MOLT IMPORTANT.",
        },
      ],
    },
  },
  {
    'Informació normativa i transparència': {
      labels: [
        {
          title: "Regulació aplicable a l'algorisme",
          description: "Base normativa que legitima l'ús del sistema",
          text: "Si s'ha fet o no s'ha fet un test d'equitat.\n\nEn cas afirmatiu, TEXT LLIURE per descriure els biaixos i mesures. MOLT IMPORTANT.",
        },
        {
          title: 'Dades personals',
          description:
            'Informació relacionada amb individus que pot ser utilitzada per identificar-los directament o indirectament, i que és processada pel sistema per a les seves funcions i càlculs.\nURL del tractament de dades personals Explicació de la URL.',
          text: 'Seleccionar:\n- Sí. Especificar el tractament dut a terme i la seva base legal.\n- No',
        },
        {
          title: "Avaluació d'execució del sistema/ algorisme",
          description:
            "Procés de valoració del rendiment i del comportament del sistema o de l'algorisme en la seva aplicació pràctica, per determinar la seva eficàcia i precisió en les tasques que ha de realitzar.\nURL de l'informe, si existeix.",
          text: 'Seleccionar:\n- Sí + indicar quin\n- No\n\nSi hi ha algun informe, cal publicar la URL.\nEnllaç',
        },
        {
          title: 'Beneficis',
          description:
            "Tots els beneficis que comporta l'ús de l'algorisme. Preferentment, separant aquells adreçats a la ciutadania i aquells adreçats a la mateixa Administració.",
          text: 'Text lliure.',
        },
        {
          title: 'Perfil de la ciutadania afectada',
          description:
            "Descripció dels grups o persones que poden ser impactats directament per les decisions preses per l'algorisme, basades en les dades i els criteris utilitzats pel sistema. Si són d'exclusió social, col·lectius, dones, menors…",
          text: 'Seleccionar:\n- Llistat per definir\n\nValors. MOLT IMPORTANT. Llenguatge clar.',
        },
        {
          title: 'Riscos',
          description:
            "Possibles conseqüències negatives o impactes adversos que poden derivar de l'ús d'aquest sistema, com ara discriminació, errors en les prediccions o vulnerabilitat a la manipulació.",
          text: 'Resultat anàlisi intern de riscos.',
        },
        {
          title: 'Explicabilitat',
          description:
            "Capacitat de poder entendre i explicar de manera clara i comprensible com el sistema pren decisions o fa prediccions basades en les dades i l'algorisme utilitzat.Si es tracta d'un sistema interpretable o de caixa negra.",
          text: 'Text lliure.',
        },
        {
          title: "Composició de l'equip",
          description:
            "Informació específica sobre la composició de l'equip de desenvolupament en quant a diversitat de gènere, edat, perfil professional, llengua materna...",
          text: 'Text lliure.',
        },
        {
          title: 'Intervenció / supervisió humana',
          description:
            'Participació activa o control exercit per persones per monitoritzar, influir o prendre decisions sobre les accions del sistema, assegurant un comportament ètic i adequat segons les circumstàncies. Si existeix, proporcionar informació sobre com es garanteix la supervisió i control humà del sistema.',
          text: "Sí / No (defecte: No)\n\nSi n'hi ha, seleccioneu entre:\n- Presa de decisió totalment automatitzada\n- Presa de decisió automatitzada, però validació final humana\n- Suport a la presa de decisió, presa de decisió humana",
        },
        {
          title: "Procediment d'objecció",
          description:
            'Mecanisme establert per permetre als individus o grups afectats presentar reclamacions o objeccions contra les decisions preses pel sistema, especialment quan sospiten errors, biaixos o discriminació.',
          text: 'Seleccionar:\n- Sí + indicar quin\n- No',
        },
        {
          title: 'Consum energètic',
          description:
            "Quantitat d'energia que el sistema requereix per funcionar, incloent el processament de dades i càlculs complexos necessaris per a les seves funcions.",
          text: 'Text lliure.',
        },
      ],
    },
  },
];
