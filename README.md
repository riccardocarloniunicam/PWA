# PWA

Introduzione
Lo scopo del progetto è quello di creare un’applicazione nativa. La nostra idea è quella di sviluppare una app di incontri stile Tinder. L’utente quindi dopo aver effettuato la registrazione visualizzerà, una alla volta, il profilo degli utenti e attraverso uno swipe verso destra o sinistra l’utente potrà decidere o meno se è interessato a quella persona. Se l’interesse è reciproco i due utenti avranno accesso ad una chat. La visualizzazione di tali profili non è randomica ma vengono visualizzati profili di persone che vivono nella stessa nazione e che soddisfano i requisiti definiti dall’utente cioè il sesso.
Tecnologie
Per la creazione dell’applicazione ibrida abbiamo utilizzato ionic con angularjs. L’applicazione invierà le richieste restful ad un server NodeJS il quale utilizza expressJS per la gestione delle richieste. Il server è creato secondo il pattern MVC. Infine come database abbiamo utilizzato MySQL.


![alt text](https://github.com/riccardocarloniunicam/PWA/blob/master/img.png)


L’utente appena avviata l’applicazione si troverà davanti la schermata di login nella quale potrà effettuare il login se già registrato oppure andare alla pagina di registrazione. In quest’ultima pagina sarà richiesto all’utente di compilare un form con i seguenti dati:
- Username
- Password
- Email
- Data di nascita
Sesso
-interessi ( sesso al quale è interessato l’utente)
Una volta effettuata la registrazione l’utente si troverà nella homepage dell’applicazione. La schermata principale mostra uno alla volta una serie di profili ai quali attraverso uno swipe potrà decidere se è
interessato o meno a tale persona ed in caso di un interesse reciproco, potrà decidere di avviare una chat. In basso nel footer l’utente potrà navigare tra le pagine dell’applicazione ovvero visualizzare il suo profilo e le chat.
