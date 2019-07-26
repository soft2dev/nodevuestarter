<template>
    <v-container fill-height style="max-width:450px">
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-alert
                    class="mb-3"
                    :value="isLoginError"
                    type="error">
                    Please check again your email and password.
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
                            label="E-mail" />
                        <v-text-field
                            v-model="password"
                            type="password"
                            label="Password" />
                        <v-btn
                            color="primary"
                            depressed
                            block
                            large
                            @click="login({
                                email,
                                password
                            })">
                            Login
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
            email: null,
            password: null
        }
    },
    computed: {
        ...mapState(['isLogin', 'isLoginError'])
    },
    methods: {
        ...mapActions(['login'])
    }
}
</script>
