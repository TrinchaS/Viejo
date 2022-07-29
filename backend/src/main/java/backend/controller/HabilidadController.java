package backend.controller;

import backend.dto.HabilidadDTO;
import backend.service.HabilidadService;
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
@CrossOrigin(origins = "https://frontend-cesarodrullan.web.app")
@RequestMapping("/habilidad")
public class HabilidadController {
    
    @Autowired
    private HabilidadService habService; 
    
    @GetMapping("/verHabilidades/{personaID}")
    public ResponseEntity<List<HabilidadDTO>> verHabilidades(@PathVariable("personaID") Long personaID){
        List<HabilidadDTO> rta = habService.verHabilidadesPorPersona(personaID);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @GetMapping("/buscarHabilidad/{personaID}/{habilidadID}")
    public ResponseEntity<HabilidadDTO> buscarHabilidad(
            @PathVariable("personaID") Long personaID,
            @PathVariable("habilidadID") Long habilidadID){
        HabilidadDTO rta = habService.buscarHabilidad(personaID,habilidadID);
        return  new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crearHabilidad/{personaID}")
    public ResponseEntity<HabilidadDTO> crearHabilidad(
            @PathVariable("personaID") Long personaID,
            @Valid @RequestBody HabilidadDTO nueva){
        HabilidadDTO rta = habService.crearHabilidad(personaID,nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editarHabilidad/{personaID}/{habilidadID}")
    public ResponseEntity<HabilidadDTO> editarHabilidad(
            @PathVariable("personaID") Long personaID,
            @PathVariable("habilidadID") Long habilidadID,
            @Valid @RequestBody HabilidadDTO habilidad){
        HabilidadDTO rta = habService.editarHabilidad(personaID,habilidadID,habilidad);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/borrarHabilidad/{personaID}/{habilidadID}")
    public ResponseEntity<?> borrarHabilidad(
            @PathVariable("personaID") Long personaID,
            @PathVariable("habilidadID") Long habilidadID){
        habService.borrarHabilidad(personaID,habilidadID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
