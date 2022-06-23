//yo - 1171184980387195
//angie - 100006374922337
const API = "https://graph.facebook.com/"
const campos = "?fields=id,name,email,picture&"
const Token = "access_token=EAAHdrk9jidQBAE9AabjrZA9zKwBRphzTKKt8CFZCoaZCbUXVkm1ZAKS9OBZAzf8NfEacaPZCNbx35TAcgDbTrJZCfENZBP4BZC6CBq5XoYn7qsc2CDS2WycQq9xKwqenb1Cv2PLk4mSglevZAZBzZBZBMRg1hA3UTy5ZCqiEQMz9cUweusswZDZD";

const appFB = Vue.createApp({
    data() {
        return {
            busqueda: null,
            result: null,
            error: null,
        }
    },

    //usa un metodo
    methods: {
        async buscar() {
            //depende del error
            this.result = this.error = null
            try {
                const response = await fetch(API + this.busqueda + campos + Token)
                if (!response.ok) throw new error("Usuario no encontrado")
                //console.log(response)
                //ahora quiero traer la info en formato json
                const data = await response.json()
                console.log(data)
                this.result = data //cambiar true por data
            } catch (error) {
                this.error = error
                //tan pronto termina el proceso, limpia haciendo vacia la busqueda
            } finally {
                this.busqueda = null
            }
        },//aqui se cierra el metodo buscar
    }
})