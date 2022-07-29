package backend.controller;

import backend.dto.EducacionDTO;
import backend.service.EducacionService;
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
@RequestMapping("/educacion")
public class EducacionController {
    
    @Autowired
    private EducacionService eduService;
    
    @GetMapping("/verEducaciones/{personaID}")
    public ResponseEntity<List<EducacionDTO>> verEducaciones(@PathVariable("personaID") Long personaID){
        List<EducacionDTO> rta = eduService.verEducacionesPorPersona(personaID);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @GetMapping("/buscarEducacion/{personaID}/{educacionID}")
    public ResponseEntity<EducacionDTO> buscarEducacion(
            @PathVariable("personaID") Long personaID,
            @PathVariable("educacionID") Long educacionID){
        EducacionDTO rta = eduService.buscarEducacion(personaID,educacionID);
        return  new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crearEducacion/{personaID}")
    public ResponseEntity<EducacionDTO> crearEducacion(
            @PathVariable("personaID") Long personaID,
            @Valid @RequestBody EducacionDTO nueva){
        EducacionDTO rta = eduService.crearEducacion(personaID,nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editarEducacion/{personaID}/{educacionID}")
    public ResponseEntity<EducacionDTO> editaEducacion(
            @PathVariable("personaID") Long personaID,
            @PathVariable("educacionID") Long educacionID,
            @Valid @RequestBody EducacionDTO educacion){
        EducacionDTO rta = eduService.editarEducacion(personaID,educacionID,educacion);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }    
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/borrarEducacion/{personaID}/{educacionID}")
    public ResponseEntity<?> borrarEducacion(
            @PathVariable("personaID") Long personaID,
            @PathVariable("educacionID") Long educacionID){
        eduService.borrarEducacion(personaID,educacionID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
 
}