<template>
    <v-container fill-height style="max-width:450px">
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-alert
                    class="mb-3"
                    :value="isLoginError"
                    type="error">
                    {{ errorMsg }}
                </v-alert>
                <v-alert
                    class="mb-3"
                    type="success">
                    Login is completed.
                </v-alert>
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>Signup</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                        <v-text-field
                            v-model="displayName"
                            label="Display Name" />
                        <v-text-field
                            v-model="email"
                            type="email"
                            label="E-mail"
                            required />
                        <v-text-field
                            v-model="password"
                            :type="passwordType"
                            label="Password" />
                        <v-checkbox
                            v-if="password"
                            v-model="checkPassowrd"
                            label="Show Password"
                            @change="showPassword" />
                        <v-btn
                            color="primary"
                            depressed
                            block
                            large
                            @click="signup()">
                            Signup
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            displayName: null,
            email: null,
            password: null,
            passwordType: 'password',
            checkPassowrd: false
        }
    },
    computed: {
        ...mapState(['isLogin', 'isLoginError', 'errorMsg'])
    },
    methods: {
        async signup() {
            const { displayName, email, password } = this
            await this.$store.dispatch('signup', { displayName, email, password })
        },
        showPassword() {
            this.checkPassowrd === true
                ? this.passwordType = 'text'
                : this.passwordType = 'password'
        }
    }
}
</script>
