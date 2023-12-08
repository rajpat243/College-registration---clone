<template>
  <div>
    <header>
      <h1>Manage Classes</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </header>

    <section>
      <div v-if="confirmMessage" id="confirmMessage">
        {{ confirmMessage }}
      </div>
      <button class="logout-button" @click="addClass">Add New Class</button>
      <h2>Classes I'm Teaching </h2>
      <ul id="class-list">
        <li class="class-item" v-for="classItem in allClasses" :key="classItem.id">
          <div>
            <h3>{{ classItem.courseid }}</h3>
            <p>{{ classItem.days + "  " + classItem.startTime + " - " + classItem.endTime }}</p>
            <p>{{ classItem.currentSize + " out of " + classItem.classSize + " seats filled" }}</p>
          </div>
          <button @click="manageClass(classItem)">Manage</button>
        </li>
      </ul>
    </section>
    <div class="background" v-if="showModal">
      <div class="modal">
        <div>
          <h3 id="modal-text">
            Change class size: 
            <input ref="inputSize" type="number" id="quantity" :min=minClassSize name="quantity">
          </h3>
          <p class="warning" v-if="showError">New class size cannot go lower than the current amount of students enrolled</p>
          <div class="buttons">
            <button @click="saveModal">Save</button>
            <button @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
    
    <script>

    import router from "@/router/index.js";
    
    export default {
      data() {
        return {
          allClasses: [],
          showModal: false,
          modalText: "",
          minClassSize: 0,
          currentModalClass: "",
          showError: false,
          confirmMessage: null,
        };
      },
      created() {
        // Call the getClassData method when the component is created
        this.getClassData();
      },
      methods: {
        async getClassData() {
          // get class data from database
          const response = await fetch(`https://d3euzpxjia.execute-api.us-east-1.amazonaws.com/prod/courses`, {
            method: "GET",
          })
          const responseData = await response.json();
          const classData = responseData.body
          console.log(classData)
          this.allClasses = classData

        },
        manageClass(classItem) {
          const minVal = classItem.currentSize
          this.currentModalClass = classItem.courseid
          this.minClassSize = classItem.currentSize;
          this.showModal = true
        },
        closeModal(){
          this.showModal = false
        },
        async saveModal(){
          const newValue = this.$refs.inputSize.value;
          if(newValue < 0 || newValue == ''){
            console.log("ERROR")
            this.showError = true
            return
          }
          this.showError = false
          console.log(`New class size: ${newValue}`);
          this.showModal = false;
          const payload = {
            "courseid": this.currentModalClass,
            "classSize": newValue
          }
          console.log(payload)
          const response = await fetch(`https://d3euzpxjia.execute-api.us-east-1.amazonaws.com/prod/courses/update-course`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const responseData = await response.json();
          console.log(responseData)
          this.getClassData()
          this.confirmMessage = `Successfully modified class data!`
          setTimeout(() => {
            this.confirmMessage = null; // Clear confirmation message after a few seconds
          }, 2000);
          setTimeout(() => {
            this.fadeOutConfirmation(); // Add fade-out effect after a delay
          }, 1000);
        },
        logout() {
          this.$router.push('/')
        },

        addClass() {
          this.$router.push('/addclass')
        },
        fadeOutConfirmation() {
          this.$el.querySelector('#confirmMessage').classList.add('fade-out');
        },
       },
    };

    </script>
    <style scoped>
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

      #modal-text {
        text-align: center;
        margin: 10px;
      }

      .buttons{
        display: flex;
        width: 180px;
        justify-content: space-between;
      }

      button {
        width: 80px;
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

      .warning {
        color: red;
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
    