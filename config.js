module.exports = {
    postgres: {
<<<<<<< .merge_file_CuJfrX
        db: "ambiente",
        url: "openpuglia.org",
        port: 5432,
        username: "openpuglia",
        password: "openPugl1a2016"
    }
=======
        db: "",
        url: "",
        port: 5432,
        username: "",
        password: ""
    },
    assets: [
        {
            key: 'agglomerati',
            value: 'Agglomerati storici'
        },
        {
            key: 'percorsi_storici',
            value: 'Percorsi storici'
        },
        {
            key: 'boschi_ipla',
            value: 'Boschi ipla'
        },
        {
            key: 'laghi',
            value: 'Laghi'
        },
        {
            key: 'pericolosita_geologica',
            value: 'Pericolosita geologica'
        },
        {
            key: 'piste_sci',
            value: 'Piste sci alpino'
        },
        {
            key: 'pmir7',
            value: 'PMIR 7 Turismo invernale'
        },
        {
            key: 'ptir1',
            value: 'PTIR 1 Valdigne'
        },
        {
            key: 'ptir2',
            value: 'PTIR 2 Piana di Aosta'
        },
        {
            key: 'ptir3',
            value: 'PTIR 3 Bard'
        },
        {
            key: 'punti_reg_flussi_veic',
            value: 'Punti regolazione flussi veicolari'
        },
        {
            key: 'rete_fluviale',
            value: 'Rete fluviale'
        },
        {
            key: 'rifugi_bivacchi',
            value: 'Rifugi e Bivacchi'
        },
        {
            key: 'ripetitori_tv',
            value: 'Ripetitori TV'
        },
        {
            key: 'sa_aree_nat_alta_quota',
            value: 'Sistema aree naturali - Sottosistema alta quota'
        },
        {
            key: 'sa_aree_naturali',
            value: 'Sistema aree naturali - Sottosistema aree naturali'
        },
        {
            key: 'sa_boschi',
            value: 'Sistema boschivo'
        },
        {
            key: 'sa_fluviali',
            value: 'Sistema fluviale'
        },
        {
            key: 'sa_insed_svil_integr',
            value: 'Sistemi insediativi - Sottosistemi integrati'
        },
        {
            key: 'sa_insed_svil_resid',
            value: 'Sistemi insediativi - Sottosistemi residenziali'
        },
        {
            key: 'sa_insed_svil_trad',
            value: 'Sistemi insediativi - Sottosistemi tradizionali'
        },
        {
            key: 'sa_insed_svil_turis',
            value: 'Sistemi insediativi - Sottosistemi turistici'
        },
        {
            key: 'sa_pascoli',
            value: 'Sistema Pascolo'
        },
        {
            key: 'sa_urbani',
            value: 'Sistema Urbano'
        },
        {
            key: 'servizi_txt',
            value: 'Servizi di rilevanza regionale'
        },
        {
            key: 'sistema_misto_urbano_fluviale',
            value: 'Fasce fluviali sistemi urbani'
        },
        {
            key: 'staz_ferrovia_esistenti',
            value: 'Stazioni esistenti'
        },
        {
            key: 'staz_ferrovia_progetto',
            value: 'Stazioni in progetto'
        },
        {
            key: 'staz_turistiche',
            value: 'Stazioni turistiche'
        },
        {
            key: 'strade_balconata_envers',
            value: 'PMIR 1 e 2 Fasce envers e adret'
        },
        {
            key: 'strade_varianti_viabilita',
            value: 'Varianti della viabilita ordinaria'
        },
        {
            key: 'strade_viabilita_princ',
            value: 'Viabilita principale'
        },
        {
            key: 'tour_escursionistici',
            value: 'Tour escursionistici'
        },
        {
            key: 'trenino_cogne_pila',
            value: 'Trenino Cogne Pila'
        },
        {
            key: 'villes',
            value: 'Villes'
        },
        {
            key: 'vinc_aree_fiumi',
            value: 'Aree rispetto fiumi'
        },
        {
            key: 'vinc_aree_laghi',
            value: 'Aree rispetto laghi'
        },
        {
            key: 'vinc_cdl_1600',
            value: 'Vincolo 1600'
        },
        {
            key: 'vinc_ghiacciai',
            value: 'Ghiacciai'
        },
        {
            key: 'vinc_idrogeologico',
            value: 'Vincolo idrogeologico'
        },
        {
            key: 'vinc_legge_1497',
            value: 'Vincolo legge 1497'
        },
        {
            key: 'vinc_legge_castagno',
            value: 'Legge Castagno'
        },
        {
            key: 'vinc_parchi',
            value: 'Parchi'
        },
        {
            key: 'vinc_riserve',
            value: 'Riserve'
        },
        {
            key: 'beni_naturalistici_punt',
            value: 'Beni naturalistici puntuali'
        },
        {
            key: 'autostrade_svincoli',
            value: 'Svincoli autostradali'
        },
        {
            key: 'autostrade',
            value: 'Autostrade'
        },
        {
            key: 'attrezzature_leggere',
            value: 'Attrezzature leggere'
        },
        {
            key: 'attest_affl_turistico',
            value: 'Attestamenti grande afflusso turistico'
        },
        {
            key: 'fasce_fluviali',
            value: 'Fasce fluviali'
        },
        {
            key: 'elementi_areali',
            value: 'Elementi areali'
        },
        {
            key: 'elementi_lineari',
            value: 'Elementi lineari'
        },
        {
            key: 'aree_tutela',
            value: 'Aree di tutela'
        },
        {
            key: 'aree_protette',
            value: 'Aree protette'
        },
        {
            key: 'pmir3_simb',
            value: 'PMIR 3 Simboli dei castelli'
        },
        {
            key: 'pmir3',
            value: 'PMIR 3 Sistema dei castelli'
        },
        {
            key: 'aosta_bourgs',
            value: 'Aosta e bourgs'
        },
        {
            key: 'altri_parchi',
            value: 'Altri parchi'
        },
        {
            key: 'vinc_aree_archeologiche',
            value: 'Aree archeologiche'
        },
        {
            key: 'beni_culturali_isolati',
            value: 'Beni culturali isolati'
        },
        {
            key: 'dora_baltea',
            value: 'Dora Baltea'
        },
        {
            key: 'fasce_urbane_da_riq',
            value: 'Fasce urbane da riqualificare'
        },
        {
            key: 'alte_vie',
            value: 'Alte Vie'
        },
        {
            key: 'comprensori_sci',
            value: 'Comprensori sci'
        },
        {
            key: 'elementi_puntuali',
            value: 'Elementi puntuali'
        },
        {
            key: 'ferrovia_aosta_martigny',
            value: 'Ferrovia AO Martigny'
        },
        {
            key: 'ferrovia',
            value: 'Ferrovia'
        },
        {
            key: 'impianti_arroccamento',
            value: 'Impianti arrocamento'
        },
        {
            key: 'nodi_interscambio_base20',
            value: 'Nodi interscambio base 20'
        },
        {
            key: 'industria_txt',
            value: 'Impianti industriali'
        },
        {
            key: 'nodi_interscambio_base100',
            value: 'Nodi interscambio base 100'
        },
        {
            key: 'impianti_risalita',
            value: 'Impianti di risalita'
        },
        {
            key: 'percorsi_intervallivi',
            value: 'Percorsi Intervallivi'
        },
        {
            key: 'percorsi_verde_urbano',
            value: 'Percorsi in aree di verde attrezzato urbano'
        },
        {
            key: 'pmir1_fascia_dora',
            value: 'PMIR 1 Fascia della Dora'
        },
        {
            key: 'piste_sci_nordico',
            value: 'Piste sci nordico'
        },
        {
            key: 'pmir5',
            value: 'PMIR 5 Territorio Walser'
        },
        {
            key: 'pmir6',
            value: 'PMIR 6 Alte vie e altri itinerari escursionistici'
        },
        {
            key: 'pmir6_simb',
            value: 'PMIR 6 Simboli Alte vie'
        },
        {
            key: 'pngp',
            value: 'Parco Nazionale Gran Paradiso'
        }
    ]
>>>>>>> .merge_file_OUJztS
}
