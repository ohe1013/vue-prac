<template>
    <div class="hello">
        <el-form v-if="!token">
            <label for="email">email</label>
            <el-input
                size="medium"
                placeholder="email"
                prefix-icon="el-icon-search"
                v-model="user.email"
            >
            </el-input>
            <label for="password">password</label>
            <el-input
                type="password"
                size="medium"
                placeholder="password"
                prefix-icon="el-icon-search"
                v-model="user.password"
            >
            </el-input>
            <el-button
                type="primary"
                round
                @click="submitLogin"
                >로그인</el-button
            >
        </el-form>
    </div>
</template>

<script>
import { TokenService } from '@/services/localStorageService';
import { mapActions } from 'vuex';

export default {
    name: 'HelloWorld',
    data: () => {
        return {
            user: {
                email: '',
                password: '',
            },
            token: TokenService.getToken(),
        };
    },
    methods: {
        ...mapActions('authModule', ['login']),
        submitLogin() {
            this.login(this.user);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
