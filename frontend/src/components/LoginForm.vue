<template>
    <div>
        <input type="text" placeholder="username" v-model="username"/>
        <input type="text" placeholder="password" v-model="password"/>
        <button type="submit">Login</button>
    </div>
</template>
<script>
export default{
    data(){
        return{
            username: '',
            password: ''
        };
    },
    methods: {
        login(){

        }
    }
}
</script>