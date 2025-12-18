
const vue_app = Vue.createApp({
    created() {
        fetch('names.json').then(response => response.json()).then(json => {
                  this.names = json
            })

            fetch('items.json').then(response => response.json()).then(json => {
                  this.items = json
            })
    },
    data() {
        return {
            names: [],//names array
            items: [],//items array
            start: false
        }
    },
    methods: {
        //adding all methods here
        startGame: function(starT) {
            //show the wheel+input field for names
            this.start=starT;
            
        }
    }
    
})

vue_app.mount('#app')