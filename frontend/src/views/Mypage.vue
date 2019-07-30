<template>
    <div>
        <h1>{{ userInfo.displayName }}, Welcome</h1>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>
