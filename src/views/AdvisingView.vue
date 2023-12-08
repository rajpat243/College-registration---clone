<!-- App.vue -->
<template>
    <div class="header">
        <router-link to="/homescreen">
          <i class="fas fa-arrow-left"></i>
        </router-link>
    <h1>Advising</h1>
  </div>
  <div id="app">
      <advisor-info :currentAdvisor="currentAdvisor" />
      <advising-form @submitForm="scheduleAppointment" />
    </div>
  </template>
  
  <script>
  import AdvisorInfo from '../views/AdvisorInfo.vue';
  import AdvisingForm from '../views/AdvisingForm.vue';
  
  export default {
    name: 'App',
    components: {
      AdvisorInfo,
      AdvisingForm,
    },
    data() {
      return {
        currentAdvisor: 'John Doe', 
        scheduledAppointment: null,
      };
    },
    methods: {
      scheduleAppointment(appointmentDetails) {
        this.scheduledAppointment = appointmentDetails;
        
        console.log(appointmentDetails);
      },
    },
  };
  </script>

<style scoped>

.header {
  background: #002D62; 
  align-items: center;
  padding: 10px;
  display: flex;
}

.header h1 {
  color: #ffffff;
  font-size: 35px;
  font-weight: bold;
  margin-left: auto;
  margin-right: 630px;
}

.header i{
    color:white;
    margin-left: 10px;
    font-size: 24px;
}
</style>
  
