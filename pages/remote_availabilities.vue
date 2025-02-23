<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="flex-col">
        <div class="flex-row">
            <span><b>Cambia nome per visualizzare e modificare le disponibilità di:&ensp;</b></span>
            <select ref="duelist" v-model="duelist" name="duelist">
                <option label="Tutti" selected="selected">Tutti</option>
                <option label="Alessio">Alessio</option>
                <option label="Curry">Curry</option>
                <option label="Fabian">Fabian</option>
                <option label="Edoardo">Edoardo</option>
                <option label="Fede">Fede</option>
                <option label="Giorgio">Giorgio</option>
                <option label="Luiso">Luiso</option>
                <option label="Richard">Richard</option>
                <option label="Yu">Yu</option>
            </select>
        </div>
        <span v-if="duelist === 'Tutti'">Le celle colorate indicano che almeno 2 persone sono libere in quel giorno</span>

        <span v-if="duelist !== 'Tutti'">Clicca su una cella per segnalare che sei libero per quell'ora in quel giorno
            oppure riclicca per annullare, e
            poi clicca "SALVA"</span>
        <span v-if="duelist !== 'Tutti'"><b>(Per favore non modificare le disponibilità delle altre persone!)</b></span>
        <button-secondary v-if="duelist !== 'Tutti'" :title="'SALVA'" style="font-size: var(--font-size-h4)"
            @click.native="submitAvailabilities" />
        <div class="submit-table-container">
            <table>
                <tr>
                    <th></th>
                    <th v-for="hour of timeHours" :key="'table-header' + hour">
                        {{ hourParser(hour) }}
                    </th>
                    <th></th>
                </tr>
                <tr v-for="day of weekDays" :key="'day-row' + day">
                    <th>{{ day }}</th>
                    <td v-for="hour of timeHours" :id="day + '-' + hour" :key="day + '-' + hour"
                        @click="clickOnHour(day, hour)"></td>
                    <th>{{ day }}</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import ButtonSecondary from "../components/ButtonSecondary.vue";
import Utils from "~/mixins/utils"

export default {
    name: "RemoteLocal",
    components: { ButtonSecondary },
    mixins: [Utils],
    layout: "default_remote",
    data: () => ({
        weekDays: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
        timeHours: [
            8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
        ],
        availabilities: {},
        allAvailabilities: [],
        duelist: "Tutti"
    }),
    watch: {
        async duelist(oldDuelist, newDuelist) {
            this.allAvailabilities = await this.$axios.$get(
                // "http://localhost:4000/get_availabilities",
                "https://ygobox-nuxt-vercel.vercel.app/get_availabilities"
            )
            this.showAllNames()
            if (this.duelist === "Tutti") {
                this.showAllColors()
                return
            }
            this.availabilities = this.allAvailabilities.find(_ => _.duelist === this.duelist).availabilities
        },
        availabilities(oldAvailabilities, newAvailabilities) {
            for (const day of this.weekDays) {
                for (const timeHour of this.timeHours) {
                    document.body.querySelector(`#${day}-${timeHour}`).style.backgroundColor = "white"
                }
                for (const timeHour of this.availabilities[day]) {
                    document.body.querySelector(`#${day}-${timeHour}`).style.backgroundColor = "#90ee90"
                }
            }
        },
    },
    async mounted() {
        this.allAvailabilities = await this.$axios.$get(
            // "http://localhost:4000/get_availabilities",
            "https://ygobox-nuxt-vercel.vercel.app/get_availabilities"
        )
        this.showAllNames()
        this.showAllColors()
    },
    methods: {
        showAllNames() {
            for (const day of this.weekDays) {
                for (const timeHour of this.timeHours) {
                    document.body.querySelector(`#${day}-${timeHour}`).innerHTML = ``
                }
            }
            for (const obj of this.allAvailabilities) {
                console.log(JSON.stringify(obj))
                for (const day of this.weekDays) {
                    for (const timeHour of obj.availabilities[day]) {
                        document.body.querySelector(`#${day}-${timeHour}`).innerHTML += `${obj.duelist}\n`
                    }
                }
            }
        },
        showAllColors() {
            for (const day of this.weekDays) {
                for (const timeHour of this.timeHours) {
                    document.body.querySelector(`#${day}-${timeHour}`).style.backgroundColor = "white"
                }
            }
            for (const obj of this.allAvailabilities) {
                console.log(JSON.stringify(obj))
                for (const day of this.weekDays) {
                    for (const timeHour of obj.availabilities[day]) {
                        if (document.body.querySelector(`#${day}-${timeHour}`).innerHTML.split("\n").length > 2)
                            document.body.querySelector(`#${day}-${timeHour}`).style.backgroundColor = "green"
                    }
                }
            }
        },
        hourParser(hour) {
            if (hour === 24) return "00:00"
            if (hour < 10) return "0" + hour + ":00"
            return hour + ":00"
        },
        clickOnHour(day, hour) {
            if (this.duelist === "Tutti") return
            // remove
            if (this.availabilities[day].includes(hour)) {
                this.availabilities[day] = this.availabilities[day].filter(_ => _ !== hour)
                document.body.querySelector(`#${day}-${hour}`).style.backgroundColor = "white"
            }
            // add
            else {
                this.availabilities[day].push(hour)
                document.body.querySelector(`#${day}-${hour}`).style.backgroundColor = "#90ee90"
            }
            this.availabilities[day] = this.availabilities[day].sort((a, b) => a - b)
            this.availabilities = JSON.parse(JSON.stringify(this.availabilities))
        },
        clickOnHour_(day, hour) {
            /*
            // remove
            if (this.availabilities[day].includes(hour)) {
                this.availabilities[day] = this.availabilities[day].filter(_ => _ !== hour)
                // document.body.querySelector(`#${day}-${hour}`).style.backgroundColor = "white"
            }
            // add
            else {
                this.availabilities[day].push(hour)
                // document.body.querySelector(`#${day}-${hour}`).style.backgroundColor = "#90ee90"
            }
            */

            for (const timeHour of this.timeHours) {
                document.body.querySelector(`#${day}-${timeHour}`).style.backgroundColor = "white"
            }


            if (this.availabilities[day].length === 0) {
                this.availabilities[day].push(hour)
                document.body.querySelector(`#${day}-${hour}`).style.backgroundColor = "#90ee90"
            }
            else {


                const minHour = Math.min(...this.availabilities[day])
                const maxHour = Math.max(...this.availabilities[day])
                if (hour === minHour || hour === maxHour) {
                    this.availabilities[day] = []
                }
                else if (hour < minHour || (hour > minHour && hour < maxHour)) {
                    // hour to max
                    this.availabilities[day] = []
                    for (let i = hour; i <= maxHour; i++) {
                        this.availabilities[day].push(i)
                        document.body.querySelector(`#${day}-${i}`).style.backgroundColor = "#90ee90"
                    }
                }
                else if (hour > maxHour) {
                    // min to hour
                    this.availabilities[day] = []
                    for (let i = minHour; i <= hour; i++) {
                        this.availabilities[day].push(i)
                        document.body.querySelector(`#${day}-${i}`).style.backgroundColor = "#90ee90"
                    }
                }
            }


            this.availabilities[day] = [
                ...new Set(
                    this.availabilities[day]
                ),
            ].sort((a, b) => a - b)
            console.log(JSON.stringify(this.availabilities[day]))

            this.availabilities = JSON.parse(JSON.stringify(this.availabilities))
        },
        async submitAvailabilities() {
            const duelist = this.$refs.duelist.value
            await this.$axios.$post(
                "https://ygobox-nuxt-vercel.vercel.app/update_availabilities",
                // "http://localhost:4000/update_availabilities",
                {
                    duelist,
                    availabilities: this.availabilities,
                }
            )
            alert("Salvato con successo!")
            this.showAllNames()
        }
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