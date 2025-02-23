<template>
  <table>
    <tr>
      <th></th>
    </tr>
  </table>
</template>

<style>
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
