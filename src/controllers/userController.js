import { response } from "../helpers/Response.js";

let data = [
    {
        _id: "1",
        nombre: "Luisa",
        apellido: "Morales",
        edad: 18,
    },
    {
        _id: "2",
        nombre: "Dana",
        apellido: "Carrillo",
        edad: 17,
    },
    {
        _id: "3",
        nombre: "Nathalie",
        apellido: "Pareja",
        edad: 18,
    },
]

const userCtrl = {};

userCtrl.getData = (req, reply) => {

    try {

        reply.status(200).send({
            ok:true,
            data,
            message: "Lista de usuarios"
        })
        
    } catch (error) {
        
        reply.status(500).send({
            ok:false,
            data: "",
            message: error.message,
        })
    }   
};

userCtrl.getDataById = (req, reply) => {
    try {
        const {id} = req.params;
        // const {search} = req.query;

        const usuario = data.find((item) => item._id === id);

        if (!usuario) {
            return response(reply, 404, false, "", "El usuario no existe.")
        }

        reply.send({
            ok: true,
            data: usuario,
            message: "El usuario ha sido encontrado con éxito."
            // query: search,
        })
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
}

userCtrl.saveData = (req, reply) => {

    try {
        const {_id, nombre, apellido, edad} = req.body;

        data.push({ _id, nombre, apellido, edad: parseInt(edad)});

        response(reply, 201, true, {
            nombre,
            apellido,
            edad,
        }, "El usuario se ha creado con éxito.")
        
    } catch (error) {
        reply.status(500).send({
            ok:false,
            data: "",
            message: error.message,
        })
    }
};

userCtrl.actualizarData = (req, reply) => {
    try {
        const {id} = req.params;

        const {_id, nombre, apellido, edad} = req.body;

        const nuevaData = data.map((item) => item._id === id ? {_id, nombre, apellido, edad: parseInt(edad)} : item);

        data = nuevaData;

        response(reply, 200, true, "", "El usuario se ha actualizado con éxito.") 


    } catch (error) {
        response(reply, 500, false, id, error.message);
    }
}

userCtrl.eliminarData = (req, reply) => {
    try {

        const {id} = req.params;

        const nuevaData = data.filter((item) => item._id !== id);

        // if (!data) {
        //     return response(res, 404, false, "", "El usuario no existe.")

        data = nuevaData;

        response(reply, 200, true, "", "El usuario se ha eliminado con éxito.")

    } catch (error) {
        response(reply, 500, false, id, error.message);
    }
}

export default userCtrl;
