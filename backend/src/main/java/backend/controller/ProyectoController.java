package backend.controller;

import backend.dto.ProyectoDTO;
import backend.service.ProyectoService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/proyecto")
public class ProyectoController {
    
    @Autowired
    private ProyectoService proService;
    
    @GetMapping("/verProyectos/{personaID}")
    public ResponseEntity<List<ProyectoDTO>> verProyectos(@PathVariable("personaID") Long personaID){
        List<ProyectoDTO> rta = proService.verProyectosPorPersona(personaID);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @GetMapping("/buscarProyecto/{personaID}/{proyectoID}")
    public ResponseEntity<ProyectoDTO> buscarProyecto(
            @PathVariable("personaID") Long personaID,
            @PathVariable("proyectoID") Long proyectoID){
        ProyectoDTO rta = proService.buscarProyecto(personaID,proyectoID);
        return  new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crearProyecto/{personaID}")
    public ResponseEntity<ProyectoDTO> crearProyecto(
            @PathVariable("personaID") Long personaID,
            @Valid @RequestBody ProyectoDTO nueva){
        ProyectoDTO rta = proService.crearProyecto(personaID,nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editarProyecto/{personaID}/{proyectoID}")
    public ResponseEntity<ProyectoDTO> editarProyecto(
            @PathVariable("personaID") Long personaID,
            @PathVariable("proyectoID") Long proyectoID,
            @Valid @RequestBody ProyectoDTO proyecto){
        ProyectoDTO rta = proService.editarProyecto(personaID,proyectoID,proyecto);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/borrarProyecto/{personaID}/{proyectoID}")
    public ResponseEntity <?> borrarProyecto(
            @PathVariable("personaID") Long personaID,
            @PathVariable("proyectoID") Long proyectoID){
        proService.borrarProyecto(personaID,proyectoID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
