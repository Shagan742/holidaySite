//make a wheel of names
const vue_app = Vue.createApp({
    created() {
        fetch('names.json', 'items.json').then(response => response.json()).then(json => {
                  this.names = json
                  this.items = json
            })
    },
    data() {
        return {
            names: [],//names array
            items: []//items array
        }
    },
    methods: {
        //adding all methods here
        startGame: function(start) {
            //show the wheel+input field for names
            start=true;
        }
    }
    
})