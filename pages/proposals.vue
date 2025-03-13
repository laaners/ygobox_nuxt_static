<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="flex-col">
        <div class="flex-row">
            <h1>Tu sei:&ensp;</h1>
            <select ref="duelist" v-model="duelist" name="duelist">
                <option label="Alessio" selected="selected">Alessio</option>
                <option label="Curry">Curry</option>
                <option label="Fabian">Fabian</option>
                <option label="Edoardo">Edoardo</option>
                <option label="Fede">Fede</option>
                <option label="Giorgio">Giorgio</option>
                <option label="Luiso">Luiso</option>
                <option label="Riccardo">Riccardo</option>
                <option label="Richard">Richard</option>
                <option label="Yu">Yu</option>
            </select>
        </div>
        <proposal-container :author="Alessio" :description="'Usare un D12 prima di iniziare la partita INFLAZIONE le carte che hanno un costo di attivazione devono pagarlo 2 volte per essere attivate, se non possono farlo non possono essere attivate.TERRENO A MOLLA Tutti i mostri evocati sul terreno passano immediatamente sotto il controllo dellavversario OFFERTA ALLE DIVINITÀ ESTERNE Una volta per duello, durante il turno di qualsiasi giocatore (effetto rapido) un giocatore può scartare 1 carta per scegliere una carta dal suo side deck e aggiungerla alla mano.LIBRERIA INFINITA DEL MONDO CHIUSOAllinizio di ogni turno il giocatore di turno bandisce a faccia in giù le prime 10 carte del suo deck, dopodiché ne può scegliere una da aggiungere alla mano.CONNESSIONE ISTANTANEAI giocatori rivelano il proprio extra deck e mescolano tutti i mostri link nel loro main deck, dopodiché pescano 2 carte. Quando un giocatore pesca un mostro link esso DEVE essere evocato istantaneamente sul terreno in qualunque zona CARTA ignorando le condizioni di evocazione.SORVEGLIANZA ASSOLUTA IMPERIALEI giocatori ogni volta che devono aggiungere o pescare una carta (anche allinizio della partita)passano il deck allavversario che sceglierà la carta da mettere in cima al deck per pescarla oppure il target CORRETTO da aggiungere alla mano.'" :votes="5" />
    </div>
</template>

<script>
import ProposalContainer from "../components/ProposalContainer.vue"
import Utils from "~/mixins/utils"

export default {
    name: "RemoteLocal",
    // eslint-disable-next-line vue/no-unused-components
    components: { ProposalContainer },
    mixins: [Utils],
    layout: "default_remote",
    data: () => ({
        weekDays: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
        timeHours: [
            8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
        ],
        availabilities: {},
        allAvailabilities: [],
        duelist: "Alessio"
    }),
    watch: {
    },
    async mounted() {

    },
    methods: {
    }
}
</script>

<style scoped>
.flex-col>* {
    margin: var(--space-0);
}

table,
th,
td {
    border: 1px solid #dddddd;
    border-collapse: collapse;
}

th {
    width: 50px;
}

td {
    width: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    white-space: pre;
}

table {
    overflow-x: scroll;
    margin-left: auto;
    margin-right: auto;
}

.submit-table-container {
    overflow-x: scroll;
    width: 80%;
}

.submit-table-container table {
    width: 100%;
    margin: 0;

}

.submit-table-container table td {
    cursor: pointer;
}
</style>