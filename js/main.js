//yo - 1171184980387195
//angie - 100006374922337
//maikitol - 100005327266047
//sandroski - 100054124418177

//establezco la primera parte que va a leer en la busqueda
const API = "https://graph.facebook.com/"
//luego ingreso los campos de informacion que quiero que busque al ingresasr el id
const campos = "?fields=id,name,picture&"
//ingreso los demas datos de la api, incluyendo el Access Token
const Token = "access_token=EAAHdrk9jidQBALQbZBvvwemcIyIx5JMHuOjb6Epg1OX9foZCSJZB03mZAv02IUKjAraJzjDLnfSUT9pJAlVs9Sw8IYCp78mwmNr76ew4UAhHZB8lbQ0PylGCZCLCnF99VD3bTjJkZAlWPpMIqQZBiBKOR9ZAWqq4vZAmEZA70LitdZBMvgZDZD";

//nombre de como voy a llamar el conjunto de metodos que vaya a realizar
const appFB = Vue.createApp({
    data() {
        //se definen valores/datos con valores predefinidos
        return {
            busqueda: null,
            result: null,
            error: null,
            favoritos: new Map() //se crea un map para guardar
        }
    },

    //created hace parte de los ciclos de vida de Vue
    //metodo para obtener los favoritos que esten e el local storage
    created() {
        //creo un nuevo dato donde me va a guardar los datos que se encuentren en el localStorage en formato JSON
        //con una llave nombre "favoritoxz"
        const FavoritosGuardados = JSON.parse(window.localStorage.getItem("favoritoxz"))

        //verifico si en la lista FavoritosGuardados se encuentra algun dato o información con " ? "
        //en caso de que haya 
        if (FavoritosGuardados?.length) {
            //creo una copia de los archivos encontrados/añadidos para modificarlos si es necesario
            const favoritozniu = new Map(FavoritosGuardados.map(
                //me baso del metodo map para obtener el id como un key y el arreglo
                //completo como el value del map
                alias => [alias.id, alias]))
            //asignamos a la variable favoritos de la instancia 
            this.favoritos = favoritozniu
        }
        //console.log(FavoritosGuardados)
    },

    //establezco una función para que me traiga datos que le pida despues de haberlos recolectado
    computed: {
        //busca y compara en la lista favoritos de la consola si se encuentra la id ingresada
        estaFavorito() {
            return this.favoritos.has(this.result.id)
        },

        //creo un metodo donde me mostrara todos los favoritos almacenados en consola
        todosFavoritos() {
            return Array.from(this.favoritos.values())
            //el metodo values() solo traera los valores sin las claves
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
        addFavorito() {
            this.favoritos.set(this.result.id, this.result)
            this.actualizarStorage()
        },

        removeFavorito() {
            this.favoritos.delete(this.result.id)
            this.actualizarStorage()
        },

        actualizarStorage() {
            window.localStorage.setItem('favoritoxz', JSON.stringify(this.todosFavoritos))
        },

        mostrarFavorito(parametro) {
            //tipo array con objetos de javascript o tipo JSON
            this.result = parametro
        }
    }
})