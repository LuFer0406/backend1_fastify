import userCtrl from "../controllers/userController.js";

const userRoutes = (fastify, opts, done) => {
    fastify.get("/", userCtrl.getData);
    fastify.get("/:id", userCtrl.getDataById);
    fastify.post("/", userCtrl.saveData);
    fastify.put("/:id", userCtrl.actualizarData);
    fastify.delete("/:id", userCtrl.eliminarData);

    // ¿Todo está hecho? continúe
    done();
}

export default userRoutes;