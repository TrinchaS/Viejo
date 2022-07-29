package backend.controller;

import backend.dto.ExperienciaDTO;
import backend.service.ExperienciaService;
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
@RequestMapping("/experiencia")
public class ExperienciaController {
    
    @Autowired
    private ExperienciaService expService; 
    
    @GetMapping("/verExperiencias/{personaID}")
    public ResponseEntity<List<ExperienciaDTO>> verExperiencias(@PathVariable("personaID") Long personaID){
        List<ExperienciaDTO> rta = expService.verExperienciasPorPersona(personaID);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @GetMapping("/buscarExperiencia/{personaID}/{experienciaID}")
    public ResponseEntity<ExperienciaDTO> buscarExperiencia(
            @PathVariable("personaID") Long personaID,
            @PathVariable("experienciaID") Long experienciaID){
        ExperienciaDTO rta = expService.buscarExperiencia(personaID,experienciaID);
        return  new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crearExperiencia/{personaID}")
    public ResponseEntity<ExperienciaDTO> crearExperiencia(
            @PathVariable("personaID") Long personaID,
            @Valid @RequestBody ExperienciaDTO nueva){
        ExperienciaDTO rta = expService.crearExperiencia(personaID,nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editarExperiencia/{personaID}/{experienciaID}")
    public ResponseEntity<ExperienciaDTO> editarExperiencia(
            @PathVariable("personaID") Long personaID,
            @PathVariable("experienciaID") Long experienciaID,
            @Valid @RequestBody ExperienciaDTO experiencia){
        ExperienciaDTO rta = expService.editarExperiencia(personaID,experienciaID,experiencia);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/borrarExperiencia/{personaID}/{experienciaID}")
    public ResponseEntity<?> borrarExperiencia(
            @PathVariable("personaID") Long personaID,
            @PathVariable("experienciaID") Long experienciaID){
        expService.borrarExperiencia(personaID,experienciaID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
