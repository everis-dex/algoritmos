import { AlgorithmicSystemCard, TopicCard } from '../interfaces/cards';

export const mockAlgorithmicSystems: AlgorithmicSystemCard[] = [
  {
    id: 1,
    state: 'Actiu',
    title:
      'Algorisme Intel·ligent per a la gestió de les prioritats en el sector públic',
    description:
      'El projecte implementa un algorisme intel·ligent per a la gestió de les prioritats en el sector públic',
    categoryChips: [
      'Administració pública',
      'Administració pública, govern i relacions institucionals',
    ],
    tags: ['Algorisme intel·ligent', 'Gestió de prioritats', 'Sector públic'],
  },
  {
    id: 2,
    state: 'Inactiu',
    title: 'Algorisme per a la identificació de patrons en dades de trànsit',
    description:
      'El projecte desenvolupa un algorisme per a la identificació de patrons en dades de trànsit',
    categoryChips: ['Economia'],
    tags: ['Identificació de patrons', 'Anàlisi de dades', 'Economia'],
  },
  {
    id: 3,
    state: 'En desenvolupament',
    title:
      'Algorisme de consolidació i càlcul de la productivitat en la indústria automòvil',
    description:
      'El projecte implementa un algorisme de consolidació i càlcul de la productivitat en la indústria automòvil',
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Productivitat industrial', 'Indústria automòvil', 'Innovació'],
  },
  {
    id: 4,
    state: 'En desenvolupament',
    title:
      "Algorisme per a la gestió de les reserves d'energia en un entorn residencial",
    description:
      "El projecte desenvolupa un algorisme per a la gestió de les reserves d'energia en un entorn residencial",
    categoryChips: ['Economia'],
    tags: [
      "Gestió d'energia",
      'Energia renovable',
      'Sostenibilitat residencial',
    ],
  },
  {
    id: 5,
    state: 'Actiu',
    title: "Probabilitat d'ocupació",
    description:
      "El projecte implementa un algorisme per a la predicció de la probabilitat d'ocupació en espais o edificis, basat en dades de comportament i variables ambientals.",
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Intel·ligència artificial', 'Machine learning', 'Anàlisi de dades'],
  },
  {
    id: 6,
    state: 'Actiu',
    title: 'Estimacions electorals del CEO',
    description:
      "El projecte desenvolupa un algorisme per a l'estimació dels resultats electorals basat en enquestes i altres dades rellevants.",
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Anàlisi de dades', 'Ètica digital', 'Seguretat informàtica'],
  },
  {
    id: 7,
    state: 'Actiu',
    title: 'Preinscripció escolar',
    description:
      'El projecte desenvolupa un algorisme per gestionar la preinscripció escolar de manera eficient, tenint en compte diversos factors com la demanda i la ubicació dels centres educatius.',
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Ètica digital', 'Protecció de dades', 'Seguretat informàtica'],
  },
  {
    id: 8,
    state: 'Actiu',
    title: "Previsió d'afluència de visitants",
    description:
      "El projecte implementa un algorisme per predir l'afluència de visitants en esdeveniments o llocs públics, basat en dades històriques i factors externs com el temps.",
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Protecció de dades', 'Ètica digital', 'Estadística'],
  },
  {
    id: 9,
    state: 'Actiu',
    title: 'Carnets professionals',
    description:
      "El projecte dissenya un sistema basat en algorismes per gestionar la creació i renovació de carnets professionals, assegurant l'autenticitat i l'accés a serveis exclusius.",
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Protecció de dades', 'Ètica digital', 'Automatització'],
  },
  {
    id: 10,
    state: 'Actiu',
    title:
      "Algorisme per a la gestió de les reserves d'energia en un entorn residencial",
    description:
      "El projecte desenvolupa un algorisme per optimitzar la gestió de reserves d'energia en habitatges, millorant l'eficiència energètica i reduint el consum.",
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Energia renovable', 'Eficiència energètica', 'Sostenibilitat'],
  },
  {
    id: 11,
    state: 'Actiu',
    title:
      "Algorisme per a la gestió de les reserves d'energia en un entorn residencial",
    description:
      "El projecte implementa un algorisme per a la gestió de les reserves d'energia en un entorn residencial, amb l'objectiu d'optimitzar l'ús de l'energia en funció de la demanda.",
    categoryChips: ['Tecnologia'],
    tags: ['Energia renovable', 'Smart homes', 'Eficiència energètica'],
  },
  {
    id: 12,
    state: 'Actiu',
    title:
      "Algorisme per a la gestió de les reserves d'energia en un entorn residencial",
    description:
      "El projecte dissenya un sistema que utilitza algorismes per gestionar de manera intel·ligent les reserves d'energia, millorant l'autonomia i la sostenibilitat en entorns residencials.",
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Smart homes', 'Sostenibilitat', 'Machine learning'],
  },
  {
    id: 13,
    state: 'Actiu',
    title: "Previsió d'afluència de visitants",
    description:
      "El projecte implementa un algorisme per predir l'afluència de visitants, utilitzant tècniques d'anàlisi de dades per optimitzar l'organització d'esdeveniments.",
    categoryChips: ['Tecnologia, recerca i innovació'],
    tags: ['Anàlisi de dades', 'Estadística', 'Predictiu'],
  },
];
export const mockTopics: TopicCard[] = [
  {
    id: 1,
    image:
      'https://s3-alpha-sig.figma.com/img/455f/fcb5/c303634f4ac01395fcb6374a56d0e742?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAwEtHts1TnIjTQSsDWPQwkJg76CJg69lz5rM~TDoKLCZVFFsdfm9Sf5BoOF3kygpgLSuwwx1aETtRTVqynE5IYFv9dTT0uCWyjRXzVsQHVl6kR~Zbi~QoeWSfDYRVvx1kOlpAMenJLDz3EWVjTA2-LlF6ax~B3rndc-hA8O-waKNm75j9J9r8jeJtNHJLJG95dVAnmCxjZmsHZvFnUepQS5HF1W8fb6GGUgKpR-A2dxvmC6HcFUUQOuwrK5QSfF2OFmIrIXoVQx0lTqoqVT0Vs74xhCpGegNe0wNmUTUyRar819PsFB09gJvBv2YvKRRJIRO4Rs92iIDMfbYWVPwg__',
    title: "Sobre el registre de sistemes d'IA",
    description:
      "El registre de sistemes d'IA està integrat per la informació dels sistemes d'ús d'intel·ligència artificial i altres algorismes emprats en els serveis públics de l'Administració de la Generalitat.",
    url: 'https://administraciodigital.gencat.cat/ca/inici/',
  },
  {
    id: 2,
    image:
      'https://s3-alpha-sig.figma.com/img/66f1/ebee/92bbd6c6311f77d2c3481e6014504b03?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QQCbR6pv5EJBDKAl8ptc-y8RZ1nth85zKDb-HyQFas4GV0WTuUnsF6QzB0E4hKljWcn8ldUldZJiDDxnz8eUypUbY~yNCN8R27PfwWm8tXVHALppBDzoZOtbPDnJlVSeFhPKR0zQBoM5fSkOVTOXJ3k2W-ZidgsrxgWit3r7lsgCATrzPSmYG07VrGYIQInUEVpJAttIuDZMnNNhtBr-qkapgp8NRAXhl0v5h3RI7g8VkHR~2KV5MNimicu4uiMIaG4AKl6BGktJi5KH5T-dkY~9ObZQanceLn3BOyTlwUc8oLx8Gg4xVtGm4NmqfYfqI17yWdvh6BFNkPeUCliVBQ__',
    title: "Què és un sistema d'IA?",
    description:
      "La intel·ligència artificial és una disciplina de la informàtica, dedicada al desenvolupament d'algorismes, que permet que les màquines prenguin decisions intel·ligents",
    url: 'https://administraciodigital.gencat.cat/ca/inici/',
  },
];
