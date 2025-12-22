//just commenting for my own note
const vue_app = Vue.createApp({
    data() {//this is the data
        return {
            addedToFavs: JSON.parse(localStorage.getItem('newFav')),
            userName: JSON.parse(localStorage.getItem('username'))|| 'User'
        }
    },
    methods: {
        clearFavs: function() {
            localStorage.removeItem('newFav')
            this.addedToFavs=[]
            
        }
    }
})

vue_app.mount('#app')

