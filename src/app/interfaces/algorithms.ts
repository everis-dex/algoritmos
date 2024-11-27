export interface IAlgorithm {
    actuacio_administrativa_automatitzada: string;
    avaluacio_drets_fonamentals: string;
    avaluacio_execucio_sistema: string;
    beneficis: string;
    caracteristiques_tecniques: string;
    certificat_ue: string;
    composicio_equip: string;
    consum_energetic: string;
    dades_entrenament: string;
    dades_funcionament: string;
    dades_personals: string;
    data_posada_produccio: string;
    data_retirada: string;
    data_ultima_modificacio: string;
    descripcio: string;
    desenvolupador: string;
    equitat: string;
    estat: string;
    etiquetes: string;
    explicabilitat: string;
    font_financament: string;
    forma_adquisicio: string;
    instruccions_us: string;
    intervencio_supervisio_humana: string;
    motiu_modificacio: string;
    nivell_de_risc: string;
    nom: string;
    normativa_aplicable: string;
    perfil_ciutadania_afectada: string;
    periocitat_antiga_avaluacio: string;
    periocitat_proxima_avaluacio: string;
    politica_publica: string;
    procediment_objeccio: string;
    rendiment: string;
    riscos: string;
    tema: string;
    tipus_sistema: string;
    unitat_responsable: string;
    copia_escanejada_ue?: string;
    declaracio_conformitat?: string;
    fitxers?: string;
    informes_avaluacio_interns?: string;
  }


  export interface IFilterSearch {
    tema?: string;
    estat?: string;
    etiquetes?: string;
    tipus_sistema?: string;
  }