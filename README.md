# AUREA Collection — sito definitivo

Questa cartella contiene tutti i file pronti da copiare nella cartella locale collegata a GitHub Desktop.

## Contenuto
- 7 oggetti con fotografie, titolo e descrizione breve
- prezzi e condizioni esclusi dal sito pubblico
- dimensioni mostrate solo quando sono effettivamente note
- codice visibile come “AUREA A001”
- disponibilità con pallino senza cornice:
  - verde = Disponibile
  - giallo = Riservato
  - rosso = Venduto
- filtro per categoria e disponibilità
- modulo “Richiedi informazioni”
- preferenza di contatto via email o cellulare
- numero di cellulare richiesto solo quando viene scelto “Cellulare”
- messaggio già compilato con codice e titolo dell’oggetto
- italiano, inglese e francese
- nessun riferimento a certificazioni, expertise o documentazione

## Invio del modulo
Il modulo usa FormSubmit e invia a Carolina con copia a Grazia.
Al primo invio FormSubmit potrebbe mandare un’email di conferma a Carolina: basta confermare una sola volta.

Gli indirizzi non vengono mostrati sulla pagina, ma — essendo il sito statico — sono presenti nel codice sorgente del modulo.
Per nasconderli anche dal codice pubblico serve in futuro un piccolo servizio server-side.

## Pubblicazione
1. Estrai tutto lo ZIP.
2. Copia tutti i file e le cartelle nella tua cartella locale del repository AUREA.
3. Conferma la sostituzione dei file esistenti.
4. Apri GitHub Desktop.
5. Controlla le modifiche.
6. Scrivi un messaggio, per esempio: `Aggiornamento sito AUREA`.
7. Premi **Commit to main** e poi **Push origin**.


## Modifiche V2
- stato più piccolo;
- logo collegato alla homepage;
- sottotitolo “Private Italian Family Collection” sotto il logo;
- menu Contatti apre direttamente il modulo;
- rimossi i blocchi Authenticity, Italy & Europe e Personal Service;
- pulsante “Richiedi informazioni su questo oggetto”;
- modulo con tutti i campi obbligatori;
- scelta tipologia: Privato, Collezionista, Antiquario, Galleria, Interior Designer, Architetto o Altro;
- se viene scelto Altro, compare il campo obbligatorio “Specificare”;
- se viene scelto Cellulare, compare il numero obbligatorio;
- rimossa la frase “La richiesta sarà inviata a Carolina e Grazia”;
- footer minimale.


## CORREZIONE V3
Questa versione corregge il pacchetto precedente:
- logo realmente cliccabile;
- sottotitolo corretto sotto il logo;
- menu Contatti apre realmente il modulo;
- stato ulteriormente ridotto;
- aggiunto VERSIONE_AUREA_V3.txt per rendere evidente la modifica in GitHub Desktop.


## Versione 1.1
- menu mobile funzionante;
- lightbox a schermo intero con zoom, contatore, miniature, tastiera e swipe;
- caricamento differito delle immagini;
- transizioni più eleganti;
- SEO e metadati social migliorati;
- messaggio di conferma dopo l'invio del modulo;
- migliore esperienza su iPhone.
