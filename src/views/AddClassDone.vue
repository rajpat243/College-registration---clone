<template>
    <div>
        <header>
            <h1>Class Added</h1>
            <button class="logout-button" @click="logout">Logout</button>
        </header>
    </div>
    <h1 class="done">Class successfully added!</h1>
    <button class="logout-button buttons" @click="addclass">Add another class</button>
    <button class="logout-button buttons" @click="homepage">Back</button>
</template>
<script>
    export default{
    data(){
        return {
        }
    },
    methods: {
        homepage() {
            this.$router.push('/professorscreen/:id')
        },
        addclass() {
            this.$router.push('/addclass')
        }
    }
}
</script>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    header {
        background-color: #002D62;
        color: white;
        padding: 20px;
        text-align: center;
    }
    header h1{
        font-size: 35px;
        color: white;
    }
    section {
        margin: 20px;
        color: #002D62
    }
    .logout-button {
        width: 120px;
        padding: 5px;
        background: #007BFF;
        border: none;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        display: block;
    }
    .logout-button:hover {
        background: #0056b3;
    }
    .buttons{
        margin: auto;
        margin-top: 20px;
    }
    .done{
        text-align: center;
        font-size: 36px;
    }
</style>