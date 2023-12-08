<template>
    <div>
        <header>
            <h1>Add a class</h1>
            <button class="logout-button" @click="logout">Logout</button>
        </header>
    </div>
    <div class="class-form">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="className">Class Name:</label>
                <input type="text" id="className" placeholder="Name" v-model="className" required>
            </div>

            <div class="form-group">
                <label for="classSize">Class Size:</label>
                <input type="number" id="classSize" placeholder="Size" v-model="classSize" required>
            </div>

            <div class="form-group">
                <label>Days:</label>
                <div class="days">
                    <div class="day" v-for="day in days" :key="day">
                        <label :for="day">{{ day }}</label>
                        <input type="checkbox" :id="day" v-model="selectedDays" :value="day">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="startTime">Start Time:</label>
                <input type="time" id="startTime" v-model="startTime" required>
            </div>

            <div class="form-group">
                <label for="endTime">End Time:</label>
                <input type="time" id="endTime" v-model="endTime" required>
            </div>

            <button type="submit" @onclick="submitForm">Submit</button>
        </form>
    </div>
    
</template>

<script>
export default{
    data(){
        return {
            className: '',
            classSize: '',
            days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            selectedDays: [],
            startTime: '',
            endTime: ''
        }
    },
    methods: {
        async submitForm() {
        if (this.selectedDays.length === 0) {
            alert("Please select at least one day.");
            return;
        }

        const concatenatedDays = this.selectedDays.join("");
        const newClass = {
            courseName: this.className,
            professor: "John Smith",
            days: concatenatedDays,
            startTime: this.startTime,
            endTime: this.endTime,
            classSize: this.classSize.toString(),
        }
        console.log("Form submitted: ", newClass)
        const response = await fetch('https://d3euzpxjia.execute-api.us-east-1.amazonaws.com/prod/courses', {
            method: "POST",
            body: JSON.stringify(newClass)
        })
        const responseData = await response.json();
        console.log(responseData)
        this.$router.push('/classadded')
        },

        logout() {
            this.$router.push('/')
        },
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
    .class-form{
        margin: auto;
        width: 30%;
        text-align: left;
        border: 20px solid #ADD8E6;
        background-color: #ADD8E6;
        border-radius: 5px;
    }
    .form-group{
        margin: 20px;
    }
    .days{
        display: flex;
        align-items: center;
    }
    .day{
        display: flex;
        justify-content: space-evenly;
        margin-right: 10px;
    }
</style>