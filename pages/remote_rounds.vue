<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="flex-col">
        <h2>

            <a href="https://github.com/laaners/yugioh_comprehensive_rulebook/blob/OCG-rulings-DB/remote/rules.md"
                target="_blank">Regole per il remote duel</a>
        </h2>
        <h2>
            <a href="https://youtube.com/playlist?list=PLHNUuTwisx_gDACTx3B4XnP7Rf9mUPrWV&feature=shared" target="_blank">Playlist
                Youtube dei duelli registrati</a>
        </h2>

        <h2>Classifica</h2>
        <div class="table-container table-container-rankings">
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Points</th>
                </tr>
                <tr v-for="(rank, i) of rankings" :key="rank.duelist">
                    <td>{{ i + 1 }}</td>
                    <td>{{ rank.duelist }}</td>
                    <td>{{ rank.points }}</td>
                </tr>
            </table>
        </div>
        <div class="flex-row">
            <span><b>Visualizza i pairings del turno:&ensp;</b></span>
            <select ref="round" v-model="round" name="round">
                <option label="2" selected>2</option>
                <option label="1">1</option>
            </select>
        </div>
        <div class="table-container">
            <table>
                <tr>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Possibile orario</th>
                    <th>Risultato</th>
                </tr>
                <tr v-for="match of allPairings.find(_ => _.round === +round).matches"
                    :key="match.player1 + '-' + match.player2">
                    <td>{{ match.player1 }}</td>
                    <td>{{ match.player2 }}</td>
                    <td :id="'av-' + match.player1 + '-' + match.player2">{{ match.outcome === 'BYE' ? '' :
                        computeAvailability(match) }}</td>
                    <td>{{ match.outcome }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Utils from "~/mixins/utils"

export default {
    name: "RemoteLocal",
    mixins: [Utils],
    layout: "default_remote",
    data: () => ({
        allAvailabilities: [],
        round: "2",
        rankings: [
            {
                "duelist": "Edoardo",
                "points": 3
            },
            {
                "duelist": "Fabian",
                "points": 3
            },
            {
                "duelist": "Fede",
                "points": 0
            },
            {
                "duelist": "Giorgio",
                "points": 0
            },
            {
                "duelist": "Luiso",
                "points": 0
            },
            {
                "duelist": "Richard",
                "points": 3
            },
            {
                "duelist": "Riccardo",
                "points": 3
            },
            {
                "duelist": "Yu",
                "points": 3
            },
            {
                "duelist": "Alessio",
                "points": 6
            },
            {
                "duelist": "Curry",
                "points": 0
            },
        ]
        ,
        allPairings: [
            {
                "round": 1,
                "matches": [
                    {
                        "player1": "Alessio",
                        "player2": "Edoardo",
                        "when": "Svolto il 25-02 alle 21:00",
                        "outcome": "Vince Alessio",
                    },
                    {
                        "player1": "Curry",
                        "player2": "Richard",
                        "when": "Svolto il 27-02 alle 21:00",
                        "outcome": "Vince Richard"
                    },
                    {
                        "player1": "Fabian",
                        "player2": "Giorgio",
                        "when": "Svolto il 25-02 alle 22:30",
                        "outcome": "Vince Fabian, Giorgio drop"
                    },
                    {
                        "player1": "Fede",
                        "player2": "Yu",
                        "when": "Svolto il 24-02 alle 21:00",
                        "outcome": "Vince Yu"
                    },
                    {
                        "player1": "Luiso",
                        "player2": "Riccardo",
                        "when": "Svolto il 24-02 alle 22:00",
                        "outcome": "Vince Riccardo, Luiso drop"
                    }
                ],
            },
            {
                "round": 2,
                "matches": [
                    {
                        "player1": "Fabian",
                        "player2": "Riccardo",
                        "when": "Domenica",
                        "outcome": ""
                    },
                    {
                        "player1": "Richard",
                        "player2": "Yu",
                        "when": "Giovedì sera",
                        "outcome": ""
                    }
                    ,
                    {
                        "player1": "Alessio",
                        "player2": "Fede",
                        "when": "Svolto il 04-02 alle 22:00",
                        "outcome": "Vince Alessio"
                    }
                    ,
                    {
                        "player1": "Edoardo",
                        "player2": "Curry",
                        "when": "Svolto il 04-02 alle 21:00",
                        "outcome": "Vince Edoardo"
                    }
                ]
            }
        ]
    }),
    watch: {
        async round(oldround, newround) {
        },
    },
    async mounted() {
        this.rankings.sort((a, b) => b.points - a.points)
        this.allAvailabilities = await this.$axios.$get(
            // "http://localhost:4000/get_availabilities",
            "https://ygobox-nuxt-vercel.vercel.app/get_availabilities"
        )
    },
    methods: {
        computeAvailability(match) {
            if (match.when.length > 1) return match.when
            if (this.allAvailabilities.length === 0) return
            const p1av = this.allAvailabilities.find(_ => _.duelist === match.player1).availabilities
            const p2av = this.allAvailabilities.find(_ => _.duelist === match.player2).availabilities

            const weekDays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]
            let ris = ""
            weekDays.forEach((day) => {
                // 'av-'+match.player1+'-'+match.player2
                const intersect = p1av[day].filter(value => p2av[day].includes(value))
                if (intersect.length > 1) {
                    ris += day + " alle: " + intersect.reduce((a, b) => this.hourParser(a) + ", " + this.hourParser(b)) + "\n"
                }
                else if (intersect.length === 1) {
                    ris += day + " alle: " + this.hourParser(intersect[0]) + "\n"
                }
            })
            console.log(ris)
            return ris

        },
        hourParser(hour) {
            if (hour === 24) return "00:00"
            if (hour < 10) return "0" + hour + ":00"
            return hour + ":00"
        },
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
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    white-space: pre;
}

table {
    overflow-x: scroll;
    margin-left: auto;
    margin-right: auto;
}

.table-container {
    width: 95%;
    overflow-x: scroll;
}

.table-container-rankings {
    width: 50%;
    overflow-x: scroll;
}

.table-container table {
    width: 100%;
    margin: 0;

}
</style>