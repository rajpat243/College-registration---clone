<template>
  <div class="advising-form">
    <form @submit.prevent="submit" class="form-container">
      <h2>Schedule Advising Appointment</h2>

      <div class="form-group">
        <label for="netId">NetID:</label>
        <input type="text" id="netId" v-model="netId" required class="input-field" @input="validateField('netId')">
        <p v-if="!netIdValid" class="error-message">Please enter NetID</p>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required class="input-field" @input="validateField('email')">
        <p v-if="!emailValid" class="error-message">Please enter a valid Email</p>
      </div>

      <div class="form-group">
        <label for="reason">Reason for Advising:</label>
        <textarea id="reason" v-model="reason" required class="input-field" @input="validateField('reason')"></textarea>
        <p v-if="!reasonValid" class="error-message">Please provide a reason for advising</p>
      </div>

      <div class="form-group">
        <label>How would you like to meet?</label>
        <div class="radio-group">
          <input type="radio" id="inOffice" value="In office" v-model="meetingType">
          <label for="inOffice">In office</label>
          <input type="radio" id="virtually" value="Virtually" v-model="meetingType">
          <label for="virtually">Virtually</label>
        </div>
        <p v-if="!meetingTypeValid" class="error-message">Please select a meeting option</p>
      </div>

      <div class="form-group">
        <label>Date:</label>
        <select v-model="selectedDate" class="select-field" @change="validateField('selectedDate')">
          <option :value="null">Select Date</option>
          <option v-for="date in availableDates" :key="date">{{ date }}</option>
        </select>
        <p v-if="!selectedDateValid" class="error-message">Please select a date</p>
      </div>

      <div class="form-group">
        <label>Time:</label>
        <select v-model="selectedTime" class="select-field" @change="validateField('selectedTime')">
          <option :value="null">Select Time</option>
          <option v-for="time in availableTimes" :key="time">{{ time }}</option>
        </select>
        <p v-if="!selectedTimeValid" class="error-message">Please select a time</p>
      </div>

      <div class="form-group">
        <button type="submit" :disabled="!formIsValid">Submit</button>
        <p v-if="formSubmitted && !formIsValid" class="error-message">Please fill in all fields</p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import cors from 'cors';

export default {
  name: 'AdvisingForm',
  data() {
    return {
      name:'',
      netId: '',
      email: '',
      reason: '',
      meetingType: '',
      selectedDate: null,
      selectedTime: null,
      availableDates: ['Dec 1', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7', 'Dec 8', 'Dec 11', 'Dec 12', 'Dec 13', 'Dec 14', 'Dec 15'],
      availableTimes: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM','1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'],
      netIdValid: true,
      emailValid: true,
      reasonValid: true,
      meetingTypeValid: true,
      selectedDateValid: true,
      selectedTimeValid: true,
      formSubmitted: false,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.netIdValid &&
        this.emailValid &&
        this.reasonValid &&
        this.meetingType !== '' &&
        this.selectedDate !== null &&
        this.selectedTime !== null
      );
    },
  },
  methods: {
    submit() {
      if (this.formIsValid) {
        const appointmentDetails = {
          netId: this.netId,
          email: this.email,
          reason: this.reason,
          meetingType: this.meetingType,
          selectedDate: this.selectedDate,
          selectedTime: this.selectedTime,
        };
        this.$emit('submitForm', appointmentDetails);
          alert(
            `Your advising appointment has been scheduled ${this.meetingType.toLowerCase()} for ${this.selectedDate} at ${this.selectedTime}`
        );
        // Make a POST request to your backend API
        axios.post('http://localhost:3000/create-appointment', appointmentDetails)
          .then(response => {
            console.log(response.data);
            // Handle success, show a success message, etc.
            this.formSubmitted = true;
          })
          .catch(error => {
            console.error(error);
            // Handle error, show an error message, etc.
          });

        // Reset form fields after submission
        this.resetForm();
      }
    },
    resetForm() {
      this.netId = '';
      this.email = '';
      this.reason = '';
      this.meetingType = '';
      this.selectedDate = null;
      this.selectedTime = null;
    },
    validateField(field) {
      switch (field) {
        case 'netId':
          this.netIdValid = !!this.netId.trim();
          break;
        case 'email':
          this.emailValid = /\S+@\S+\.\S+/.test(this.email);
          break;
        case 'reason':
          this.reasonValid = !!this.reason.trim();
          break;
        case 'selectedDate':
          this.selectedDateValid = !!this.selectedDate;
          break;
        case 'selectedTime':
          this.selectedTimeValid = !!this.selectedTime;
          break;
        default:
          break;
      }
    },
  },
};
</script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 300px; 
    margin: auto;
  }

  .form-container h2{
    text-decoration: underline;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .radio-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
  
  button {
    padding: 10px 20px;
    cursor: pointer;
    width: 120px;
    padding: 10px;
    background: #007BFF;
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    margin: 20px auto;
  }
  .input-field {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
}

.input-field:focus {
  outline: none;
  border-color: grey;
}
.select-field {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
}

.select-field:focus {
  outline: none;
  border-color: grey;
}
.error-message {
  color: red;
  margin-top: 5px;
  font-size: 0.8em;
}
  </style>
  
