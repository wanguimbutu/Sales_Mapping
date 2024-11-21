<template>
    <div class="login-form">
        <div class="p-2">
            <input type="text" placeholder="username" v-model="username"/>
        </div>

        <div class="p-2">
            <input type="text" placeholder="password" v-model="password"/>
        </div>
         <Button
            :variant="'solid'"
            :ref_for="true" theme="gray" size="sm" label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            >
            Login
        </Button>
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