<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            fixed
            app>
            <v-list dense>
                <v-list-tile router :to="{name: 'home'}">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="isLogin === false" router :to="{name: 'login'}">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Login</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="isLogin === false" router :to="{name: 'signup'}">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Signup</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-else router :to="{name: 'mypage'}">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>My page</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Application</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items class="hidden-sm-and-down">
                <v-menu v-if="isLogin" offset-y>
                    <v-btn
                        slot="activator"
                        dark
                        router
                        :to="{name: 'mypage'}"
                        flat>
                        Mypage
                    </v-btn>
                    <v-btn
                        slot="activator"
                        dark
                        flat
                        @click="$store.dispatch('logout')">
                        Logout
                    </v-btn>
                </v-menu>
                <v-menu v-else offset-y>
                    <v-btn
                        slot="activator"
                        router
                        :to="{name: 'login'}"
                        flat>
                        Login
                    </v-btn>
                    <v-btn
                        slot="activator"
                        router
                        :to="{name: 'signup'}"
                        flat>
                        Signup
                    </v-btn>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <router-view />
        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        source: {
            type: String,
            default: null
        }
    },
    data: () => ({
        drawer: null
    }),
    computed: {
        ...mapState(['isLogin'])
    }
}
</script>
