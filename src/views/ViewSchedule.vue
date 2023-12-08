<template>
    <div>
      <header>
        <router-link to="/homescreen">
          <i class="fas fa-arrow-left"></i>
        </router-link>
        <h1>View Schedule</h1>
      </header>
    </div>

    <section>
      <div v-if="confirmMessage" id="confirmMessage">
        {{ confirmMessage }}
      </div>
      <h2>My Classes</h2>
      <ul class="class-list">
        <li class="class-item" v-for="classItem in myClasses" :key="classItem.id">
          <div>
            <h3>{{ classItem.courseid }}</h3>
            <p>{{ classItem.professor }}</p>
            <p>{{ classItem.days + "  " + classItem.startTime + " - " + classItem.endTime }}</p>
            <p>{{ classItem.currentSize + " out of " + classItem.classSize + " seats filled" }}</p>
          </div>
          <button @click="removeClass(classItem)">Remove</button>
        </li>
      </ul>
    </section>
</template>

<script>
export default {
    data() {
      return {
        allClasses: [], // Every single class
        canAdd_classes: [], // These classes can be added by the user
        myClasses: [], // The classes the user is taking
        showModal: false, // Modal for whether a class is full or not
        confirmMessage: null,
      };  
    },
    created() {
        // Call the getClassData method when the component is created
        this.getData();
    },
    methods:{
        async getData(){
            const response = await fetch(`https://d3euzpxjia.execute-api.us-east-1.amazonaws.com/prod/courses`, {
                method: "GET",
            })
            const responseData = await response.json();
            const classData = responseData.body
            console.log(classData) // responseData.body
            this.allClasses = classData // Every single class

            // Get the list of classes the student is taking
            const response2 = await fetch(`https://d3euzpxjia.execute-api.us-east-1.amazonaws.com/prod/login?username=jhu20000`, { // Hardcoded, will fix later
                method: "GET",
            })
            const responseData2 = await response2.json();
            const userClasses = responseData2.body.Item.coursesTaken
            // Call updateClasses
            this.updateClasses(userClasses)
        },
        updateClasses(userClassList){
            // Updating canAdd_classes and myClasses everytime a new class is added/dropped, and also when the webpage is loaded for the first time
            this.canAdd_classes = [] // reset
            this.myClasses = [] // reset

            // Now we filter allClasses into 2 sections: Classes the user is taking, and classes they aren't taking
            for (var i=0; i<this.allClasses.length; i++){
            // console.log(this.allClasses[i].courseid)
            if(userClassList.includes(this.allClasses[i].courseid)){ // this.allClasses[i].courseid in userClassList
                // Put this class in myClasses
                this.myClasses.push(this.allClasses[i])
            }
            else{
                this.canAdd_classes.push(this.allClasses[i])
            }
            }
        },
        async removeClass(classItem) {
        // Logic to remove a class from 'myClasses' array
        const index = this.allClasses.indexOf(classItem)
        const currentClass = this.allClasses[index].courseid // The class we want to move from one array to another
        console.log("removing this class from coursesTaken ", currentClass)
        const payload = {
          username: "jhu20000",
          course: currentClass,
          action: "DELETE"
        }
        const response = await fetch('https://d3euzpxjia.execute-api.us-east-1.amazonaws.com/prod/courses', {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const responseData = await response.json();
        console.log(responseData)
        // Update class lists IF statusCode was 200
        if(responseData.statusCode == 200){
          // Using getData is costlier as it always makes an API call, but it automatically updates the numbers which is cool
          // this.updateClasses(responseData.body)
          this.getData()
          this.confirmMessage = `Successfully removed ${currentClass}!`
          setTimeout(() => {
            this.confirmMessage = null; // Clear confirmation message after a few seconds
          }, 2000);
          setTimeout(() => {
            this.fadeOutConfirmation(); // Add fade-out effect after a delay
          }, 1000);
        }
      },
      fadeOutConfirmation() {
        console.log("start")
        this.querySelector('#confirmMessage').classList.add('fade-out'); // qQuery doesn't work for this?
        console.log("end")
        // setTimeout(() => {
        //   this.confirmMessage = null; // Clear confirmation message after a few seconds
        // }, 1000); // Adjust the delay if needed
      },
    }
    
}
</script>

<style scoped>
     body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    header {
      background: #002D62;
      padding: 10px;
      text-align: center;
    }
    header i{
      color:white;
      margin-left: 10px;
    }

    header h1{
      font-size: 35px;
      color: white;
      margin-left: auto;
      margin-right: auto;
    }
    section h2{
      font-size: 20px;
      color: black;
      font-weight: bold;
    }
    section {
      margin: 20px;
      color: #002D62
    }

    .class-list {
      list-style: none;
      padding: 0;
    }

    .class-item {
      background-color: #e3efff;
      color: #002D62;
      border: 1px solid #ddd;
      margin: 10px 0;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 17px;
    }
    button {
      width: 175px;
      background: #007BFF;
      border: none;
      color: #fff;
      padding: 10px;
      border-radius: 100px;
      cursor: pointer;
      text-align: center;
      display: block;
    }
    
    button:hover {
      background: #0056b3;
    }
    .background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(5px);
      z-index: 999;
    }

    .modal {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
    }

    .modal-text {
      text-align: center;
      margin: 10px;
    }

    #confirmMessage {
        background-color: #28a745;
        color: #fff;
        padding: 10px;
        text-align: center;
        margin: 10px auto;
        border-radius: 5px;
        max-width: 300px;
        opacity: 1;
        transition: opacity 1s ease-in-out;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
      }
    #confirmMessage.fade-out {
      opacity: 0;
    }

  </style>