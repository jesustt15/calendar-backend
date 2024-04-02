const {response} = require('express');
const Evento = require('../models/Event');


const crearEvento = async(req, res = response) =>{

   const evento = new Evento(req.body)
   
    try {
        evento.user = req.uid;
        const eventoGuardado =  await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con su jefe bicho'
        })
    }


}

const getEventos = async(req, res = response) =>{

    const eventos = await Evento.find()
                                        .populate('user','name');

    res.json({
        ok: true,
        eventos
    })
}

const actualizarEvento = async(req, res = response) =>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId);

        if(!evento){
            res.status(404).json({
                ok: false,
                msg: ' NO hay tal evento'
            });
        }

        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
           user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con su administrador'
        })
        
    }
}

const eliminarEvento = async(req, res = response) =>{


    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId);
        //si existe el evento
        if(!evento){
            res.status(404).json({
                ok: false,
                msg: ' NO hay tal evento'
            })
        }
        //si es el mismo usuario que creo el evento
        if (evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para editar este evento'
            })
        }

       await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: 'evento eliminado con exito'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con su administrador'
        })
        
    }
}

module.exports = {
    crearEvento,
    getEventos,
    eliminarEvento,
    actualizarEvento
}

