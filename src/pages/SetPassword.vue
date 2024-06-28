<template>
    <div class="set-password">
        <h1>Set Your Password</h1>
        <form @submit.prevent="submitPassword">
            <div>
                <label for="password">New Password:</label>
                <input type="password" v-model="password" id="password" required>
            </div>
            <div>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" v-model="confirmPassword" id="confirmPassword" required>
            </div>
            <button type="submit">Set Password</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import * as apiService from '@/services/api.service';

export default {
    data() {
        return {
            password: '',
            confirmPassword: '',
            token: '',
            error: ''
        };
    },
    created() {
        this.token = this.$route.query.token;
    },
    methods: {
        async submitPassword() {
            if (this.password !== this.confirmPassword) {
                this.error = "Passwords do not match!";
                return;
            }

            try {
                const response = await apiService.setPassword(this.token, this.password);
                if (response.status === "success") {
                    alert("Password set successfully!");
                    // this.$router.push("/login"); 
                    // Redirect to login page or another appropriate page
                } else {
                    this.error = "Failed to set password: " + response.message;
                }
            } catch (error) {
                this.error = "Error setting password: " + error.message;
            }
        }
    }
};
</script>

<style scoped>
.set-password {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.set-password h1 {
    text-align: center;
    margin-bottom: 20px;
}

.set-password form div {
    margin-bottom: 10px;
}

.set-password form label {
    display: block;
    margin-bottom: 5px;
}

.set-password form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.set-password form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
}

.set-password form p {
    color: red;
}
</style>