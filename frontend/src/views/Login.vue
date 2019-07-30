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
                    :value="isLogin"
                    type="success">
                    Login is completed.
                </v-alert>
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                        <v-text-field
                            v-model="email"
                            type="email"
                            label="E-mail"
                            required />
                        <v-text-field
                            v-model="password"
                            type="password"
                            label="Password"
                            @keyup.enter="login()" />
                        <v-btn
                            color="primary"
                            depressed
                            block
                            large
                            @click="login()">
                            Login
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            email: null,
            password: null
        }
    },
    computed: {
        ...mapState(['isLogin', 'isLoginError', 'errorMsg'])
    },
    methods: {
        login() {
            const { email, password } = this
            this.$store.dispatch('login', { email, password })
        }
    }
}
</script>
